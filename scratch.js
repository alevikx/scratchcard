(function() {
  
    'use strict';
    
    var isDrawing, lastPoint;
    var container    = document.getElementById('js-container'),
        canvas       = document.getElementById('js-canvas'),
        canvasWidth  = canvas.width,
        canvasHeight = canvas.height,
        ctx          = canvas.getContext('2d'),
        image        = new Image(),
        brush        = new Image();
        
    // base64 Workaround because Same-Origin-Policy
    image.src = 'data:image/png;base64,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';
    image.onload = function() {
      ctx.drawImage(image, 0, 0);
      // Show the form when Image is loaded.
      document.querySelectorAll('.form')[0].style.visibility = 'visible';
    };
    brush.src = 'data:image/png;base64,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';
    
    canvas.addEventListener('mousedown', handleMouseDown, false);
    canvas.addEventListener('touchstart', handleMouseDown, false);
    canvas.addEventListener('mousemove', handleMouseMove, false);
    canvas.addEventListener('touchmove', handleMouseMove, false);
    canvas.addEventListener('mouseup', handleMouseUp, false);
    canvas.addEventListener('touchend', handleMouseUp, false);
    
    function distanceBetween(point1, point2) {
      return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    }
    
    function angleBetween(point1, point2) {
      return Math.atan2( point2.x - point1.x, point2.y - point1.y );
    }
    
    // Only test every `stride` pixel. `stride`x faster,
    // but might lead to inaccuracy
    function getFilledInPixels(stride) {
      if (!stride || stride < 1) { stride = 1; }
      
      var pixels   = ctx.getImageData(0, 0, canvasWidth, canvasHeight),
          pdata    = pixels.data,
          l        = pdata.length,
          total    = (l / stride),
          count    = 0;
      
      // Iterate over all pixels
      for(var i = count = 0; i < l; i += stride) {
        if (parseInt(pdata[i]) === 0) {
          count++;
        }
      }
      
      return Math.round((count / total) * 100);
    }
    
    function getMouse(e, canvas) {
      var offsetX = 0, offsetY = 0, mx, my;
  
      if (canvas.offsetParent !== undefined) {
        do {
          offsetX += canvas.offsetLeft;
          offsetY += canvas.offsetTop;
        } while ((canvas = canvas.offsetParent));
      }
  
      mx = (e.pageX || e.touches[0].clientX) - offsetX;
      my = (e.pageY || e.touches[0].clientY) - offsetY;
  
      return {x: mx, y: my};
    }
    
    function handlePercentage(filledInPixels) {
      filledInPixels = filledInPixels || 0;
      console.log(filledInPixels + '%');
      if (filledInPixels > 40) {
        canvas.parentNode.removeChild(canvas);
        $('.cntext').addClass('cntxt_visible');
        $('.body').addClass('result');
      }
    }
    
    function handleMouseDown(e) {
      isDrawing = true;
      lastPoint = getMouse(e, canvas);
    }
  
    function handleMouseMove(e) {
      if (!isDrawing) { return; }
      
      e.preventDefault();
  
      var currentPoint = getMouse(e, canvas),
          dist = distanceBetween(lastPoint, currentPoint),
          angle = angleBetween(lastPoint, currentPoint),
          x, y;
      
      for (var i = 0; i < dist; i++) {
        x = lastPoint.x + (Math.sin(angle) * i) - 25;
        y = lastPoint.y + (Math.cos(angle) * i) - 25;
        ctx.globalCompositeOperation = 'destination-out';
        ctx.drawImage(brush, x, y);
      }
      
      lastPoint = currentPoint;
      handlePercentage(getFilledInPixels(32));
    }
  
    function handleMouseUp(e) {
      isDrawing = false;
    }
    
  })();
