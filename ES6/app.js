import {Convert} from './Convert';
import {Currency} from './Currency';
import {ControllerElement} from './ControllerElement';
import {Notification} from './Notification';
import {ServiceWorker} from './ServiceWorker';







const sw = new ServiceWorker();
const convert = new Convert();
convert.allCurrencies();


// ------------------- << Events >>

$(function(){
	$('section').slideDown(500)

	$('#list-curr-from').on('change', () => {
		const currency = ControllerElement.currentCurrencyFrom();
		$('.box-from .curr-name').text(currency.name)
		$('.box-from .icon-input').text(currency.symbol)
		$('.title-from').text(currency.id);
		$('.curr-one-to').text('?.????')
	})

	$('#list-curr-to').on('change', () => {
		const currency = ControllerElement.currentCurrencyTo();
		$('.box-to .curr-name').text(currency.name)
		$('.box-to .icon-input').text(currency.symbol)
		$('.title-to').text(currency.id);
		$('.curr-one-to').text('?.????')
	})

	$('.reverse').on('click', () => {
		return false;
	})

	$('.btn-convert').on('click', () => {
		const currency_from = ControllerElement.currentCurrencyFrom();
		const currency_to = ControllerElement.currentCurrencyTo();

		const convert = new Convert(currency_from,currency_to);
		convert.convertCurrency();
	    convert.historicalData();

	})

	$('.dismiss').on('click', () => {
		$('.notification').slideUp(500);
	})

	$('.curr-value').on('keyup', (event) => {
		const btnConvert = $('.btn-convert')
		if ($(event.target).val().length == 0) {
			btnConvert.addClass('disabled')
			btnConvert.attr('disabled',true)
		}
		else {
			btnConvert.removeClass('disabled');
			btnConvert.attr('disabled',false)
		}
	})

	// Get the modal


})
