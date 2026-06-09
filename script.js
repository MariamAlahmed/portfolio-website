function toggleMenu()
{
    //عشان اذا ضغطت الهامبرقر او لمستها تطلع واذا شلت المؤشر تطفي عن طريق توقل
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}
