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
