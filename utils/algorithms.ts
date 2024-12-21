// Kombinasi (Iteratif)
export function kombinasiIteratif(arr: string[], r: number): string[][] {
    const results: string[][] = [];
    const n = arr.length;

    function helper(start: number, combo: string[]) {
        if (combo.length === r) {
            results.push([...combo]);
            return;
        }
        for (let i = start; i < n; i++) {
            combo.push(arr[i]);
            helper(i + 1, combo);
            combo.pop();
        }
    }

    helper(0, []);
    return results;
}

// Kombinasi (Rekursif)
export function kombinasiRekursif(arr: string[], r: number): string[][] {
    if (r === 0) return [[]];
    if (arr.length === 0) return [];
    
    const [first, ...rest] = arr;
    const withFirst = kombinasiRekursif(rest, r - 1).map((comb) => [first, ...comb]);
    const withoutFirst = kombinasiRekursif(rest, r);
    
    return [...withFirst, ...withoutFirst];
}

// Permutasi (Iteratif)
export function permutasiIteratif(arr: string[], r: number): string[][] {
    const results: string[][] = [];
    
    function helper(temp: string[], remaining: string[]) {
        if (temp.length === r) {
            results.push([...temp]);
            return;
        }
        for (let i = 0; i < remaining.length; i++) {
            helper([...temp, remaining[i]], [...remaining.slice(0, i), ...remaining.slice(i + 1)]);
        }
    }

    helper([], arr);
    return results;
}

// Permutasi (Rekursif)
export function permutasiRekursif(arr: string[], r: number): string[][] {
    if (r === 0) return [[]];

    const results: string[][] = [];
    arr.forEach((item, index) => {
        const remaining = [...arr.slice(0, index), ...arr.slice(index + 1)];
        const perms = permutasiRekursif(remaining, r - 1);
        perms.forEach((perm) => results.push([item, ...perm]));
    });
    return results;
}
