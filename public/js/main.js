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

// Получение данных о товарах
  const mainProductBox = document.querySelector('.offer__preview');
  const GOODS_LIST = 'http://localhost:3000/data';

  async function getGoods() {
    const res = await fetch(GOODS_LIST);
    const mainProductArr = await res.json();
    renderGoods(mainProductArr);
    renderFirstGoods(mainProductArr);
  }
  
  getGoods();

//Отрисовка товаров на странице
function renderGoods(mainProductArr) {
  mainProductArr.forEach(item => {
    const newArr = item.product;
    newArr.forEach(elem => {
      const productHtml = `
                            <div class="offer__item ${elem.company.toLowerCase()} ${elem.profile.toLowerCase()}">
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
                                <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" fill="#8B8B8B">
                                  <path d="m10 15.688-.771-.792 4.375-4.354H4.312V9.458h9.292L9.229 5.104 10 4.312 15.688 10Z" />
                                </svg>
                              </a>
                            </p>
                            <div class="offer__meta">
                              <a class="offer__meta-btn" href="https://antonborod1n.github.io/indonesia/public/vacancy.html">
                                Apply
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" fill="#FFFFFF">
                                  <path d="m12 19.625-1.075-1.075 5.825-5.8H4.375v-1.5H16.75l-5.825-5.8L12 4.375 19.625 12Z" />
                                </svg>
                              </a>
                              <span class="offer__meta-data">${elem.date}</span>
                            </div>
                          </div>
        `;
      mainProductBox.insertAdjacentHTML('beforeend', productHtml);
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

jobArr = ["developer", "designer", "Analyst", "Financial", "Security", "Software", "DevOps", "Frontend"];

const filterSearch = document.querySelector('.filter-search__input');

filterSearch.oninput = function() {
  const value = this.value.trim();


  console.log(value);
}



});





