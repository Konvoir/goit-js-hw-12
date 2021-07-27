import './css/styles.css';

import API from './fetchCountries';
import countryCard from './countryCard.hbs';
import renderCountryList from './renderCountryList.hbs'
import getRefs from './getRefs.js';
import Notiflix from "notiflix";


const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.searchCountry.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));


function onSearch (e) {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    const searchLetter = e.target.value;
    console.log(searchLetter)

    API.fetchCountries(searchLetter)
    .then(renderCountryCard)
    .catch(error => console.log(error))
}

function renderCountryCard (countries){
      if (countries.length === 1) {
        refs.countryInfo.insertAdjacentHTML('beforeend', countryCard(countries[0]));
      } 
      else if (countries.length > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
      }
      else if (countries.status === 404) {
        Notiflix.Notify.failure('Oops, there is no country with that name');
      }
      else if (countries.length >= 2 && countries.length <= 10) {
        refs.countryList.insertAdjacentHTML('afterbegin', renderCountryList(countries));
       
      } 

}