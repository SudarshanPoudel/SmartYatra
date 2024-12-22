import React, { useState, useEffect } from 'react';
import './Form.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { SimpleOptionsSelector, MultiOptionSelector } from '../../components/FormComp/OptionsInput';
import { useNavigate } from 'react-router-dom';
import { food_options, themes_options, travel_options } from './FormOption';
import bgImage from '../../Assets/Image/homepagebg.png';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setformResponse } from '../../Redux/formResponseSlice';
import { findClosestPlace } from '../../components/FormComp/closestPath';
import {fetchAllActivities,fetchAllPlaces,fetchAllPlaceType,} from '../../Redux/apiFetchSlice';
import LoadingScreen from '../../components/FormComp/LoadingScreen';

const Form = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allPlaces, allActivities, allPlaceTypes, status } = useSelector(state => state.fetchApi );

  const [day, setDay] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [budget, setBudget] = useState('');
  const [startLoc, setStartLoc] = useState('');
  const [startPoint, setStartPoint] = useState('');
  const [startLat, setStartLat] = useState('');
  const [startLong, setStartLong] = useState('');
  const [currency, setCurrency] = useState('NPR');
  const [extra, setExtra] = useState('');
  const [places, setPlaces] = useState([]);
  const [placeTypes, setPlaceTypes] = useState([]);
  const [themes, setTheme] = useState([]);
  const [activities, setActivities] = useState([]);
  const [transportation, setTransportation] = useState('');
  const [foods, setFoods] = useState('');
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAllPlaces());
      dispatch(fetchAllActivities());
      dispatch(fetchAllPlaceType());
    }
  }, [dispatch, allPlaces, allActivities, allPlaceTypes, status]);

  if (status === 'loading') {
    return <h1>Loading...</h1>;
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!day || !budget || !startLoc) {
      alert('Please enter the number of days and your budget');
      return;
    }

    setIsLoading(true); // Set loading state to true

    const formData = {
      user_location: startLoc,
      starting_point: startPoint,
      user_lat: parseFloat(startLat),
      user_long: parseFloat(startLong),
      tour_type: themes,
      no_of_days: parseInt(day),
      priority_place_types: placeTypes.join(','), 
      priority_activities: activities.join(','), 
      priority_places: places.join(','), 
      extra_desc: extra || '',
      budget: parseInt(budget),
      food_pref: foods || '',
      travel_pref: transportation || '',
      currency: currency || 'npr'
    };

    try {
      const response = await axios.post('generate-plan', formData);
      if (response.status === 200) {
        console.log('Plan generated successfully:', response.data);
        dispatch(setformResponse(response.data));
        navigate('/package');
      } else {
        alert('Failed to generate plan. Please try again.');
      }
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }

    // Clear form inputs
    setDay('');
    setStartDate(new Date());
    setBudget('');
    setStartLoc('');
    setStartLat('');
    setStartLong('');
    setCurrency('npr');
    setExtra('');
    setPlaces([]);
    setPlaceTypes([]);
    setTheme([]);
    setActivities([]);
    setTransportation('');
    setFoods('');
  };

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === 'NPR' ? 'USD' : 'NPR'));
  };

  const currentLocation = () => {
    setStartLoc('Fetching Live Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          const closestPlace = findClosestPlace(latitude, longitude, allPlaces)
          setStartLoc(closestPlace[0]);
          setStartPoint(closestPlace[1]);
          setStartLat(latitude);
          setStartLong(longitude);
        },
        (error) => {
          console.error('Error retrieving location:', error.message);
          alert('Unable to retrieve location. Please check your permissions.');
          setStartLoc('');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setStartLoc('');
    }
  };

  const loadArray = [
    "Analyzing your input...",
    "Searching for matching places...",
    "Generating itinerary...",
    "Looking for hotels, transportation, and food options...",
    "Finalizing your trip plan..."
  ];
  
  return (
    <>
      {isLoading && <LoadingScreen className="loading" textArray={loadArray} timePerText={4} />} 
       <div className="form-bg-container">
        <img className="bg-image from-bg" src={bgImage} alt="" />
      </div>
      <div className="form-bg-container-inv">
        <img className="bg-image from-bg" src={bgImage} alt="" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <h1 className="form-heading">
          Plan your trip with Smart<span>Yatra</span>
        </h1>

        {/* Input Field */}
        <div className="basic-input">
          <div className="text-input">
            <label htmlFor="">Starting date:</label>
            <div className="date-input">
              <DatePicker portalId="datepicker" selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>
          </div>

          <div className="text-input smaller-box">
            <label htmlFor="">No of days:</label>
            <input required type="number" value={day} onChange={(e) => setDay(e.target.value)} />
          </div>

          <div className="text-input location-input">
            <label htmlFor="">Location:</label>
            <input required type="text" value={startLoc} onChange={(e) => setStartLoc(e.target.value)} />
            <button type="button" className="location-use" onClick={currentLocation}>Live</button>
          </div>

          <div className="text-input smaller-box">
            <label htmlFor="">Budget:</label>
            <div className="budget-input">
              <input required type="number" value={budget} onChange={(e) => setBudget(e.target.value)}/>
              <button type="button" className="currency-toggle" onClick={toggleCurrency}>{currency}</button>
            </div>
          </div>
        </div>

        <SimpleOptionsSelector label_text="What is your primary interest for this trip?" given_options={themes_options} onOptionsChange={setTheme}/>
        <MultiOptionSelector label_text="What types of places excites you?" given_options={allPlaceTypes} onOptionsChange={setPlaceTypes} shuffle={'true'}/>
        <MultiOptionSelector label_text="Are there any specific places in your mind?" given_options={allPlaces} onOptionsChange={setPlaces}/>
        <MultiOptionSelector label_text="Any activities you want to do in your trip?" given_options={allActivities} onOptionsChange={setActivities}/>
        <SimpleOptionsSelector label_text="What type of food you prefer?" given_options={food_options} onOptionsChange={setFoods}/>
        <SimpleOptionsSelector label_text="What is your preferred mode of transportation?" given_options={travel_options} onOptionsChange={setTransportation}/>

        <div className="text-input-extra">
          <label htmlFor="">Extra instructions: </label>
          <textarea className="extra-instructions" type="text" value={extra} onChange={(e) => setExtra(e.target.value)}></textarea>
        </div>
        <button type="submit" className="plan-btn"> Plan my trip</button>
      </form>
    </>
  );
};

export default Form;
