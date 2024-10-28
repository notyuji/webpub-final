
function toggleMenu() {
    var container = document.querySelector('.container');
    var mobileMenu = document.querySelector('.mobile-menu');
    var divOne = document.querySelector('.div1');
    var divTwo = document.querySelector('.div2');
    var divThree = document.querySelector('.div3');
    mobileMenu.classList.toggle('active');
    container.classList.toggle('active');
    divOne.classList.toggle('active');
    divTwo.classList.toggle('active');
    divThree.classList.toggle('active');
}
