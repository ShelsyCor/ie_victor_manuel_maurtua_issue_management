const responsiveMenu = document.getElementById('responsive-menu');
const themeIcon = document.querySelector('#theme-icon');

let change = true;
let menuIcons = themeIcon.querySelectorAll('.iconify');
menuIcons[1].style.display = 'none';

themeIcon.addEventListener('click', () => {
    responsiveMenu.classList.toggle('show');

    menuIcons = themeIcon.querySelectorAll('.iconify');

    menuIcons[1].style.display = change ? 'block' : 'none';
    menuIcons[0].style.display = change ? 'none' : 'block';
    change = !change;
});