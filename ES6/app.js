import {Convert} from './Convert';
import {Currency} from './Currency';
import {ControllerElement} from './ControllerElement';
import {Notification} from './Notification';
import {ServiceWorker} from './ServiceWorker';
import {DOM} from './DOM';







const sw = new ServiceWorker();
const convert = new Convert();
convert.allCurrencies();


// ------------------- << Events >>

$(function(){
	$('section').slideDown(500)

	DOM.getById('list-curr-from').addEventListener('change', () => {
		const currency = ControllerElement.currentCurrencyFrom();
		DOM.setContent('.box-from .curr-name', currency.name);
		DOM.setContent('.box-from .icon-input', currency.symbol);
		DOM.setContentAll('.title-from', currency.id);
		DOM.setContent('.curr-one-to', '?.????');
	})

	DOM.getById('list-curr-to').addEventListener('change', () => {
		const currency = ControllerElement.currentCurrencyTo();
		DOM.setContent('.box-to .curr-name', currency.name);
		DOM.setContent('.box-to .icon-input', currency.symbol);
		DOM.setContentAll('.title-to', currency.id);
		DOM.setContent('.curr-one-to', '?.????');
	})

	DOM.query('.reverse').addEventListener('click', (event) => {
		 event.preventDefault();	})

	DOM.query('.btn-convert').addEventListener('click', () => {
		const currency_from = ControllerElement.currentCurrencyFrom();
		const currency_to = ControllerElement.currentCurrencyTo();

		const convert = new Convert(currency_from,currency_to);
		convert.convertCurrency();
	    convert.historicalData();

	})

	DOM.query('.dismiss').addEventListener('click', () => {
		$('.notification').slideUp(500);
	})

})
