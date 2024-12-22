import React, { useState }from 'react'

import { Itinerary } from '../../components/PackageComp/Itinerary'
import './Package.css'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MapView from '../../components/PackageComp/MapView'
import EditPlanBtn from '../../components/PackageComp/EditPlanBtn'

export const Package = () => {

  const formResponse = useSelector(state => state.formResponseData.responseData);
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
   <EditPlanBtn />
    </>
  )
}