import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

const LoadingScreen = ({ textArray, timePerText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < textArray.length - 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, timePerText * 1000);

      return () => clearInterval(interval); // Cleanup the interval
    }
  }, [currentIndex, textArray.length]);

  return (
    <div className="loading-screen">
      <div className="loading-circle"></div>
      <p className="loading-text">{textArray[currentIndex]}</p>
    </div>
  );
};

export default LoadingScreen;
