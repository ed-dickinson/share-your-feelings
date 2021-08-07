
console.log();

let login_opener = document.querySelector('.log-in');
let login_form = document.querySelector('.log-in-form');

function openLogIn() {
  console.log('open login');
  login_opener.style.display = 'none';
  login_form.style.display = 'inline';

}

if (login_opener) {
  login_opener.addEventListener('click', openLogIn);
}



// document.querySelectorAll('.random-border').forEach(border => {border.style.borderColor = randomFrom(colours);});
// document.querySelector('.button').style.borderColor = randomFrom(colours);
