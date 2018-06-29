import {HTTPClient} from './HTTPClient';
import {URLCurrency} from './URLCurrency';

export class Convert {
	constructor(from = null, to = null){
		this.currency_from = from;
		this.currency_to = to;
		this.httpClient = new HTTPClient(this);
	}

	convertCurrency() {
		this.httpClient.setResultToInputText(URLCurrency.convert(this));
	}

	allCurrencies() {
		this.httpClient.fillSelectInput(URLCurrency.allCurrencies());
	}

	historicalData() {
		this.httpClient.fillTable(URLCurrency.historicalData(this));
	}
}