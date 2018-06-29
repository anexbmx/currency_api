import {Currency} from './Currency';
import {HandlerHistoData} from './HandlerHistoData';
import {Notification} from './Notification';


export class ControllerElement {
	constructor() {
	}

	static currentCurrencyFrom() {
		const inputSelectCurrFrom = $( "#list-curr-from option:selected" );
		return new Currency(inputSelectCurrFrom.attr('value'),
			inputSelectCurrFrom.attr('data-name'),
			inputSelectCurrFrom.attr('data-symbol'));
	}

	static currentCurrencyTo() {
		const inputSelectCurrTo = $( "#list-curr-to option:selected" );
		return new Currency(inputSelectCurrTo.attr('value'),
			inputSelectCurrTo.attr('data-name'),
			inputSelectCurrTo.attr('data-symbol'));
	}

	currentSelectedCurrency(input) {
		let currencySymbol = input.attr('data-symbol');
		let currencyName = input.attr('data-name');
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

		$('#list-curr-from option:nth-of-type(9)').attr('selected','true');
		$('#list-curr-to option:nth-of-type(3)').attr('selected','true');

		const currencyFrom = ControllerElement.currentCurrencyFrom();
		$('.box-from .curr-name').text(currencyFrom.name)
		$('.box-from .icon-input').text(currencyFrom.symbol)

		const currencyTo = ControllerElement.currentCurrencyTo();
	    $('.box-to .curr-name').text(currencyTo.name)
	    $('.box-to .icon-input').text(currencyTo.symbol)

		$('.title-from').text(currencyFrom.id);
		$('.title-to').text(currencyTo.id);
	}

	setResultToInputText(response) {
		const inputTextResult = $('.curr-result');
		const from = $('#list-curr-from').val();
		const to = $('#list-curr-to').val();
		if(response == -1) {
			inputTextResult.val('');
			const notify = new Notification(Notification.emoji_sad(), `Sorry you cannot use this currency '${from} 🡒 ${to}' offline`);
			notify.showWithTime();

			return;
		}

		const inputTextValue = $('.curr-value');

		$('.current-value, .curr-one-to').text(response);
		inputTextResult.val((response * inputTextValue.val()).toFixed(3));
	}

	static setChart(histoData) {
		var ctx = document.getElementById("myChart").getContext('2d');
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

