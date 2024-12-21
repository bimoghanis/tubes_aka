// src/workers/algorithmWorker.js

import {
    kombinasiIteratif,
    kombinasiRekursif,
    permutasiIteratif,
    permutasiRekursif,
  } from "../utils/algorithms";
  
  // Fungsi untuk menangani pesan dari UI
  self.onmessage = (event) => {
    const { inputNames, r, mode } = event.data;
  
    let result = { data: [], time: 0 };
    const start = performance.now();
  
    try {
      switch (mode) {
        case "Kombinasi Iteratif":
          result.data = kombinasiIteratif(inputNames, r);
          break;
        case "Kombinasi Rekursif":
          result.data = kombinasiRekursif(inputNames, r);
          break;
        case "Permutasi Iteratif":
          result.data = permutasiIteratif(inputNames, r);
          break;
        case "Permutasi Rekursif":
          result.data = permutasiRekursif(inputNames, r);
          break;
        default:
          throw new Error("Mode tidak dikenali");
      }
    } catch (error) {
      result.error = error.message;
    }
  
    const end = performance.now();
    result.time = (end - start) / 1000;
  
    // Kirimkan hasil kembali ke UI
    self.postMessage(result);
  };
  