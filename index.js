function calc(angleInput) {
  let radius = 2;
  alert(angleInput);
  const getSteps = (angle) => {
    return {
      x: angle.cos * radius,
      y: angle.sin * radius,
    };
  };

  const getAngleCuadrant = (angle) => {
    if (angle >= 0 && angle <= 90) {
      return "I";
    }
    if (angle > 90 && angle <= 180) {
      return "II";
    }
    if (angle > 180 && angle <= 270) {
      return "III";
    }
    if (angle > 270 && angle <= 360) {
      return "IV";
    }
  };

  const getRadianAngle = (angle, cuadrant, isInput) => {
    switch (cuadrant) {
      case "I":
        return angle;
      case "II":
        return 180 - angle;
      case "III":
        return isInput ? angle - 180 : 180 + angle;
      case "IV":
        return 360 - angle;
    }
  };

  const angleCuadrant = getAngleCuadrant(angleInput);

  const angleResult = getRadianAngle(angleInput, angleCuadrant, true);

  const cuadrants = ["I", "II", "III", "IV"];
  let results = [];
  let inputAngleCalc;

  cuadrants.forEach((cuadrantBase) => {
    if (cuadrantBase !== angleCuadrant) {
      let angleCalc = getRadianAngle(angleResult, cuadrantBase, false);
      results.push({
        cuadrant: cuadrantBase,
        angle: angleCalc,
        sin: parseFloat(Math.sin((angleCalc * Math.PI) / 180)).toFixed(4),
        cos: parseFloat(Math.cos((angleCalc * Math.PI) / 180)).toFixed(4),
        tan: parseFloat(Math.tan((angleCalc * Math.PI) / 180)).toFixed(4),
      });
    } else {
      inputAngleCalc = {
        cuadrant: cuadrantBase,
        angle: angleInput,
        sin: parseFloat(Math.sin((angleInput * Math.PI) / 180)).toFixed(4),
        cos: parseFloat(Math.cos((angleInput * Math.PI) / 180)).toFixed(4),
        tan: parseFloat(Math.tan((angleInput * Math.PI) / 180)).toFixed(4),
      };
      results.push(inputAngleCalc);
    }
  });

  const filterResults = results.filter(
    (result) => result.cuadrant !== angleCuadrant
  );

  const sin = filterResults.find((result) => result.sin === inputAngleCalc.sin);
  const cos = filterResults.find((result) => result.cos === inputAngleCalc.cos);
  const tan = filterResults.find((result) => result.tan === inputAngleCalc.tan);

  console.log("Angle Input " + angleInput);
  console.log("Angle Radius " + radius);
  console.log("Angle Delta " + angleResult);
  console.log("Angle Cuadrant " + angleCuadrant);

  results.forEach((r) => {
    console.log(
      "Cuadrante: " +
        r.cuadrant +
        ", Angle: " +
        r.angle +
        ", sin: " +
        r.sin +
        ", cos: " +
        r.cos +
        ", tan: " +
        r.tan +
        ", Angle Steps - x:" +
        getSteps(r).x +
        " y:" +
        getSteps(r).y
    );
  });

  const dataArray = [];

  results.forEach((item) => {
    dataArray.push({
      x: getSteps(item).x,
      y: getSteps(item).y,
      angle: item.angle,
    });
  });

  console.log("sin image " + sin?.angle);
  console.log("cos image " + cos?.angle);
  console.log("tan image " + tan?.angle);

  console.log(dataArray);

  var c = document.getElementById("canvas");
  var ctx = c.getContext("2d");
  ctx.translate(200, 200);
  ctx.beginPath();
  ctx.moveTo(-200, 0);
  ctx.lineTo(200, 0);
  ctx.stroke();
  ctx.moveTo(0, -200);
  ctx.lineTo(0, 200);
  ctx.stroke();
  ctx.font = "12px Arial";
  ctx.fillText("+ x", 180, -10);
  ctx.fillText("- y", 10, 180);
  ctx.fillText("- x", -200, -10);
  ctx.fillText("+ y", 10, -180);

  function drawCartesianPoint(ctx, x, y) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(x, -y);
    ctx.stroke();
    ctx.fillRect(x, -y, 4, 4);
  }
  // And for text:
  function drawCartesianText(ctx, x, y, text) {
    ctx.fillText(text, x, -y);
  }
  dataArray.forEach((element) => {
    drawCartesianPoint(ctx, element.x * 80, element.y * 80);
    drawCartesianText(ctx, element.x * 80, element.y * 90, `${element.angle}°`);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("angle");
  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    calc(input.value);
  });
});
