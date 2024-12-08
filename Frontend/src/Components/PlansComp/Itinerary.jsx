import React from 'react'

import { data } from './data.js'
import PlaceDetails from './PlaceDetails.jsx'
import ItineraryDay from './ItineraryDay.jsx'
import './Itinerary.css'

export const Itinerary = () => {
  
  return (
    <div className='itinerary-container'>
      <div className="itinerary">
      {data['itinerary'].map((day, index) => (
        <ItineraryDay key={index} data={day} />
      ))}
      </div>
      <div className="details">
        <PlaceDetails />
      </div>
      
    </div>
  );  
}
