export async function getBarangData() {
  const sheetURL = 'https://opensheet.elk.sh/1MaHYUGQOCpFQi_xzPRttI6yJWrsXMVFhcACpfPTOg3A/DataBarang';
  try {
    const response = await fetch(sheetURL);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Data bukan array!");
    return data;
  } catch (error) {
    console.error("Gagal memuat data:", error);
    return []; // Return array kosong jika error
  }
}
