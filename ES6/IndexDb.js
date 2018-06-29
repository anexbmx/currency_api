import idb from 'idb';

const TABLES = [
	'currency-store',
	'converter-store',
	'historicalData'
];
function openDataBase() {
	// If the browser doesn't support service worker,
	// we don't care about having a database
	if (!navigator.serviceWorker) {
		console.log("This browser doesn't support ServiceWorker,So we don't need to having a database")
	  return Promise.resolve();
	}

	return idb.open('currConverter', 3, (upgradeDb) => {
		switch(upgradeDb.oldVersion) {
			case 0:
				upgradeDb.createObjectStore(TABLES[0], {autoIncrement:true})
			case 1:
				upgradeDb.createObjectStore(TABLES[1], {keyPath: 'id'})
			case 2:
				upgradeDb.createObjectStore(TABLES[2], {keyPath: 'id'})
		}
	}).catch(e => {
		console.log('Error IndexDb : ',e);
	})
}

export class IndexDb {

	constructor() {
		this.idbPromise = openDataBase();
	}

	addCurrency(currencies) {
		this.idbPromise.then( db => {
			const tx = db.transaction(TABLES[0], 'readwrite');
			tx.objectStore(TABLES[0]).put(currencies,1);
			return tx.complete;
		});
	}

	getCurrencies() {
		return this.idbPromise.then( db => {
			return db.transaction(TABLES[0])
			.objectStore(TABLES[0]).get(1);
		});
	}

	addConverter(converter){
		this.idbPromise.then( db => {
			const tx = db.transaction(TABLES[1], 'readwrite');
			tx.objectStore(TABLES[1]).put(converter);
			return tx.complete;
		});
	}

	getConverter(id) {
		return this.idbPromise.then( db => {
			return db.transaction(TABLES[1])
			.objectStore(TABLES[1]).get(id);
		})
	}

	getAllConverter(id) {
		return this.idbPromise.then( db => {
			return db.transaction(TABLES[1])
			.objectStore(TABLES[1]).getAll();
		})
	}

	addHisto(histo) {
		 return this.idbPromise.then( db => {
			const tx = db.transaction(TABLES[2], 'readwrite');
			tx.objectStore(TABLES[2]).put(histo);
			return tx.complete;
		})
	}
	getHistoricalData(id) {
		return this.idbPromise.then( db => {
			return db.transaction(TABLES[2])
			.objectStore(TABLES[2]).get(id);
		})
	}

}