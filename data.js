// File: /js/data.js
export async function getBarangData() {
  // Ganti URL dengan link opensheet.elk.sh Anda
  const sheetURL = 'https://opensheet.elk.sh/2PACX-1vRSym1w-sN1OxdNX-o3vpOY-x35fsrjy7zzuqaF5P83n_D9OW2YSZPTeLFubY_3Ky73MeCKUamdAQCC/DataBarang';
  
  try {
    const response = await fetch(sheetURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
    return []; // Return array kosong jika error
  }
}

