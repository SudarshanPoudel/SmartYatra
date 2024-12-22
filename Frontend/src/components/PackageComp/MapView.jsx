import React, { useEffect } from 'react';
import L from 'leaflet'; // Import Leaflet
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS
import './MapView.css'

export default function MapView({ places, item, source_item, dest_item }) {
  
  function givePopup(index, name, image){
    return `
      <b>${index}. ${name} </b>
      <div class='map-popup-image'><img src='http://localhost:8000/images/${image}'></div>
    `
  }

  useEffect(() => {
    if (places.length < 1) return; // Ensure there is at least one place
    let center_lat=places[0].lat
    let center_lon=places[0].lon
    let zoom = 8
        
    if (item != null && item.type=='visit'){
      center_lat = item.latlong.split(', ')[0]
      center_lon = item.latlong.split(', ')[1]
      zoom=13
    }
    else if (item != null && item.type=='travel'){
      source_lat = item.latlong.split(', ')[0]
      source_lon = item.latlong.split(', ')[1]
      zoom=13 
    }

    // Create the map object
    const map = L.map('map', {
      center: [center_lat, center_lon], // Set initial center based on the first place
      zoom: zoom,
    });

    // Add OpenStreetMap tiles to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add markers for each place with the number inside the marker
    let popupToOpen = null
    places.forEach((place, index) => {
      
      const marker = L.marker([place.lat, place.lon], {
        icon: L.divIcon({
          className: 'numbered-marker',
          html: `<div class="marker-number">${index + 1}</div>`, // Display number inside marker
          iconSize: [10, 10], // Adjust size as needed
        }),
      }).addTo(map);
      marker.bindPopup(givePopup(index+1, place.name, place.image)); // Show place name on popup
      if(item != null && item.type=='visit' && item.place == place.name){
        marker.openPopup()
      }      
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
