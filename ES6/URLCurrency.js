
export class URLCurrency {
	static historicalData(currencies) {
		const currentDate = new Date();
		const endDate = currentDate.toISOString().split('T')[0];
		currentDate.setDate(currentDate.getDate()-8);
		const startDate = currentDate.toISOString().split('T')[0];

		$('.date-start').text(startDate)
		$('.date-end').text(endDate)
		// return 'x';
		return `https://free.currencyconverterapi.com/api/v5/convert?q=${currencies.currency_from.id}_${currencies.currency_to.id},${currencies.currency_to.id}_${currencies.currency_from.id}&compact=ultra&date=${startDate}&endDate=${endDate}`;

	}
	static convert(currencies) {
		// return 'x';
	 	return `https://free.currencyconverterapi.com/api/v5/convert?q=${currencies.currency_from.id}_${currencies.currency_to.id}&compact=ultra`;
	}
	static allCurrencies(currency) {
		// return 'x';
	 	return 'https://free.currencyconverterapi.com/api/v5/currencies';
	}
}