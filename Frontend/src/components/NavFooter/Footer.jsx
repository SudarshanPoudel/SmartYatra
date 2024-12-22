import React from 'react'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


export const Footer = () => {
  return (
    <footer className='footer' >
        <div className='foot-cont'>
            <div className='foot-info'>
              <h1>SmartYatra</h1>
              <div className='foot-list'>
                 <a href="#">Terms and condition</a>
                 <a href="#">Privacy Policy</a>
                 <a href="#">Contact Us</a>
              </div>
              <div className='social-icons'>
                  <FaFacebookF/>
                  <FaTwitter />
                  <FaInstagram />
                  <FaYoutube />
              </div>
            </div>
            <p>	&copy; 2024 SmartYatra. All rights reserved</p>
        </div>
    </footer>
  )
}
