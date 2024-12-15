export function findClosestPlace(lat, lon, places) {
    const R = 6371; // Earth's radius in kilometers
  
    // Helper function to calculate distance using the Haversine formula
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      const toRadians = (degrees) => (degrees * Math.PI) / 180;
      const dLat = toRadians(lat2 - lat1);
      const dLon = toRadians(lon2 - lon1);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) *
          Math.cos(toRadians(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c; // Distance in kilometers
    };
  
    // Helper function to determine direction
    const calculateDirection = (lat1, lon1, lat2, lon2) => {
      const latDiff = lat2 - lat1;
      const lonDiff = lon2 - lon1;
  
      let direction = "";
      if (latDiff > 0) direction += "north";
      else if (latDiff < 0) direction += "south";
  
      if (lonDiff > 0) direction += direction ? " east" : "east";
      else if (lonDiff < 0) direction += direction ? " west" : "west";
  
      return direction || "nearby";
    };
  
    let closestPlace = null;
    let minDistance = Infinity;
  
    // Iterate over the places to find the closest one
    for (const place of places) {
      const distance = calculateDistance(lat, lon, place.latitude, place.longitude);
      if (distance < minDistance) {
        minDistance = distance;
        closestPlace = place;
      }
    }
    
    if(minDistance > 0 && minDistance < 5){
        return closestPlace.name
    }
    if (closestPlace) {
      const direction = calculateDirection(lat, lon, closestPlace.latitude, closestPlace.longitude);
      return `${minDistance.toFixed(1)} km ${direction} of ${closestPlace.name}`;
    }
  
    return "No places found.";
  }
  
  // Example usage
  const places = [
    { name: "Place A", latitude: 27.7172, longitude: 85.324 },
    { name: "Place B", latitude: 27.712, longitude: 85.322 },
    { name: "Place C", latitude: 27.710, longitude: 85.320 },
  ];
  
  const result = findClosestPlace(27.715, 85.321, places);
  console.log(result); // Output: "0.3 km south west of Place B"
  