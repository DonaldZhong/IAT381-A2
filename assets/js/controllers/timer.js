 clockApp.controller('timerController', function($scope) {
        $scope.message = 'timerpage';
    });
 // Global variables
var cursorY;
var interval;

var step        = 5;
var clockActive = false;
var timerInt    = 0;
var startSize   = 50

// DOM elements
var circle       = document.getElementById("circle");
var count        = document.getElementById("count");
var label        = document.getElementById("label");
var reset        = document.getElementById("reset");
var instructions = document.getElementById("instructions");

// Initialize circle properties
var initializeCircle = function() {
  circle.style.height = startSize + "px";
  circle.style.width  = startSize + "px";
  circle.className = "";
}

initializeCircle();

// Check if clock is being resized (press event)
var isClockActive = function(event) {
  if(clockActive === true) {
    clockActive = false;
  } else {
    clockActive = true;
  }
  
  return clockActive;
}

// Hide instructions
var hideInstructions = function() {
  instructions.style.display = "none";
}

// Update timer count label
var updateLabel = function(sec) {
  count.textContent = sec;
}

// Shrink the circle
var shrinkCircle = function(event) {  
  if(timerInt <= 0) {
    circle.className = "complete";
    
    clearInterval(interval);
  } else {
    timerInt--;
    updateLabel(timerInt);
    
    circle.style.height = parseInt(circle.style.height) - step + "px";
    circle.style.width  = parseInt(circle.style.width) - step + "px";
  }
}

// Enable resizing
document.onmousedown = function(event) {
  isClockActive();
}

// Disable resizing
document.onmouseup = function(event) {
  clockActive = false;
}

// Show timer start button
circle.onclick = function(event) {
  this.className = "active";
  reset.style.display = "none";
  interval = window.setInterval(shrinkCircle, 1000);
}

// Determine resizing direction
document.onmousemove = function(event) {
  if(clockActive === true) {
    currentY = cursorY;
    cursorY  = event.pageY;
    
    hideInstructions();
    reset.style.display = "inline-block";
    
    if(cursorY < currentY) {
      if(parseInt(circle.style.height) >= startSize) {
        circle.style.height = parseInt(circle.style.height) - step + "px";
        circle.style.width  = parseInt(circle.style.width) - step + "px";
        
        timerInt--;
        updateLabel(timerInt);
      }
    } else {
      circle.style.height = parseInt(circle.style.height) + step + "px";
      circle.style.width  = parseInt(circle.style.width) + step + "px";
      
      timerInt++;
      updateLabel(timerInt);
    }
  }
}

// Reset timer and stage
reset.onclick = function(event) {
  clearInterval(interval);
  
  timerInt = 0;
  updateLabel(timerInt);
  
  initializeCircle();
  
  this.style.display = "none";
}