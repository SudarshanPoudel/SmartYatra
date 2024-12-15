import React from 'react';
import './ItineraryDay.css'; // Importing the CSS file

const ItineraryDay = ({ data, onDetailChange }) => {
  return (
    <div className="itinerary-day">
      <h2 className="itinerary-title">
        Day {data.day}: {data.title}
      </h2>

      <div className="schedule-container">
        {data.schedule.map((item, index) => (
          <div className="schedule-card" key={index}>
            <div className="schedule-image">
              <img src={item.image} alt={item.type} />
            </div>
            <div className="schedule-details">
              <ScheduleItem item={item} onDetailChange={onDetailChange} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItineraryDay;

const TravelSchedule = ({ item, onDetailChange }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">
      {item.origin_id !== '-1'
        ? `Travel from ${item.origin} to ${item.destination}`
        : `Travel to ${item.destination}`}
    </h3>
    <p className="schedule-info">{item.time} | {item.duration}</p>
    <button onClick={() => onDetailChange("booking", item)} className="view-more">
      Transports
    </button>
    <span className='middle-bar'>|</span>
    <button onClick={() => onDetailChange("map", item)} className="view-more">
      Map
    </button>
  </div>
);

const BreakSchedule = ({ item, onDetailChange }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Have {item.activity}</h3>
    <p className="schedule-info">{item.duration}</p>
    <button onClick={() => onDetailChange("booking", item)} className="view-more">
      Restaurants
    </button>
  </div>
);

const StaySchedule = ({ item, onDetailChange }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Night Stay in {item.place}</h3>
    <p className="schedule-info">Night stay</p>
    <button onClick={() => onDetailChange("booking", item)} className="view-more">
      Bookings
    </button>
  </div>
);

const VisitSchedule = ({ item, onDetailChange }) => (
  <div className="schedule-item">
    <h3 className="schedule-title">Visit {item.place}</h3>
    <p className="schedule-info">{item.time} | {item.duration}</p>
    <button onClick={() => onDetailChange("place", item)} className="view-more">
      Details
    </button>
    <span className='middle-bar'>|</span>
    <button onClick={() => onDetailChange("map", item)} className="view-more">
      Map
    </button>
  </div>
);

const ScheduleItem = ({ item, onDetailChange }) => {
  // Conditionally render the component based on item.type
  if (item.type === 'travel') {
    return <TravelSchedule item={item} onDetailChange={onDetailChange} />;
  } else if (item.type === 'break') {
    return <BreakSchedule item={item} onDetailChange={onDetailChange} />;
  } else if (item.type === 'stay') {
    return <StaySchedule item={item} onDetailChange={onDetailChange} />;
  } else {
    return <VisitSchedule item={item} onDetailChange={onDetailChange} />;
  }
};
