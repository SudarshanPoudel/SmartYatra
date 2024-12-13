import React from 'react'
import PlaceDetails from './PlaceDetails.jsx'
import ItineraryDay from './ItineraryDay.jsx'
import './Itinerary.css'
import { useSelector } from 'react-redux'

export const Itinerary = () => {

  const formResponse = useSelector(state => state.formResponseData.responseData);
  console.log(formResponse)
  
  return (
    <div className='itinerary-container'>
      <div className="itinerary">
      {formResponse['itinerary'].map((day, index) => (
        <ItineraryDay key={index} data={day} />
      ))}
      </div>
      <div className="details">
        <PlaceDetails />
      </div>
      
    </div>
  );  
}
