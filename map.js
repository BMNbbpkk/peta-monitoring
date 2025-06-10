// File: js/map.js
import { getBarangData, formatMapData } from './data.js';

async function initMap() {
  // 1. Inisialisasi peta
  const map = L.map('map').setView([-6.813333, 107.615], 17);
  
  // 2. Tambahkan base map
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap'
  }).addTo(map);

  // 3. Ambil dan tampilkan data
  try {
    const data = await getBarangData();
    const markers = formatMapData(data);
    
    markers.forEach(({ position, popupContent, color }) => {
      L.circleMarker(position, {
        radius: 8,
        color: color,
        fillColor: color,
        fillOpacity: 0.8
      })
      .addTo(map)
      .bindPopup(popupContent);
    });
    
  } catch (error) {
    console.error("Error:", error);
    alert("Gagal memuat data. Cek console untuk detail.");
  }
}

// Jalankan fungsi init
initMap();
