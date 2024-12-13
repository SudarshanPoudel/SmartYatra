import React from 'react'
import './Main.css'
import { IoSparklesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

import bgImage from "../../Assets/Image/homepagebg.png"
import banner1 from "../../Assets/Image/homepageim1.jpeg"
import banner2 from "../../Assets/Image/homepageim2.jpg"
import banner3 from "../../Assets/Image/homepageim3.jpeg"



export const Main = () => {
  return (
    <div className='main'>
      <img className='bg-image' src={bgImage} alt="" />

      <div className="left-sec">
        <div className="quote">Where Every <br/>Adventure Begins.</div>
        <button className='generate-plan'>
          <Link 
              style={{ textDecoration: 'none' }}
              to="/form"
            >
            <IoSparklesOutline className='spark-icon'/>Plan my trip
          </Link>
        </button>
      </div>
        <div className="right-sec">
          <div className="caro-image">
            <img src={banner1} alt=""/>
          </div>
          <div className="caro-image">
            <img src={banner2} alt="" />
          </div>
          <div className="caro-image">
            <img src={banner3} alt="" />
          </div>
        </div>
      </div>
  )
}