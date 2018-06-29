// if ('serviceWorker' in navigator) {
//   	navigator.serviceWorker.register('/service-worker.js')
//   	.then(function(registration) {
//     	console.log('Registration successful, scope is:', registration.scope);
//   	})
//   	.catch(function(error) {
//     	console.log('Service worker registration failed, error:', error);
//   	});
// }
// Log results
function logResult(response) {
	console.log(response);
}

function logError(error) {
	console.log('Looks like there was a problem : \n', error);
}

function getResultAsJson(response) {
	return response.json();
}

function getResultAsText(response) {
	return response.text();
}

function validateResponse(response) {
	if(!response.ok)
		throw Error(response.statusText);
	return response;
}

function fillCombobox(response) {
	response = response.results;
	let combobox = $('.combobox');
	for (let key in response) {
		combobox.append(`<option value="${response[key].id}">${response[key].id}</option>`)
	}
}

function getAllCurrencies() {
	fetch('https://free.currencyconverterapi.com/api/v5/currencies')
	.then(validateResponse)
	.then(getResultAsJson)
	.then(fillCombobox)
	.catch(logError)
}


function convert(curr) {
	fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${curr.from}_${curr.to}&compact=ultra`)
	.then(validateResponse)
	.then(getResultAsJson)
	.then(setOutput)
	.catch(logError)
}

function setOutput(response) {
	key = Object.keys(response)[0];
	curr_val = $('#curr_fr_val').val() * response[key];
	$('#result').text(curr_val.toLocaleString())
	console.log(response[key])
	console.log($('#curr_fr_val').val())


}

function selectCurrencies() {
	from = $('#curr_from').val();
	to = $('#curr_to').val();
	return {from, to};
}
function getDateFormat(date) {
	return date.toISOString().split('T')[0];
}
function getHistoricalData(curr) {
	const currentDate = new Date();
	const endDate = getDateFormat(currentDate);
	currentDate.setDate(currentDate.getDate()-8);
	const startDate = getDateFormat(currentDate);
	fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${curr.from}_${curr.to},${curr.to}_${curr.from}&compact=ultra&date=${startDate}&endDate=${endDate}`)
	.then(validateResponse)
	.then(getResultAsJson)
	.then(getlatest8HistoricalData)
	.catch(logError)
}


function getlatest8HistoricalData(response) {
	console.log(response)
	const keys = Object.keys(response);
	data = generatorIterator(response[keys[0]])
	console.log(data)
	var ctx = document.getElementById("myChart").getContext('2d');
	var myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: data.labels,
	        datasets: [{
	            label: '# of Votes',
	            data: data.values,
	            type: 'line',
	            pointRadius: 2,
	            lineTension: 0,
	            backgroundColor:
	                'rgba(8, 8, 8, 0.2)',
	            borderColor: 'rgb(75, 53, 91)',
	            borderWidth: 2
	        }]
	    },
	    options: {
	    	responsive: true,
	    	scales: {
	    		yAxes: [{
	    			scaleLabel: {
	    				display: true,
	    				labelString: 'Closing price ($)'
	    			}
	    		}]
	    	}
	    }
	});
}

function generatorIterator(object){
	let values = [];
	let labels = []
	for (let key in object){
		values.push(object[key])
		labels.push(key)
	}
	return {labels, values}
}

 $(function() {
	getAllCurrencies();
	$('#send').on('click', () => {
		convert(selectCurrencies());
		getHistoricalData(selectCurrencies());

	})




});

