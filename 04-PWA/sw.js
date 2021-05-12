const nombreCache = 'apv-v4';

const archivos = [
    './manifest.json',
    './',
    './index.html',
    './error.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js',
];

// Cuando se instala el service worker
self.addEventListener('install', (e) => {
    console.log('Instalado el service worker');

    //console.log(e);

    e.waitUntil(
        caches.open(nombreCache).then((cache) => {
            console.log('Cacheando');
            cache.addAll(archivos);
        })
    );
});

// Activar el service worker
self.addEventListener('activate', (e) => {
    console.log('Service worker activado');

    //console.log(e);

    e.waitUntil(
        caches.keys().then((keys) => {
            // console.log(keys);

            return Promise.all(
                keys.filter((key) => key !== nombreCache).map((key) => caches.delete(key))
            );
        })
    );
});

// Evento fetch para descargar archivos estáticos
self.addEventListener('fetch', (e) => {
    // console.log('Fetch...', e);

    e.respondWith(
        caches
            .match(e.request)
            .then((respuestaCache) => {
                return respuestaCache || fetch(e.request);
            })
            .catch(() => caches.match('/error.html'))
    );
});
