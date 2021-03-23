
import countryCard from '../templates/country-card.hbs';
import countryList from '../templates/country-list.hbs'
import API from '../js/fetchCountries';
import getRefs from '../js/get-refs.js';
import  error  from '../js/error.js';
const debounce = require('lodash.debounce');


const refs = getRefs();

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

function onSearch(evt) {
    clearContainer();

    const form = evt.currentTarget;
    const searchQuery = form.query.value;
    API.fetchCountries(searchQuery)
        .then(renderCountryCard)
        .catch(onFetchError)
        .finaly(() => form.reset())
}
function onFetchError(error) {
    alert('не найдено!');
}
function marcup(data) {
    if (data.length === 1) {
        renderCountryList(data)
    }
    if (data.length > 0 && data.length <= 10) {
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

