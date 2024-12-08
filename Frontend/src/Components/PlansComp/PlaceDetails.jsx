import React from "react";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import "./PlaceDetails.css";

const PlaceDetails = () => {
  const place_data = {
    Image: "https://adventuretrekkingtour.com/wp-content/uploads/2019/04/Sarankot-Phewa-lake-hiking.jpg",
    activities: ["Trekking", "Scenic Views"],
    description: "Everest Base Camp (EBC) in Nepal's Solukhumbu District is a 5,364m high trekking destination, serving as the starting point for Everest summits. This popular trek offers stunning Himalayan views and passes through Sherpa villages, allowing cultural immersion. It's a challenging, high-altitude trek suitable for experienced adventurers and mountaineers.",
    id: 54,
    latitude: 28,
    location: "65 km northeast of Namche Bazaar, at the foot of Mount Everest",
    longitude: 86.86,
    name: "Everest Base Camp",
    rating: 4.5, // Rating is out of 5
    required_time: 10,
    type: ["Natural", "Historic"],
  };

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
        <img src={place_data.Image} alt={place_data.name} className="place-image" />
        <div className="place-type">
          {place_data.type.map((t, index) => (
            <span key={index} className="type-tag">
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="place-info">
        <h2 className="place-title">{place_data.name}</h2>

        <div className="place-activities">{place_data.activities.join(" | ")} | 
          <div className="stars-container">{renderStars(place_data.rating)}</div>
          {place_data.rating} / 5
        </div>

        <p className="place-description">{place_data.description}</p>
        <button className="view-map-btn">See Map</button>
      </div>
    </>
  );
};

export default PlaceDetails;
