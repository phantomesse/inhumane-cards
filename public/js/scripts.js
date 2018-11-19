const socket = io();
new ViewController();

$(document).ready(function() {
  var root = document.documentElement    
  root.requestFullscreen || root.webkitRequestFullscreen || root.mozRequestFullScreen ||
    root.msRequestFullscreen;
});
