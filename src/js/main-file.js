
import countryCard from '../templates/country-card.hbs';
import countryList from '../templates/country-list.hbs'
import fetchCountries from '../js/fetchCountries';
import getRefs from '../js/get-refs.js';
import  error  from '../js/error.js';
const debounce = require('lodash.debounce');
const refs = getRefs();
let inputEl = '';
refs.search.addEventListener('input', debounce(onSearch, 500));
//катка країни
function renderCountryCard(country) {
    const marcup = countryCard(country);
    refs.cardConteiner.insertAdjacentHTML('beforeend', markup);
}
function renderCountryList(country) {
    const list = countryList(country);

    refs.cardConteiner.insertAdjacentHTML('beforeend', markup);
}

function onSearch() {
    clearContainer();
    inputEl = refs.searchEl.value;
    fetchCountries(inputEl)
        .then(marcup)
        .catch(onFetchError())
       
}
function onFetchError(error) {
    alert('не найдено!');
}
function marcup(data) {
    if (data.length === 1) {
        clearContainer();
        renderCountryList(data);
    }else
    if (data.length > 1 && data.length <= 10) {
        renderCountryCard(data)
    } else {
        error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 2000,
    });
    }
}
function clearContainer() {
    refs.cardConteiner.innerHTML = '';
}

