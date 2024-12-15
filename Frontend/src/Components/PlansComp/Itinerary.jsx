import React, { useState } from 'react';
import PlaceDetails from './PlaceDetails.jsx';
import MapView from './MapView.jsx'; // Add a MapView component
import BookingDetails from './BookingDetails.jsx'; // Add a BookingDetails component
import ItineraryDay from './ItineraryDay.jsx';
import './Itinerary.css';
import { useSelector } from 'react-redux';

export const Itinerary = () => {
  const [detailView, setDetailView] = useState({ type: "map", item: null }); // Track view type and item
  const formResponse = useSelector(state => state.formResponseData.responseData);
  console.log(formResponse)
  const handleDetailChange = (type, item) => {
    setDetailView({ type, item }); // Update the detail view and selected item
  };

  function extractPlaces(itinerary) {
    const places = [];
  
    itinerary.forEach(day => {
      day.schedule.forEach(schedule => {
        if (schedule.type === 'visit') {
          // Add place details to places array
          places.push({
            name: schedule.place,
            lat: schedule.latitude,
            lon: schedule.longitude
          });
        }
  
        // If it's the first journey (type 'travel'), add the origin location
        if (schedule.type === 'travel' && schedule.origin_latitude && schedule.origin_longitude) {
          places.push({
            name: schedule.origin || `Start Location`, // Default to 'Start Location' if origin name is empty
            lat: schedule.origin_latitude,
            lon: schedule.origin_longitude
          });
        }
      });
    });
  
    return places;
  }
  

  return (
    <div className='itinerary-container'>
      <div className="itinerary">
        {formResponse['itinerary'].map((day, index) => (
          <ItineraryDay
            key={index}
            data={day}
            onDetailChange={handleDetailChange} // Pass callback
          />
        ))}
      </div>
      <div className="details">
        {detailView.type === "place" && detailView.item != null  && <PlaceDetails item={detailView.item} />}
        {detailView.type === "map" && <MapView places={extractPlaces(formResponse['itinerary'])} />}
        {detailView.type === "booking" && <BookingDetails item={detailView.item} />}
      </div>
    </div>
  );
};
