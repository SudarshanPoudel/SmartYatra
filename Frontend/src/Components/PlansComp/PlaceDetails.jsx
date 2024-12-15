import React from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import "./PlaceDetails.css";

const PlaceDetails = (data) => {
  const place_data = data.item
  console.log(place_data)

  // Generate stars based on rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="star-icon full-star"/>);
      } else if (rating >= i - 0.5) {
        stars.push(<FaRegStarHalfStroke key={i} className="star-icon half-star"/>);
      } else {
        stars.push(<FaRegStar key={i} className="star-icon empty-star"/>);
      }
    }
    return stars;
  };

  return (
    <>
      <div className="place-image-container">
        <img src={place_data.image} alt={place_data.place} className="place-image" />
        <div className="place-type">
          {(place_data.place_type).map((t, index) => (
            <span key={index} className="type-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="place-info">
        <h2 className="place-title">{place_data.place}</h2>

        <div className="place-activities">{place_data.activities.join(" | ")} | 
          <div className="stars-container">{renderStars(place_data.rating/2)}</div>
          {place_data.rating/2} / 5
        </div>
        <div className="overview">
        <h3>Overview</h3>
        <p className="your-activity">
          {place_data.activity}
        </p>

        <h3>About location</h3>
        <p className="place-description">
          {place_data.description}
        </p>
        </div>
        
        <button className="view-map-btn">Map</button>
      </div>
    </>
  );
};

export default PlaceDetails;
