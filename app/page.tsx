"use client";

import { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  kombinasiIteratif,
  kombinasiRekursif,
  permutasiIteratif,
  permutasiRekursif,
} from "../utils/algorithms";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen Chart.js
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [r, setR] = useState<number>(0);
  const [n, setN] = useState<number>(0); // Input untuk jumlah anggota (n)
  const [results, setResults] = useState<
    Record<string, { data: string[][]; time: number }>
  >({});
  const [isNameInputMode, setIsNameInputMode] = useState(true); // Mode input (nama atau n dan r)

  const handleAddName = (name: string) => {
    if (name.trim() !== "") {
      setNames([...names, name]);
    }
  };

  const handleCalculate = () => {
    let inputNames = names;

    // Mode 2: Jika menggunakan input n, buat daftar nama dummy
    if (!isNameInputMode) {
      inputNames = Array.from({ length: n }, (_, i) => (i + 1).toString());
    }

    if (r > inputNames.length) {
      alert("Jumlah yang dipilih (r) tidak boleh lebih besar dari jumlah anggota (n)");
      return;
    }

    const newResults: Record<string, { data: string[][]; time: number }> = {};

    // Kombinasi Iteratif
    const startKombinasiIteratif = performance.now();
    const kombinasiIteratifResult = kombinasiIteratif(inputNames, r);
    const endKombinasiIteratif = performance.now();
    newResults["Kombinasi Iteratif"] = {
      data: kombinasiIteratifResult,
      time: (endKombinasiIteratif - startKombinasiIteratif) / 1000,
    };

    // Kombinasi Rekursif
    const startKombinasiRekursif = performance.now();
    const kombinasiRekursifResult = kombinasiRekursif(inputNames, r);
    const endKombinasiRekursif = performance.now();
    newResults["Kombinasi Rekursif"] = {
      data: kombinasiRekursifResult,
      time: (endKombinasiRekursif - startKombinasiRekursif) / 1000,
    };

    // Permutasi Iteratif
    const startPermutasiIteratif = performance.now();
    const permutasiIteratifResult = permutasiIteratif(inputNames, r);
    const endPermutasiIteratif = performance.now();
    newResults["Permutasi Iteratif"] = {
      data: permutasiIteratifResult,
      time: (endPermutasiIteratif - startPermutasiIteratif) / 1000,
    };

    // Permutasi Rekursif
    const startPermutasiRekursif = performance.now();
    const permutasiRekursifResult = permutasiRekursif(inputNames, r);
    const endPermutasiRekursif = performance.now();
    newResults["Permutasi Rekursif"] = {
      data: permutasiRekursifResult,
      time: (endPermutasiRekursif - startPermutasiRekursif) / 1000,
    };

    setResults(newResults);
  };

  // Data untuk Chart
  const chartData = {
    labels: Object.keys(results),
    datasets: [
      {
        label: `Waktu Eksekusi (${isNameInputMode ? names.length : n} data, r=${r})`,
        data: Object.values(results).map((result) => result.time),
        backgroundColor: ["#4ADE80", "#60A5FA", "#FCD34D", "#FB7185"],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true },
      tooltip: { enabled: true },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Waktu (detik)" },
      },
    },
  };

  return (
    <div className="w-screen h-screen overflow-auto p-8 bg-gradient-to-r from-teal-100 via-gray-100 to-gray-200 font-sans">
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-xl p-10">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
          Pemilihan Anggota Kelompok
        </h1>

        <div className="text-center mb-6">
          <button
            onClick={() => setIsNameInputMode(!isNameInputMode)}
            className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all">
            {isNameInputMode ? "Gunakan Mode N dan R" : "Gunakan Mode Nama"}
          </button>
        </div>

        {isNameInputMode ? (
          <>
            <div className="mb-10">
              <label className="block text-lg font-semibold text-gray-800 mb-3">
                Nama Anggota:
              </label>
              <div className="flex gap-4 mb-6">
                <input
                  type="text"
                  id="name-input"
                  className="border p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
                  placeholder="Masukkan nama anggota"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddName((e.target as HTMLInputElement).value);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }}
                />
                <button
                  className="bg-teal-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition-all"
                  onClick={() => {
                    const input = document.getElementById(
                      "name-input"
                    ) as HTMLInputElement;
                    handleAddName(input.value);
                    input.value = "";
                  }}>
                  Tambah
                </button>
              </div>
              <div className="h-40 overflow-auto border p-3 rounded-lg">
                <ul className="space-y-2">
                  {names.map((name, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center text-lg text-gray-800">
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Jumlah Anggota: {names.length}
              </p>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition-all"
                onClick={() => setNames([])}>
                Hapus Semua
              </button>
            </div>
          </>
        ) : (
          <div className="mb-10">
            <label className="block text-lg font-semibold text-gray-800 mb-3">
              n (Jumlah Anggota):
            </label>
            <input
              type="number"
              value={n}
              onChange={(e) => setN(Number(e.target.value))}
              className="border p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
            />
          </div>
        )}

        <div className="mb-10">
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            r (Jumlah terpilih):
          </label>
          <input
            type="number"
            value={r}
            onChange={(e) => setR(Number(e.target.value))}
            className="border p-4 rounded-lg w-full shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300"
          />
        </div>

        <div className="text-center mb-10">
          <button
            onClick={handleCalculate}
            className="bg-teal-600 text-white px-10 py-4 rounded-lg shadow-lg hover:bg-teal-700 transition-all">
            Hitung
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(results).map(([key, result], index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md h-96 overflow-auto">
              <h2 className="text-xl font-semibold text-teal-600">{key}</h2>
              <p className="text-gray-600 text-sm mb-2">
                Waktu Eksekusi: {result.time ? result.time.toFixed(4) : "N/A"}{" "}
                detik
              </p>
              <p className="text-gray-600 text-sm">
                Jumlah Tim Terbentuk: {result.data?.length || 0}
              </p>
              {isNameInputMode && (
                <ul className="space-y-2">
                  {result.data?.map((group, idx) => (
                    <li key={idx} className="text-lg text-gray-700">
                      {group.join(", ")}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold text-teal-600 mb-4">
              Grafik Waktu Eksekusi
            </h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
