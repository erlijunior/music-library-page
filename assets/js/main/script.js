const buttonMenu = document.querySelector('[data-toggle="menu"]');
const menuMobile = document.querySelector('.sidebar');

function toggleMenu() {
  menuMobile.classList.toggle('opened');
  buttonMenu.classList.toggle('active');
}

buttonMenu.addEventListener('click', toggleMenu);