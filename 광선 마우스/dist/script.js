// declares variables for big circle and small circle in cursor
var cursorBig = document.querySelector('.big');
var cursorSmall = document.querySelector('.small');

// positions the two circles in a desired placement
document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorBig.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
});

document.addEventListener('mousemove', function(e){
  var x = e.clientX;
  var y = e.clientY;
  cursorSmall.style.left = x + 'px';
  cursorSmall.style.top = y + 'px';
});

// adds class when cursor clicks
document.addEventListener('mousedown', function(){
  cursorBig.classList.add('click');
  cursorSmall.classList.add('hover__small')
});

// removes class when cursor stops clicking
document.addEventListener('mouseup', function(){
  cursorBig.classList.remove('click')
  cursorSmall.classList.remove('hover__small')
});
