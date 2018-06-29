import {ControllerElement} from './ControllerElement';
import {IndexDb} from './IndexDb';

function objectToArray(object){
		let values = [];
		let labels = []
		for (let key in object){
			values.push(object[key])
			labels.push(key)
		}
		return {labels, values}
}

export class HTTPClient {
	constructor(convert) {
		this.controllerElement = new ControllerElement();
		this.idb = new IndexDb();
		this.convert = convert;

		const modal = document.getElementById('myModal');
		$('#myBtn').on('click', () => {
		    modal.style.display = "block";
		    this.idb.getAllConverter().then(dt => {
		    	this.controllerElement.fillOfflineCurr(dt);
		    })
		})

		$(".close").on('click', () => {
		    modal.style.display = "none";
		});

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
		    if (event.target == modal) {
		        modal.style.display = "none";
		    }
		}
	}

	logResult(response) {
		console.log(response);
	}

	logError(error) {
		console.log('Looks like there was a problem : \n', error);
	}

	getResultAsJson(response) {
		return response.json();
	}

	getResultAsText(response) {
		return response.text();
	}

	validateResponse(response) {
		if(!response.ok)
			throw Error(response.statusText);
		return response;
	}

	fillSelectInput(link) {

		fetch(link)
		.then(this.validateResponse)
		.then(this.getResultAsJson)
		.then(response => {
			try{
				this.idb.addCurrency(response.results);
				this.controllerElement.fillSelectInput(response.results);

			}catch(e) {
				throw Error(e);
			}

		})
		.catch(e => {
			this.logError(e);
			this.idb.getCurrencies().then(data => {
				this.controllerElement.fillSelectInput(data);
			});
		})
	}

	setResultToInputText(link) {

		const key = `${this.convert.currency_from.id}_${this.convert.currency_to.id}`;
		fetch(link)
		.then(this.validateResponse)
		.then(this.getResultAsJson)
		.then(response => {
			try{
				const id = Object.keys(response)[0];
				const value = response[id].toFixed(5)
				this.idb.addConverter({id,value})
				this.controllerElement.setResultToInputText(value)
			}catch(e){
				throw e;
			}
		})
		.catch(error => {
			this.logError(error);
			this.idb.getConverter(key).then( value => {
				if(!value)
					value = -1;
				else
					value = value.value;
				console.log(value)
				this.controllerElement.setResultToInputText(value)
			})
		})
	}

	getData(link) {
		fetch(link)
		.then(this.validateResponse)
		.then(this.getResultAsJson)
		.then(this.logResult)
		.catch(this.logError)
	}

	fillTable(link) {
		fetch(link)
		.then(this.validateResponse)
		.then(this.getResultAsJson)
		.then(response => {
			try{
				$('.AmountWrap').show(500, () => {
					$('.chart-info article').show(500)
				});

				const keys = Object.keys(response);
				console.log(keys[0],keys[1])
				let histoData1 = objectToArray(response[keys[0]]);
				let histoData2 = histoData1;
				this.idb.addHisto({id:keys[0], value:histoData1});
				if (keys.length > 1) {
					console.log(keys.length)
						histoData2 = objectToArray(response[keys[1]])
						this.idb.addHisto({id:keys[1], value:histoData2});
				}
				this.controllerElement.fillTable(histoData1,histoData2);

			}catch(e){
				throw Error(e);
			}
		})
		.catch(error => {
			const key1 = `${this.convert.currency_from.id}_${this.convert.currency_to.id}`;
			const key2 = `${this.convert.currency_to.id}_${this.convert.currency_from.id}`;
			this.idb.getHistoricalData(key1).then(histo1 => {
				if(!histo1) {
					$('.AmountWrap').hide(500, () => {
						$('.chart-info article').hide(500)
					});
					return;
				}

				$('.AmountWrap').show(500, () => {
					$('.chart-info article').show(500)
				});
				if(key1 == key2) {
					this.controllerElement.fillTable(histo1.value,histo1.value);
					return;
				}
				this.idb.getHistoricalData(key2).then(histo2 => {
					this.controllerElement.fillTable(histo1.value, histo2.value);
				})

			})
			this.logError(error);
		})
	}


}