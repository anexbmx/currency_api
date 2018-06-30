const staticCacheName = 'currency-static-v6';
// anex nkkmlmlmlmmml
const filesToCache = [
	'/rr/',
	'/rr/index.html',
	'img/curr.ico',
	'dist/main.js',
	'css/app.css',
	'ES6/Chart.bundle.min.js',
	'dist/jquery-3.3.1.min.js',
	'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.min.js',
	'https://cdn.jsdelivr.net/npm/es6-promise@4/dist/es6-promise.auto.min.js'
];

 self.addEventListener('install', (event) => {
 	console.log('install event')
	event.waitUntil(
		caches.open(staticCacheName)
		.then(cache => {
			console.log('installing cache : ' + staticCacheName)
			return cache.addAll(filesToCache)
		})
	);
});

self.addEventListener('activate', (event) => {
	const cacheWhiteList = [staticCacheName];

	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cacheName) => {
					if (!cacheWhiteList.includes(cacheName))
						return caches.delete(cacheName);
				})
			);
		})
	);
})
self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	)
})

self.addEventListener('message', function(event) {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});
