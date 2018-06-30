import {Currency} from './Currency';
import {HandlerHistoData} from './HandlerHistoData';
import {Notification} from './Notification';
import {DOM} from './DOM';

export class ControllerElement {
	constructor() {
	}

	static currentCurrencyFrom() {
		const currentOption = DOM.currentOption("list-curr-from");
		return new Currency(currentOption.attributes['value'].value,
			currentOption.attributes['data-name'].value,
			currentOption.attributes['data-symbol'].value);
	}

	static currentCurrencyTo() {
		const currentOption = DOM.currentOption("list-curr-to");
		return new Currency(currentOption.attributes['value'].value,
			currentOption.attributes['data-name'].value,
			currentOption.attributes['data-symbol'].value);
	}

	currentSelectedCurrency(input) {
		let currencySymbol = input.attributes['data-symbol'].value;
		let currencyName = input.attributes['data-symbol'].value;
		console.log(currencySymbol,currencyName);
	}

	fillSelectInput(response) {
		const currencies = response;

		const selectInput = $('.list-curr');
		for (let key in currencies) {
			let currencySymbol = currencies[key].currencySymbol || currencies[key].id;
			const currency = new Currency(currencies[key].id, currencies[key].currencyName,currencySymbol);
			selectInput.append(`<option data-symbol="${currency.symbol}" data-name="${currency.name}" value="${currency.id}">${currency.id}</option>`)
		}

		DOM.getById('list-curr-from').selectedIndex = 8;
		DOM.getById('list-curr-to').selectedIndex = 2;

		const currencyFrom = ControllerElement.currentCurrencyFrom();
		DOM.setContent('.box-from .curr-name', currencyFrom.name);
		DOM.setContent('.box-from .icon-input', currencyFrom.symbol);

		const currencyTo = ControllerElement.currentCurrencyTo();
	    DOM.setContent('.box-to .curr-name', currencyTo.name)
	    DOM.setContent('.box-to .icon-input', currencyTo.symbol);

		DOM.setContentAll('.title-from', currencyFrom.id);
		DOM.setContentAll('.title-to', currencyTo.id);
	}

	setResultToInputText(response) {
		const inputTextResult = DOM.query('.curr-result');
		const from = DOM.getById('list-curr-from').value;
		const to = DOM.getById('list-curr-to').value;
		console.log('from'+from,'to'+to);
		if(response == -1) {
			inputTextResult.value = '';
			const notify = new Notification(Notification.emoji_sad(), `Sorry you cannot use this currency '${from} 🡒 ${to}' offline`);
			notify.showWithTime();

			return;
		}

		const inputTextValue = DOM.query('.curr-value');

		DOM.setContent('.current-value', response);
		DOM.setContent('.curr-one-to', response);
		inputTextResult.value = (response * inputTextValue.value).toFixed(3);
	}

	static setChart(histoData) {
		var ctx = DOM.getById("myChart").getContext('2d');
		var myChart = new Chart(ctx, {
			type: 'bar',
			data: {
				labels: histoData.labels,
				datasets: [{
					label: '',
					data: histoData.values,
					type: 'line',
					pointRadius: 3,
					lineTension: 0,
					backgroundColor:
					'rgba(8, 8, 8, 0.2)',
					borderColor: 'rgb(75, 53, 91)',
					borderWidth: 2
				}]
			},
			options: {
				maintainAspectRatio:false,
				scales: {
					yAxes: [{

					}]
				}
			}
		});

	}
	static setDetailTableInfo(object ,type = 'from') {
		$(`.max-${type}`).text(object.max);
		$(`.min-${type}`).text(object.min);
		$(`.avg-${type}`).text(object.avg);
	}

	fillTable(histo1, histo2) {
		ControllerElement.setChart(histo1);
		ControllerElement.setDetailTableInfo(HandlerHistoData.getDetails(histo1.values))
		ControllerElement.setDetailTableInfo(HandlerHistoData.getDetails(histo2.values),'to')
	}

	fillOfflineCurr(data) {
		const list_offline = $('.list-offline ul');
		list_offline.html('');
		for(let item of data) {
			const keys = item.id.split('_');
			const li = `<li><span class="from">${keys[0]}</span> 🡒
						<span class="to">${keys[1]}</span></li>`;
			list_offline.append(li);
		}
	}
}

