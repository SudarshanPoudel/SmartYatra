import React, { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import './MapView.css'

export default function MapView({ places }) {
  useEffect(() => {
    if (places.length < 1) return; // Ensure there is at least one place

    // Create the map object
    const map = L.map('map', {
      center: [places[0].lat, places[0].lon], // Set initial center based on the first place
      zoom: 9,
    });

    // Add OpenStreetMap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for each place with the number inside the marker
    places.forEach((place, index) => {
      const marker = L.marker([place.lat, place.lon], {
        icon: L.divIcon({
          className: 'numbered-marker',
          html: `<div class="marker-number">${index + 1}</div>`, // Display number inside marker
          iconSize: [10, 10], // Adjust size as needed
        }),
      }).addTo(map);

      marker.bindPopup(`<b>${index + 1}. ${place.name}</b>`); // Show place name on popup
    });

    // Cleanup when the component is unmounted
    return () => {
      map.remove();
    };
  }, [places]);

  return (
    <div>
      <div id="map" style={{ height: '100vh', width: '100%' }}></div>
    </div>
  );
}
