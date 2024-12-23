//kombinasi iteratif
export function kombinasiIteratif(arr: string[], r: number): string[][] {
    const results: string[][] = [];
    const n = arr.length;

    // Stack untuk menyimpan kombinasi yang sedang dibentuk
    const stack: { combo: string[], start: number }[] = [];

    // Mulai dengan kombinasi kosong dan index awal 0
    stack.push({ combo: [], start: 0 });

    while (stack.length > 0) {
        const { combo, start } = stack.pop()!;  // Ambil elemen terakhir dari stack

        // Jika kombinasi panjangnya sudah r, simpan kombinasi tersebut
        if (combo.length === r) {
            results.push(combo);  // Menyimpan kombinasi yang telah terbentuk
            continue;
        }

        // Iterasi untuk memilih elemen dari posisi 'start' hingga akhir array
        for (let i = start; i < n; i++) {
            // Simpan kombinasi sementara dengan menambahkan elemen arr[i]
            stack.push({ combo: [...combo, arr[i]], start: i + 1 });  // Lanjutkan pencarian dengan elemen berikutnya
        }
    }

    return results;
}



// kombinasi rekursif
export function kombinasiRekursif(arr: string[], r: number): string[][] { 
    if (r === 0) return [[]];  // Basis rekursi: Jika r 0, kembalikan array kosong sebagai kombinasi
    if (arr.length === 0) return [];  // Jika tidak ada elemen dalam array, kembalikan array kosong

    const [first, ...rest] = arr;  // Pisahkan elemen pertama (first) dan sisanya (rest)
    
    // Kombinasi yang menyertakan elemen pertama
    const withFirst = kombinasiRekursif(rest, r - 1).map((comb) => [first, ...comb]);
    
    // Kombinasi yang tidak menyertakan elemen pertama
    const withoutFirst = kombinasiRekursif(rest, r);
    
    // Gabungkan kombinasi yang dengan dan tanpa elemen pertama
    return [...withFirst, ...withoutFirst];
}



// Permutasi (Iteratif)
export function permutasiIteratif(arr: string[], r: number): string[][] {
    const results: string[][] = [];
    const n = arr.length;

    // Gunakan stack untuk menyimpan sementara permutasi yang sedang dibentuk
    const stack: string[][] = [];

    // Mulai dengan elemen-elemen kosong
    stack.push([]);

    while (stack.length > 0) {
        const temp = stack.pop()!;  // Ambil permutasi sementara yang terakhir

        if (temp.length === r) {
            results.push(temp);  // Jika panjangnya sudah r, simpan permutasi ini
            continue;
        }

        // Iterasi untuk menambahkan elemen-elemen ke permutasi sementara
        for (let i = 0; i < n; i++) {
            if (!temp.includes(arr[i])) {  // Pastikan elemen belum ada dalam temp
                stack.push([...temp, arr[i]]);  // Tambahkan elemen ke stack
            }
        }
    }

    return results;
}



// Permutasi (Rekursif)
export function permutasiRekursif(arr: string[], r: number): string[][] {
    if (r === 0) return [[]];  // Basis rekursi: Jika r 0, kembalikan array kosong sebagai permutasi

    const results: string[][] = [];  // Menyimpan hasil permutasi

    // Iterasi untuk memilih setiap elemen dalam array
    arr.forEach((item, index) => {
        const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];  // Pisahkan elemen yang dipilih dari yang tersisa
        const perms = permutasiRekursif(remaining, r - 1);  // Rekursi untuk permutasi sisa elemen
        perms.forEach((perm) => results.push([item, ...perm]));  // Gabungkan elemen yang dipilih dengan permutasi yang dihasilkan
    });
    
    return results;  // Kembalikan hasil permutasi yang ditemukan
}

