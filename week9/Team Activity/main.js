let translate = 0;
let map = {};

window.addEventListener('keydown', function(e){
  let audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  let key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  if(!audio) return;
  audio.currentTime = 0;
  audio.play();
  //if (translate < 100) {
    //translate = translate + 10;
  //} else if (translate == 100) {
    //translate = 0;
  //}
  map[e.keyCode] = (map[e.keyCode] || 0) + 10;
  if (map[e.keyCode] < 100) {
    translate = map[e.keyCode];
  } else if (map[e.keyCode] == 100) {
    translate = 0;
    map[e.keyCode] = 0;
  }
  key.classList.add("playing");
  key.style.transform = `translateY(${translate}px)`;
});

window.addEventListener('keyup', function(e){
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);  
  key.classList.remove("playing");
});