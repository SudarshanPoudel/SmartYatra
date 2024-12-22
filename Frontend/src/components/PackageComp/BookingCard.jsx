import React from "react";
import "./BookingCard.css";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";

const BookingCard = ( item ) => {
  function getImageURL(name){
    return `http://localhost:8000/images/`+name
  }

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

  const i = item['product']
  return (
    <div className="item-card">
      <img src={getImageURL(i.image)} alt={item.title} className="item-image" />
      <div className="item-details">
        <h3 className="item-title">{i.title}</h3>
        <p className="item-subtitle">{i.sub_title}</p>
        <p className="item-rating">
         <span> {renderStars(i.rating)}</span> {i.rating}/5
        </p>
        <button className="book-now-button">Book Now</button>
        <p className="item-cost"> {i.cost}</p>
      </div>
    </div>
  );
};

export default BookingCard;
