self.addEventListener('message', (event) => {
    if (event.data === 'start') {
      simulateLargeFileDownload();
    }
  });
  
  function simulateLargeFileDownload() {
    // Simula una descarga de un archivo grande.
  
    const totalSize = 100 * 1024 * 1024; // 100MB
    const chunkSize = 1024 * 1024; // 1MB por chunk
  
    let downloadedSize = 0;
  
    while (downloadedSize < totalSize) {
      downloadedSize += chunkSize;
  
      // Envía el progreso al hilo principal.
      self.postMessage({ type: 'progress', value: downloadedSize, total: totalSize });
    }
  
    // Informa al hilo principal que la descarga está completa.
    self.postMessage({ type: 'complete' });
  }