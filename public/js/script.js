const mainOfferBox = document.querySelector('.offer__preview');

function renderOffers(data) {
  const arr = [];
  for (let i = 0; i < data.length; i++) {
    arr.push(`
    <div class="offer__item">
    <div class="offer__preview-top">
      <div class="offer__preview-top-box">
        <p class="offer__preview-top-title">${data[i].title}</p>
        <div class="offer__preview-top-price">
          <span>$</span>
          <span>${data[i].priceFrom}</span>
          <span>-</span>
          <span>${data[i].priceTo}</span>
        </div>
      </div>
      <div class="offer__preview-top-box">
        <a class="offer__preview-top-link" href="#">${data[i].location}</a>
        <a class="offer__preview-top-logo" href="#">
          <img class="offer__preview-top-img" src="${data[i].imgLogo}" alt="Logo">
        </a>
      </div>
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
  return arr;
}

const arrOffers = renderOffers(dataOffers);
mainOfferBox.innerHTML = arrOffers.join('');

//Поиск
const searchInput = document.querySelector('.search__input');
const searchBtn = document.querySelector('.search__btn');
let searchValue = '';

searchBtn.addEventListener('click', function () {
  filterSerch()
})

searchInput.addEventListener('input', function (e) {
  searchValue = e.target.value;
})

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
  const filterOffers = renderOffers(filterArr)
  mainOfferBox.innerHTML = filterOffers.join('');
}
