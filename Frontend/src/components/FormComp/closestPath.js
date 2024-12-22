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
    console.log(lat1, lon1, lat2, lon2)
    let direction = '';
    if (latDiff > 0) direction += 'south';
    else if (latDiff < 0) direction += 'north';

    if (lonDiff > 0) direction += direction ? ' west' : 'west';
    else if (lonDiff < 0) direction += direction ? ' east' : 'east';

    return direction || 'nearby';
  };

  let closestPlace = null;
  let minDistance = Infinity;

  // Iterate over the places to find the closest one
  for (const place of places) {
    const distance = calculateDistance(
      lat,
      lon,
      place.latlong.split(',')[0],
      place.latlong.split(',')[1]
    );
    if (distance < minDistance) {
      minDistance = distance;
      closestPlace = place;
    }
  }

  if (minDistance > 0 && minDistance < 5) {
    return closestPlace.name;
  }
  if (closestPlace) {
    const direction = calculateDirection(
      lat,
      lon,
      parseFloat(closestPlace.latlong.split(',')[0]),
      parseFloat(closestPlace.latlong.split(',')[1])
    );
    return[`${minDistance.toFixed(1)} km ${direction} of ${closestPlace.name}`, closestPlace.name];
  }

  return 'No places found.';
}
