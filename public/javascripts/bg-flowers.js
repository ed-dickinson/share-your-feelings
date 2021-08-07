
// if (!typeof colours) {
colours = ['dodgerblue', 'orchid', 'pink', 'coral', 'gold',  'springgreen'];
// }


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
  if (window.innerWidth > 500) {
    bg_flower.innerHTML = i % 2 != 1 ? '&#x273F;' : '&#x2740;';
  } else {
    bg_flower.innerHTML = i % 2 != 1 ? '&#x1f33c;' : '&#x1f338;';
  }
  bg_flower.classList.add('bg-flower');
  bg_flower.style.color = randomFrom(colours);
  i % 2 != 1
  // Math.random() < 0.5
  ? bg_flower.style.left = Math.random() * (margin-20) + 'px' :
    bg_flower.style.right = Math.random() * (margin-20) + 'px';
  bg_flower.style.top = Math.random() * height + 'px';
  bg_flower.style.transform = 'rotate(' + Math.floor(Math.random()*360) + 'deg)';


  document.body.appendChild(bg_flower);
}
console.log();
document.querySelectorAll('.random-border').forEach(border => {border.style.borderColor = randomFrom(colours);});

let avatar = document.querySelector('.avatar-empty');
if (avatar) {
  avatar.style.opacity = 0.25;
  avatar.style.backgroundColor = randomFrom(colours);
}

document.querySelectorAll('.contact-avatar').forEach(avatar => {avatar.style.backgroundColor = randomFrom(colours);});

if (window.innerWidth <= 500){
  document.querySelectorAll('.flower').forEach(flower => {
    flower.innerHTML = '&nbsp;&#x1f33c;';
  })
}
