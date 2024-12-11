import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
  const location = useLocation();
  const [menu, setMenu] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // Update `menu` whenever the pathname changes
  useEffect(() => {
    const urlKeys = location.pathname.split("/");
    setMenu(urlKeys[urlKeys.length - 1] || "home"); // Default to 'home' for root
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0); // Check if user has scrolled down
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup listener
    };
  }, []);

  return (
    <div className={`nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="left-nav">
        <p>
          Dora
        </p>
      </div>
      <div className="right-nav">
        <ul>
          <li className="menu-item">
            <Link
              style={{ textDecoration: 'none' }}
              to="/"
              className={menu === 'home' || menu === '' ? 'active' : 'list'}
            >
              Home
            </Link>
          </li>
          <li className="menu-item">
            <Link
              style={{ textDecoration: 'none' }}
              to="/explore"
              className={menu === 'explore' ? 'active' : 'list'}
            >
              Explore
            </Link>
          </li>
          <li className="menu-item">
            <Link
              style={{ textDecoration: 'none' }}
              to="/plans"
              className={menu === 'plans' || menu === 'form' ? 'active' : 'list'}
            >
              Plans
            </Link>
          </li>

          <li className="menu-item">
            <Link
              style={{ textDecoration: 'none' }}
              to="/"
              className={menu === 'aboutus' ? 'active' : 'list'}
            >
              About us
            </Link>
          </li>
          <li className="menu-item">
            <button className="login-btn">Login/Signup</button>
          </li>
        </ul>
      </div>
    </div>
  );
};