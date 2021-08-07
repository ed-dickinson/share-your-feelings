let feelings_words = document.querySelectorAll('.feelings-word');

let colours = ['dodgerblue', 'orchid', 'pink', 'coral', 'gold',  'springgreen'];

feelings_words.forEach(word => {
  word.style.color = randomFrom(colours);
});

function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)];;
}

if (window.innerWidth > 500) {

function newColour(oldcolour) {
  let newI = (colours.indexOf(oldcolour)+(Math.random() < 0.5 ? 1 : 1));
  // console.log(newI);
  if (newI == -1) {newI = colours.length-1;}
  else if (newI == colours.length) {newI = 0}
  return colours[newI];
}

let movers = [];



for (let i = 0; i < 4; i++) {
  let parent = randomFrom(feelings_words);
  let mover = document.createElement('div');
  mover.innerHTML = parent.innerHTML;
  mover.style.opacity = 1;
  mover.style.position = 'absolute';
  document.body.appendChild(mover);
  movers.push(mover);

  let target = randomFrom(feelings_words);
  while (target == parent) {target = randomFrom(feelings_words);}

  mover.style.left = parent.offsetLeft + 'px';
  mover.style.top = parent.offsetTop + 'px';

  mover.style.color = Math.random() < 0.5 ?
    parent.style.color : newColour(parent.style.color);


  let id = null;
  let progress = 0;
  let duration = 180 + (i*20);
  clearInterval(id);
  id = setInterval(frame, 10);
  function frame() {
    if (progress == duration) {
      parent = target;
      target.style.color = mover.style.color;
      target = randomFrom(feelings_words);
      while (target == parent) {target = randomFrom(feelings_words);} // this will sort out paused ones
      mover.style.color = Math.random() < 0.5 ?
        parent.style.color : newColour(parent.style.color);
      progress = 0;
      // clearInterval(id);
    } else {
      progress++;
      // console.log(i + ' -' + progress);
      // mover.innerHTML = progress + '/' + duration;
      //IF TAGRET IS SELF!
      mover.style.top = parent.offsetTop + (target.offsetTop - parent.offsetTop) * (progress / duration) + 'px';
      mover.style.left = parent.offsetLeft + (target.offsetLeft - parent.offsetLeft) * (progress / duration) + 'px';

      mover.style.fontSize = parseInt(window.getComputedStyle(parent).fontSize.slice(0,-2)) + ((parseInt(window.getComputedStyle(target).fontSize.slice(0,-2)) - parseInt(window.getComputedStyle(parent).fontSize.slice(0,-2))) * (progress / duration)) + 'px';

    }
  }

}



function moveWords() {
  if (movers.length == 0) { // create moving words
    feelings_words.forEach(word => {
      let mover = document.createElement('div');
      mover.innerHTML = word.innerHTML;
      mover.style.opacity = 0.5;
      mover.style.position = 'absolute';
      document.body.appendChild(mover);
      movers.push(mover);

      word.style.color = randomFrom(colours);
    });
  };

  let i = 0;
  feelings_words.forEach(word => {
    let target = randomFrom(feelings_words);

    let mover = movers[i];
    i++;
    mover.style.left = word.offsetLeft + 'px';
    mover.style.top = word.offsetTop + 'px';
    mover.style.color = Math.random() < 0.3 ? word.style.color : randomFrom(colours);

    let id = null;
    let progress = 0;
    clearInterval(id);
    id = setInterval(frame, 10);
    function frame() {
      if (progress == 200) {
        target.style.color = mover.style.color;
        clearInterval(id);
      } else {
        progress++;
        mover.style.top = word.offsetTop + (target.offsetTop - word.offsetTop) * (progress / 200) + 'px';
        mover.style.left = word.offsetLeft + (target.offsetLeft - word.offsetLeft) * (progress / 200) + 'px';

        mover.style.fontSize = parseInt(window.getComputedStyle(word).fontSize.slice(0,-2)) + ((parseInt(window.getComputedStyle(target).fontSize.slice(0,-2)) - parseInt(window.getComputedStyle(word).fontSize.slice(0,-2))) * (progress / 200)) + 'px';

      }
    }
  });
};
let indexZ = 0;
document.querySelectorAll('.title-word').forEach(word => {
  if (indexZ != 2) {
    word.style.fontSize = word.parentNode.offsetWidth / word.offsetWidth / 4 + 'em';
  } else {
    word.style.fontSize = word.parentNode.offsetWidth / word.offsetWidth / 2 + 'em';
  }
  indexZ++;

  word.style.color = randomFrom(colours);

})

} else { // mOBILE
  document.querySelectorAll('.title-word').forEach(word => {
    word.style.fontSize = word.parentNode.offsetWidth / word.offsetWidth + 'em';
    word.style.color = randomFrom(colours);
  })
}
