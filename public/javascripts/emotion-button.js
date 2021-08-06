// let colours = ['dodgerblue', 'orchid', 'pink', 'coral', 'gold',  'springgreen'];


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

const emoColorsxxxx = {
  happy : 'gold', //optimistic, energetic
  angry : 'tomato', //love, excitement
  impulsive : 'orange', //enthusiastic
  fresh : 'springgreen', //envy?
  growth : 'green', // life
  grief : 'black',
  sad : 'blue',
  wise : 'orchid', //sensive
  calm : 'deepskyblue',//calm & stable sad?
  stable : 'brown', //chocolate reliable and strong
  loving : 'pink' //kind, compassionate
}
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

let emotions = [
  {emotion : "Full of Life",
    color : "springgreen"},
  {emotion : "Optimistic & Energetic",
    color : "gold"},
  {emotion : "Excited & Loving",
    color : "coral"},
  {emotion : "Kind & Compassionate",
    color : "pink"},
  {emotion : "Sensitive & Wise",
    color : "orchid"},
  {emotion : "Calm & Stable",
    color : "dodgerblue"},
  {emotion : "Strong & Reliable",
    color : "chocolate"}
]

let index = Math.floor(Math.random() * emotions.length);

let messageBox = document.querySelector('.message-box');

let emotionButton = document.querySelector('.emotion-button');

let sendButton = document.querySelector('.send-button');

let emotionValue = document.querySelector('.msg-color');

// emotion

function changeEmotion() {
  emotionButton.style.borderColor = emotions[index].color;
  emotionButton.innerHTML = emotions[index].emotion;
  messageBox.style.borderColor = emotions[index].color;
  sendButton.style.borderColor = emotions[index].color;
  emotionValue.setAttribute('value', emotions[index].color);
  index++;
  if (index == emotions.length) {index=0;}
}

changeEmotion();

emotionButton.addEventListener('click', changeEmotion);
