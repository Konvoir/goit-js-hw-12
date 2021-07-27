import './css/styles.css';

import API from './fetchCountries';
import countryCard from './countryCard.hbs';
import renderCountryList from './renderCountryList.hbs'
import getRefs from './getRefs.js';
import Notiflix from "notiflix";



const DEBOUNCE_DELAY = 300;