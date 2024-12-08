import React from 'react';
import './ItineraryDay.css'; // Importing the CSS file

const ItineraryDay = ({ data }) => {
  return (
    <div className="itinerary-day">
      <h2 className="itinerary-title">
        Day {data.day}: {data.title}
      </h2>

      <div className="schedule-container">
        {data.schedule.map((item, index) => (
          <div className="schedule-card" key={index}>
            <img src={item.image} alt={item.type} className="schedule-image" />
            <div className="schedule-details">
              <ScheduleItem item={item} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ItineraryDay;

const TravelSchedule = ({ item }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Travel from {item.origin} to {item.destination}</h3>
    <p className="schedule-info">{item.time} | {item.duration}</p>
    <a href="#" className="view-more">See Map</a>
  </div>
);

const BreakSchedule = ({ item }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Have {item.activity}</h3>
    <p className="schedule-info">{item.duration}</p>
    <a href="#" className="view-more">See Bookings</a>
  </div>
);

const VisitSchedule = ({ item }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Visit {item.place}</h3>
    <p className="schedule-info">{item.time} | {item.duration}</p>
    <a href="#" className="view-more">More Info</a>
  </div>
);

const ScheduleItem = ({ item }) => {
  // Conditionally render the component based on item.type
  if (item.type === 'travel') {
    return <TravelSchedule item={item} />;
  } else if (item.type === 'break') {
    return <BreakSchedule item={item} />;
  } else {
    return <VisitSchedule item={item} />;
  }
};