let feelings_words = document.querySelectorAll('.feelings-word');

let colours = ['dodgerblue', 'coral', 'gold', 'pink', 'springgreen'];

function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)];;
}

function moveWords() {
  feelings_words.forEach(word => {
    word.style.color = randomFrom(colours);
    let target = randomFrom(feelings_words);
    let mover = document.createElement('div');
    mover.innerHTML = word.innerHTML;
    mover.style.left = word.offsetLeft + 'px';
    mover.style.top = word.offsetTop + 'px';
    mover.style.color = word.style.color;
    mover.style.opacity = 0.5;
    mover.style.position = 'absolute';
    document.body.appendChild(mover);

      let id = null;
      let progress = 0;
      clearInterval(id);
      id = setInterval(frame, 10);
      function frame() {
        if (progress == 200) {
          clearInterval(id);
        } else {
          progress++;
          mover.style.top = word.offsetTop + (target.offsetTop - word.offsetTop) * (progress / 200) + 'px';
          mover.style.left = word.offsetLeft + (target.offsetLeft - word.offsetLeft) * (progress / 200) + 'px';
        }
      }
  });
};

moveWords();
setInterval(moveWords, 2000);
