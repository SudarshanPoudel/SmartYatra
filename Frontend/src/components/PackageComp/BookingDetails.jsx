import React from 'react';
import BookingCard from './BookingCard'
import './BookingDetails.css'

export default function BookingDetails( items ) { 
  return (
    <div className="booking-details-container">
      <h1>Recommendations</h1>
      {items['item'].map((item, index) => (
        <BookingCard 
          key={index} 
          product={{
            image: item.image, 
            title: item.title,
            sub_title: item.sub_title,
            rating: item.rating,
            cost: item.cost
          }}
        />
      ))}
    </div>
  );
}
