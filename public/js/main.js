window.addEventListener('DOMContentLoaded', () => {

  //Стилизация select
  $(function () {
    $('.header__languages-select').styler();
  });

  //Фильтр мобильная версия
  const filter = document.querySelector('.filter');
  const filterBtn = document.querySelector('.filter-btn');
  const filterClose = document.querySelector('.filter-btn-close');

  filterBtn.addEventListener('click', function () {
    filter.classList.add('filter--active');
  });

  filterClose.addEventListener('click', function () {
    filter.classList.remove('filter--active');
  });

  // Получение данных 
  const mainOfferBox = document.querySelector('.offer__preview');
  const OFFER_LIST = 'http://localhost:3000/data';

  async function getOffers() {
    const res = await fetch(OFFER_LIST);
    const offerArr = await res.json();
    renderOffers(offerArr);
  }

  getOffers();

  //Поиск
  const searchInput = document.querySelector('.search__input');
  const searchBtn = document.querySelector('.search__btn');
  let searchValue = '';

  searchBtn.addEventListener('click', function () {
    filterSerch()
  })

  searchInput.addEventListener('input', function (e) {
    searchValue = e.target.value.trim();
  })

  function filterSerch() {
    let filterArr = arr.filter(item => {
      if (item.title.includes(searchValue)) {
        return true;
      } else {
        return false;
      }
    })
  }

  //Отрисовка на странице
  function renderOffers(offerArr) {
    offerArr.forEach(elem => {
      const productHtml = `
                            <div class="offer__item ${elem.company.toLowerCase()} ${elem.profile.toLowerCase()}" data-id="${elem.id}">
                            <div class="offer__preview-top">
                              <div class="offer__preview-top-box">
                                <p class="offer__preview-top-title">${elem.title}</p>
                                <div class="offer__preview-top-price">
                                  <span>$</span>
                                  <span>${elem.priceFrom}</span>
                                  <span>-</span>
                                  <span>${elem.priceTo}</span>
                                </div>
                              </div>
                              <div class="offer__preview-top-box">
                                <a class="offer__preview-top-link" href="#">${elem.location}</a>
                                <a class="offer__preview-top-logo" href="#">
                                  <img class="offer__preview-top-img" src="${elem.imgLogo}" alt="Logo">
                                </a>
                              </div>
                            </div>
                            <p class="offer__lead">
                            ${elem.text}
                            <a class="offer__lead-more" href="#">
                            more
                            <span class="material-symbols-outlined">
                              arrow_right_alt
                            </span>
                          </a>
                            </p>
                            <div class="offer__meta">
                            <a class="offer__meta-btn" href="#">
                            Apply
                            <span class="material-symbols-outlined">
                              arrow_right_alt
                            </span>
                          </a>
                              <span class="offer__meta-data">${elem.date}</span>
                            </div>
                          </div>
        `;

      filterButtons();
    });
  }

  //Кнопки 

  function filterButtons() {
    const filterItems = document.querySelectorAll('.offer__item');
    const controlBtns = document.querySelector('.top__control-btns');

    controlBtns.addEventListener('click', (e) => {
      const target = e.target;

      if (target.tagName !== 'BUTTON') return false;
      let filterClass = target.dataset['filter'];

      filterItems.forEach(elem => {
        elem.classList.remove('hide')
        if (!elem.classList.contains(filterClass)) {
          elem.classList.add('hide')
        }
      })
    })
  }

  //Кнопка показа show more
  const showMoreBtn = document.querySelector('.show-more__btn');
  let items = 5;

  showMoreBtn.addEventListener('click', () => {
    const itemsLength = document.querySelectorAll('.offer__item').length;
    items += 5;

    const arr = Array.from(document.querySelectorAll('.offer__item'));
    const visibleArr = arr.slice(0, items);

    visibleArr.forEach(elem => {
      elem.classList.add('visible');
    });

    if (visibleArr.length === itemsLength) {
      showMoreBtn.style.display = 'none';
    }
  })

  //Меню языковое 
  const languagesMenuBtn = document.querySelector('.header__languages-menu-btn');
  const languagesMenu = document.querySelector('.header__languages-menu');

  languagesMenuBtn.addEventListener('click', function () {
    languagesMenu.classList.toggle('header__languages-menu--active');
    languagesMenu.addEventListener('click', function (e) {
      if (e.target.classList.contains('header__languages-link')) {
        languagesMenu.classList.remove('header__languages-menu--active');
      }
    })
  })


})
