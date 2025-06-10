// File: js/data.js
/**
 * Mengambil data dari Google Sheets via opensheet.elk.sh
 * @returns {Promise<Array>} Array data barang
 */
export async function getBarangData() {
  // Ganti dengan ID spreadsheet dan nama sheet ANDA
  const SPREADSHEET_ID = '1MaHYUGQOCpFQi_xzPRttI6yJWrsXMVFhcACpfPTOg3A';
  const SHEET_NAME = 'DataBarang';
  const sheetURL = `https://opensheet.elk.sh/${1MaHYUGQOCpFQi_xzPRttI6yJWrsXMVFhcACpfPTOg3A}/${DataBarang}`;

  try {
    const response = await fetch(sheetURL);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Validasi data
    if (!Array.isArray(data)) {
      throw new Error("Data tidak valid: bukan array");
    }
    
    // Filter data yang memiliki koordinat valid
    const validData = data.filter(item => {
      return item.Koordinat && 
             typeof item.Koordinat === 'string' && 
             item.Koordinat.includes(',');
    });
    
    return validData;
    
  } catch (error) {
    console.error("Error details:", {
      error: error.message,
      url: sheetURL,
      timestamp: new Date().toISOString()
    });
    
    // Return array kosong jika error
    return [];
  }
}

/**
 * Format data untuk marker peta
 * @param {Array} data 
 * @returns {Array} Array marker yang siap ditampilkan
 */
export function formatMapData(data) {
  return data.map(item => {
    const [lat, lng] = item.Koordinat.split(',').map(coord => parseFloat(coord.trim()));
    
    return {
      position: [lat, lng],
      popupContent: `
        <b>${item['Nama Barang'] || 'Tanpa Nama'}</b><br>
        Kode: ${item['Kode Barang'] || '-'}<br>
        Ruangan: ${item.Ruangan || '-'}<br>
        Kondisi: ${item.Kondisi || '-'}
      `,
      color: getColorByCondition(item.Kondisi)
    };
  });
}

// Helper: tentukan warna marker berdasarkan kondisi
function getColorByCondition(kondisi) {
  if (!kondisi) return 'gray';
  
  kondisi = kondisi.toLowerCase();
  if (kondisi.includes('rusak berat')) return 'red';
  if (kondisi.includes('rusak ringan')) return 'orange';
  return 'green';
}
