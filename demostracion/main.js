const startDownloadButton = document.getElementById('start-download');
const progressElement = document.getElementById('progress');

startDownloadButton.addEventListener('click', () => {
  startDownloadButton.disabled = true;

  // Crea un web worker para descargar el archivo.
  const worker = new Worker('download-worker.js');

  worker.onmessage = (event) => {
    const message = event.data;

    if (message.type === 'progress' && message.value && message.total) {
      const percent = (message.value / message.total) * 100;
      progressElement.textContent = `Progreso: ${percent.toFixed(2)}%`;
    } else if (message.type === 'complete') {
      progressElement.textContent = 'Descarga completada.';
      startDownloadButton.disabled = false;
    }
  };

  worker.postMessage('start'); // Inicia la descarga.
});