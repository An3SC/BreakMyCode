if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/47-ServiceWorkers-PWA/sw.js')
        .then((registrado) => console.log('Se instaló correctamente', registrado))
        .catch((error) => console.log('Falló la instalación', error));
} else {
    console.log('Service Workers no soportados');
}
