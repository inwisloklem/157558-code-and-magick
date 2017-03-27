'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);

  ctx.fillStyle = 'white';
  ctx.strokeRect(100, 10, 420, 270);
  ctx.fillRect(100, 10, 420, 270);

  ctx.fillStyle = 'black';
  ctx.font = '16px PT Mono';

  ctx.fillText('Ура вы победили!', 170, 40);
  ctx.fillText('Список результатов:', 170, 60);

  var max = -1;
  // var maxIndex = -1;

  for (var i = 0; i < times.length; i++) {
    var time = times[i];
    if (time > max) {
      max = time;
    }
  }

  var histogramHeight = 150;
  var step = histogramHeight / max;

  var barWidth = 40;
  var indent = 80;
  var initialX = 170;
  var initialY = 230;
  var initialTextX = initialX;
  var initialTextY = initialY + 20;

  var colors = ['red', 'green', 'orange', 'blue'];

  for (i = 0; i < times.length; i++) {
    ctx.fillStyle = colors[i];
    ctx.fillRect(initialX + indent * i, initialY, barWidth, -times[i] * step);

    ctx.fillStyle = 'black';
    ctx.fillText(names[i], initialTextX + indent * i, initialTextY);
  }
};

