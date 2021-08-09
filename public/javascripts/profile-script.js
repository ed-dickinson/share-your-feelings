let loggedIn = document.querySelector('.logged-in');
loggedIn.setAttribute('href', '/log-out');
loggedIn.innerHTML = 'Log Out';

function showEmailForm() {
  emailButton.style.display = 'none';
  document.querySelector('.email-form').style.display = 'inline';
};
let emailButton = document.querySelector('.add-email-button');
if (emailButton) {
  emailButton.addEventListener('click', showEmailForm);
}

let photoButton = document.querySelector('.add-photo-button');
function showPhotoForm() {
  photoButton.style.display = 'none';
  document.querySelector('.add-photo-form>input').style.display = 'block';
  document.querySelector('.add-photo-form>button').style.display = 'block';
};
if (photoButton) {
  photoButton.addEventListener('click', showPhotoForm);
}

if (window.innerWidth <= 500) {
  let profileAvatar = document.querySelector('.avatar');
  let deleteButton = document.querySelector('.delete-photo-form');

  function showDeleteButton() {
    deleteButton.style.display = 'block';
  }

  if (profileAvatar.classList.contains('avatar-profile')) {
    profileAvatar.addEventListener('click', showDeleteButton);
  }
}
