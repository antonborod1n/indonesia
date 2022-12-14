window.addEventListener('DOMContentLoaded', () => {

  //Language menu 
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

  //Filter button show more location
  const formShowMoreBtn = document.querySelector('.form-local__show-more-btn');
  const formLocalWidget = document.querySelector('.form-local__widget');

  formShowMoreBtn.addEventListener('click', function () {
    formLocalWidget.classList.toggle('form-local__widget--active');
    formLocalWidget.addEventListener('click', function (e) {
      if (e.target.classList.contains('header__languages-link')) {
        formLocalWidget.classList.remove('form-local__widget--active');
      }
    })
  })

  //Show filter mobile
  const filter = document.querySelector('.filter');
  const filterBtn = document.querySelector('.filter-btn');
  const filterClose = document.querySelector('.filter-btn-close');

  filterBtn.addEventListener('click', function () {
    filter.classList.add('filter--active');
  });

  filterClose.addEventListener('click', function () {
    filter.classList.remove('filter--active');
  });

  //Render offers
  const mainOfferBox = document.querySelector('.offer__preview');

  function renderOffers(data) {
    const arr = [];
    if (data.length === 0) {
      showMoreBtn.style.display = 'none';
      return mainOfferBox.innerHTML = "No vacancies found. Please try another description";
    } else {
      for (let i = 0; i < data.length; i++) {
        arr.push(` <div class="offer__item ${data[i].company.toLowerCase()}">
                  <div class="offer__preview-top">
                    <div class="offer__preview-top-box">
                      <p class="offer__preview-top-title">${data[i].title}</p>
                      <div class="offer__preview-top-price-box">
                        <div class="offer__preview-top-price">
                          <span>$</span>
                          <span>12100</span>
                          <span>-</span>
                          <span>12100</span>
                        </div>
                        <a class="offer__preview-top-logo" href="#">
                          <img class="offer__preview-top-img" src="${data[i].imgLogo}" alt="Logo">
                        </a>
                      </div>
                    </div>
                    <a class="offer__preview-top-link" href="#">${data[i].location}</a>
                  </div>
                  <p class="offer__lead">
                  ${data[i].text}
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
                    <span class="offer__meta-data">${data[i].date}</span>
                  </div>
                </div>
    `
        )
      }
    }
    return arr;
  }

  const arrOffers = renderOffers(dataOffers);
  mainOfferBox.innerHTML = arrOffers.join('');

  //Search
  const searchInput = document.querySelector('.search__input');
  const filterSearchInput = document.querySelector('.filter-search__input');
  const searchBtn = document.querySelector('.search__btn');
  let searchValue = '';

  searchBtn.addEventListener('click', function () {
    filterSerch();
  })

  searchInput.addEventListener('input', function (e) {
    searchValue = e.target.value;
  })

  searchInput.addEventListener('keyup', function (e) {
    if (e.code === 'Enter') {
      filterSerch();
    }
  })

  filterSearchInput.addEventListener('input', function (e) {
    searchValue = e.target.value;
    filterSerch();
  })

  filterSearchInput.addEventListener('keyup', function (e) {
    if (e.code === 'Enter') {
      filter.classList.remove('filter--active');
      searchValue = '';
    }
  });

  function filterSerch() {
    const mainOfferBox = document.querySelector('.offer__preview');
    const rgx = new RegExp(searchValue, 'i')
    let filterArr = dataOffers.filter(item => {
      if (rgx.test(item.title)) {
        return true;
      } else {
        return false;
      }
    })

    if (filterArr.length < 5) {
      showMoreBtn.style.display = 'none';
    }

    const filterOffers = renderOffers(filterArr)
    mainOfferBox.innerHTML = filterOffers.join('');
  }

})



