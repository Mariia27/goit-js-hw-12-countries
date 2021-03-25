
import countryCard from '../templates/country-card.hbs';
import countryList from '../templates/country-list.hbs'
import API from '../js/fetchCountries';
import getRefs from '../js/get-refs.js';
import  error  from '../js/error.js';
const debounce = require('lodash.debounce');
const refs = getRefs();
//let inputEl = '';
refs.searchEl.addEventListener('input', debounce(onSearch, 1500));
//катка країни
function renderCountryCard(country) {
    const markup = countryCard(country);
    refs.cardConteiner.insertAdjacentHTML('beforeend', markup);
}
function renderCountryList(country) {
    const list = countryList(country);

    refs.cardConteiner.insertAdjacentHTML('beforeend', list);
}

function onSearch(e) {
    clearContainer();
    e.preventDefault();
    const inputEl = e.target.value;
    API(inputEl)
        .then(marcup)
        .catch(onFetchError)
       
}
function onFetchError(error) {
    alert('не найдено!');
}
function marcup(data) {
    if (data.length === 1) {
       // clearContainer();
        renderCountryCard(data)
        
    }else
    if (data.length > 1 && data.length <= 10) {
        renderCountryList(data);
    }
    if (data.length > 10) {
         error({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 3000,
    }); 
    }
      
    
}
function clearContainer() {
    refs.cardConteiner.innerHTML = '';
}

