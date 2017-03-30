'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 160, 40);
  ctx.fillText('Список результатов:', 160, 60);

  function findMaxTime(timesArray) {
    var max = -1;

    for (var i = 0; i < timesArray.length; i++) {
      var time = timesArray[i];
      if (time > max) {
        max = time;
      }
    }

    return max;
  }

  function getRandomBlueTone() {
    return 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
  }

  function paintHistogramBar(x, y, width, height) {
    ctx.fillRect(x, y, width, -height);
  }

  function paintHistogramText(name, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillText(name, x, y);
  }

  function drawHistagram(timesArray, namesArray, indent, barWidth, histogramHeight, initialX, initialY) {
    for (var i = 0; i < timesArray.length; i++) {
      if (namesArray[i] === 'Вы') {
        ctx.fillStyle = 'rgba(255, 0, 0, 1)';
      } else {
        ctx.fillStyle = getRandomBlueTone();
      }

      var step = histogramHeight / findMaxTime(times);

      paintHistogramBar(initialX + indent * i, initialY, barWidth, timesArray[i] * step);
      paintHistogramText(namesArray[i], initialX + indent * i, initialY + 20, 'black');
    }
  }

  drawHistagram(times, names, 90, 40, 150, 160, 230);
};

