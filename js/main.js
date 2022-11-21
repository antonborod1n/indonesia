$(function () {
    $('.header__languages-select').styler();
})


const filter = document.querySelector('.filter');
const filterBtn = document.querySelector('.filter-btn');
const filterClose = document.querySelector('.filter-btn-close');

filterBtn.addEventListener('click', function () {
    filter.classList.add('filter--active');
});

filterClose.addEventListener('click', function () {
    filter.classList.remove('filter--active');
});