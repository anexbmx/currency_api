import {Notification} from './Notification';

export class ServiceWorker {
	constructor() {
		this.worker = navigator.serviceWorker.register('service-worker.js').then((reg)=>{
			console.log('Register serviceWorker success')

			if (reg.waiting) {
				const notify = new Notification('🤗','sw',false)
				notify.show();
				notify.setWorker(reg.waiting);
				return;
			}

			reg.onupdatefound = () => {
				const installingWorker = reg.installing;
				installingWorker.onstatechange = () => {
					if(installingWorker.state == "installed")
						if (navigator.serviceWorker.controller) {
							const notify = new Notification('🤗','sw',false)
							notify.show();
							notify.setWorker(installingWorker);
						}

					}
				}
			return reg;
		}).catch((e)=>{
			console.log('failed register'+ e)
		})

		navigator.serviceWorker.addEventListener('controllerchange',()=>{
			window.location.reload();
		})
	}

	getWorker() {
		return this.worker;
	}
}
