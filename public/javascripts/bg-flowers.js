let colours = ['dodgerblue', 'orchid', 'pink', 'coral', 'gold',  'springgreen'];


//chocolate, darkgoldenrod, sienna
//coral, tomato, firebrick, indianred
//hotpink, lightcoral, lightpink
//blueviolet, indigo, mediumpurple, orchid, plum
//darkblue,
//cadetblue, deepskyblue, lightskyblue
//darkgreen, darkolivegreen, forestgreen, seagreen
//limegreen, springgreen, palegreen
//lightsalmon
//gold, khaki

function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)];;
}

let flowers = document.querySelectorAll('.flower');

document.querySelectorAll('.flower').forEach(flower => {
  flower.style.color = randomFrom(colours);
});

let windowHeight = window.innerHeight
  , windowWidth = window.innerWidth
  , mainWidth = document.getElementsByTagName('main')[0].clientWidth
  , docHeight = document.body.offsetHeight;

let margin = (windowWidth - mainWidth) / 2;
let height = (windowHeight > docHeight ? windowHeight : docHeight);

console.log(margin + ',' + height);


for (let i = 0; i < Math.floor(margin*height*0.0002); i++) {
  let bg_flower = document.createElement('span');
  bg_flower.innerHTML = i % 2 != 1 ? '&#x273F;' : '&#x2740;';
  bg_flower.classList.add('bg-flower');
  bg_flower.style.color = randomFrom(colours);
  i % 2 != 1
  // Math.random() < 0.5
  ? bg_flower.style.left = Math.random() * (margin-20) + 'px' :
    bg_flower.style.right = Math.random() * (margin-20) + 'px';
  bg_flower.style.top = Math.random() * height + 'px';
  bg_flower.style.transform = 'rotate(' + Math.floor(Math.random()*360) + 'deg)';


  document.body.appendChild(bg_flower);
  // console.log(document.body.offsetHeight + '/' + document.body.scrollHeight + 'x' + document.body.offsetWidth);
}
console.log();
// console.log(window.innerHeight + 'x' + window.innerWidth);
document.querySelectorAll('.random-border').forEach(border => {border.style.borderColor = randomFrom(colours);});
// document.querySelector('.button').style.borderColor = randomFrom(colours);
