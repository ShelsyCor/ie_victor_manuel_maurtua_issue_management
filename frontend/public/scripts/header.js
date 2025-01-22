window.addEventListener("scroll", function() {
    const header = document.getElementsByClassName("low-header")[0];
    const responsiveMenu = document.getElementById("responsive-menu");
    header.classList.toggle("sticky", window.scrollY > 50);
    responsiveMenu.classList.toggle("sticky", window.scrollY > 50);
})