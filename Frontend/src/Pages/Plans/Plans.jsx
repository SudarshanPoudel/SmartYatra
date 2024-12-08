import React, { useState }from 'react'

import { Itinerary } from '../../Components/PlansComp/Itinerary'
import './Plans.css'

import { data } from '../../Components/PlansComp/data'

export const Plans = () => {


  return (
    <div className='plans-page'>
        <div className="banner">
          <div className="banner-image">
            <img src="https://mountainroutes.com/wp-content/uploads/2022/07/KTM-Durbar-Square.jpg" srcset="" />
          </div>
          <h2 className="banner-text">'{data['trip_title']}'</h2>
        </div>
        <Itinerary />
        
    </div>
    
  )
}
