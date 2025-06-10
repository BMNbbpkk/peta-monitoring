// File: /js/data.js
export async function getBarangData() {
  // Ganti URL dengan link opensheet.elk.sh Anda
  const sheetURL = 'https://opensheet.elk.sh/1MaHYUGQOCpFQi_xzPRttI6yJWrsXMVFhcACpfPTOg3A/DataBarang';
  
  try {
    const response = await fetch(sheetURL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
    return []; // Return array kosong jika error
  }
}
