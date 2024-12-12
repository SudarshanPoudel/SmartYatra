import React from 'react'
import './Footer.css'
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";


export const Footer = () => {
  return (
    <div className='footer'>
      <div className="social-icon">
          <FaFacebookF />
          <FaTwitter />
          <FaInstagram />
          <FaYoutube />
      </div>
        <ul className="lists">
          <li>Contact Us</li>
          <li>Terms of Service</li>
          <li>Refund Policy</li>
        </ul>
      <div className="copyright">
        <p>Copyright © 2024 SmartYatra, All rights reserved.</p>
      </div>
    </div>
  )
}