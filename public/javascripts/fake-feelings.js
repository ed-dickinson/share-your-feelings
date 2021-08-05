

let fake_colours = ['dodgerblue', 'orchid', 'pink', 'coral', 'gold',  'springgreen'];


const emoColorsxx = {
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

function randomFrom(array) {
  return array[Math.floor(Math.random()*array.length)];;
}

function randomWhole(limit) {
  return Math.floor(Math.random() * limit) + 1;
}

function createWord() {
  let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n','o', 'q','p'];
  let word = randomFrom(letters);

  while (Math.random() > (word.length < 4 ? 0.2 : 0.6)) {
    word += randomFrom(letters);
    if (word.length >= 8) {return word;}
  };
  return word;
}

function createSentence() {
  let first_word = createWord();

  first_word = first_word.length == 1 ? first_word.toUpperCase() : first_word.substr(0,1).toUpperCase() + first_word.substr(1);

  let sentence = first_word;

  while (Math.random() > 0.2) {
    sentence += ' ' + createWord();
    // if (sentence.length >= 100) {return word;}
  };

  sentence += Math.random() > 0.75 ? '.' : Math.random() > 0.5 ? '?' : '!';

  return sentence;
}

for (let i = 0; i < 20; i++) {
  let fake_feeling_cont = document.createElement('div');
  fake_feeling_cont.classList.add('public-feeling-cont');
  let fake_feeling = document.createElement('div');
  let fake_feeling_message = document.createElement('div');
  fake_feeling_message.classList.add('public-feeling-msg');
  fake_feeling.classList.add('public-feeling');
  fake_feeling.style.borderColor = randomFrom(fake_colours);


  let message = createSentence();
  while (Math.random() > 0.3) {
    message += ' ' + createSentence();
  };

  fake_feeling.appendChild(fake_feeling_message);
  fake_feeling_message.innerHTML = message;
  fake_feeling_cont.appendChild(fake_feeling);
  document.getElementsByTagName('main')[0].appendChild(fake_feeling_cont);

  let author = document.createElement('div');
  author.innerHTML = createWord();
  author.classList.add('public-feeling-author');
  fake_feeling.appendChild(author);

  // console.log(fake_feeling_message.innerHTML.length);

  if (fake_feeling_message.innerHTML.length < 200) {
    fake_feeling_message.style.maxWidth = '400px';
  } else if (fake_feeling_message.innerHTML.length < 150) {
    fake_feeling_message.style.maxWidth = '300px';
  }

  fake_feeling.style.left =  ((parseInt(document.getElementsByTagName('main')[0].clientWidth) - parseInt(fake_feeling.clientWidth)) * Math.random()) + 'px';

}
