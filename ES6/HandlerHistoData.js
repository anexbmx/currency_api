export class HandlerHistoData {
	static getDetails(list,suff = 6) {
		return {
			max: Math.max(...list).toFixed(suff),
			min: Math.min(...list).toFixed(suff),
			avg: (list.reduce((acc, val) => acc + val) / list.length).toFixed(suff)
		}
	}
}