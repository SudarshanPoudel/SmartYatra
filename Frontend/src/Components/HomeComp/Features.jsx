import React from 'react'
import { FeatureItem } from './FeatureItem'
import './Features.css'

import featureIm1 from './../../Assets/Svg/feature1.svg'
import featureIm2 from './../../Assets/Svg/feature2.svg'
import featureIm3 from './../../Assets/Svg/feature3.svg'


export const Features = () => {
  return (
    <div className='feature-comp'>
        <h1 className='title'><span>Explore Nepal</span>like never before</h1>
        <div className="features">
            <FeatureItem
              title="Customizable Travel Packages"
              listItems="Travelers can tailor their trips according to preferences like budget, duration, activities, and destinations, making the platform inclusive for all types of tourists.
                        Real-time suggestions for accommodations, attractions, and local experiences enhance convenience."
              imagePath={featureIm1}
              imageSide='right'
            />

            <FeatureItem
              title="Comprehensive Budget Planning"
              listItems="Users can input their budget, and the platform will recommend optimized travel itineraries, including accommodation, transportation, and activities.
                        Transparent pricing ensures no hidden costs, helping users confidently plan their trips."
              imagePath={featureIm2}
              imageSide='left'
            />

            <FeatureItem
              title="Integrated Transportation and Hotel Booking"
              listItems="Travelers can tailor their trips according to preferences like budget, duration, activities, and destinations, making the platform inclusive for all types of tourists.
                        Real-time suggestions for accommodations, attractions, and local experiences enhance convenience."
              imagePath={featureIm3}
              imageSide='right'
            />
        </div>
    </div>
    
  )
}
