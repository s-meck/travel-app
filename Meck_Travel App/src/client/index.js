import { mainFunction } from './js/app.js'
import { datePopulation} from './js/populateDate.js';

import './styles/styles.scss'

// populate date on page load
document.addEventListener('DOMContentLoaded', datePopulation);

// Event listener that starts it all
document.getElementById('generate').addEventListener('click', mainFunction);

export {
    mainFunction,
    datePopulation
}