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

  //Отрисовка на странице
  function renderOffers(offerArr) {
    offerArr.forEach(item => {
      const newArr = item.product;
      newArr.forEach(elem => {
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
        mainOfferBox.insertAdjacentHTML('afterbegin', productHtml);
        filterButtons();
      });
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
    const filterItems = document.querySelectorAll('.offer__item');
    const itemsLength = filterItems.length;
    items += 5;
    const arr = Array.from(document.querySelectorAll('.offer__item'));
    const visibleArr = arr.slice(0, items);

    visibleArr.forEach(elem => {
      elem.classList.add('offer__item-visible');
    });
    console.log(itemsLength)
    if (visibleArr.length === itemsLength) {
      showMoreBtn.style.display = 'none';
    }
  })
});





