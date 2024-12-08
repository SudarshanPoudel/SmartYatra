import React from 'react'
import './Main.css'
import { IoSparkles } from "react-icons/io5";
import { Link } from 'react-router-dom';

import bgImage from "../../Assets/Image/homepagebg.jpeg"



export const Main = () => {
  return (
    <div className='main'>
      <img className='bg-image' src={bgImage} alt="" />

      <div className="mid-sec">
        <div className="quote">"A journey of a thousand miles begins with a single click."</div>
        <button className='generate-plan'>
          <Link 
              style={{ textDecoration: 'none' }}
              to="/form"
            >
            Generate Plan <IoSparkles />
          </Link>
        </button>
      </div>
    </div>
  )
}