import React, { useState }from 'react'

import { Itinerary } from '../../Components/PlansComp/Itinerary'
import './Plans.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MapView from '../../Components/PlansComp/MapView'
export const Plans = () => {

  const formResponse = useSelector(state => state.formResponseData.responseData);
  console.log(formResponse)
  const navigate = useNavigate()

  return (
    <>
      {
         formResponse.length < 1 ?
         <div className='noPlan'>
           <h1>No plan yet</h1>
           <MapView />
           <p onClick={()=>navigate('/form')}>Fill the form</p>
         </div>
         :
         <div className='plans-page'>
            <div className="banner">
               <div className="banner-image">
                   <img src="https://mountainroutes.com/wp-content/uploads/2022/07/KTM-Durbar-Square.jpg" />
               </div>
               <h2 className="banner-text">'{formResponse.trip_title}'</h2>
            </div>
            <Itinerary />
         </div>
   }
    </>
  )
}
