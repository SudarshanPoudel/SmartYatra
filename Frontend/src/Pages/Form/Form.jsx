import React, { useState, useContext, act, useEffect } from "react";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MultiOptionSelector,
  SimpleOptionsSelector,
} from "../../Components/FormComp/OptionsInput";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../../ApiFetch/useFetch";
import {
  food_options,
  themes_options,
  travel_options,
} from "./FormOption";
import bgImage from "../../Assets/Image/homepagebg.png"
import axios from "axios";

export const Form = () => {
  const navigate = useNavigate();
  const [day, setDay] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [budget, setBudget] = useState("");
  const [startLoc, setStartLoc] = useState("");
  const [currency, setCurrency] = useState("NPR");
  const [extra, setExtra] = useState("");
  const [places, setPlaces] = useState([]);
  const [placeTypes, setPlaceTypes] = useState([]);
  const [themes, setTheme] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accommodation, setAccommodation] = useState("");
  const [foods, setFoods] = useState("");

  // APi fetch
  const { data: allActivities } = useFetch("all-activities");
  const { data: allPlaces } = useFetch("all-places");
  const { data: allPlaceTypes } = useFetch("all-placetypes");

  // const urlArgs = (data) => {
  //   let str = "";
  //   str =
  //     "days=" +
  //     day +
  //     "&budget=" +
  //     budget +
  //     "&accommodation=" +
  //     accommodation +
  //     "&food=" +
  //     foods;
  //   places.forEach((e) => {
  //     str += "&place=" + e;
  //   });
  //   themes.forEach((e) => {
  //     str += "&type=" + e;
  //   });
  //   activities.forEach((e) => {
  //     str += "&activities=" + e;
  //   });

  //   return str;
  // };


  // Handling form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!day || !budget || !startLoc) {
      alert("Please Number of days and your budget");
      return;
    }

    // let args = urlArgs();
    // navigate("/package" + "?" + args);


    // Data to be sent
    const formData = {
      user_location : startLoc,
      no_of_days : day,
      priority_place_types : placeTypes ,
      priority_activities : activities,
      priority_places : places,
      extra_desc : extra,
    }
    // console.log(formData);

    
      try{
        // Making POST request
        const response = await axios.post('http://127.0.0.1:8000/generate-plan', {formData});
      
        // Handle the response (e.g., navigate to another page or show success message)
      if (response.status === 200) {
        console.log('Plan generated successfully:', response.data);
         alert('Form Submitted')
      } else {
        alert('Failed to generate plan. Please try again.');
      }
      }catch(error){
        console.log('Error generating plan:', error);
        alert('An error occurred. Please try again.');
      }


           // Clear form inputs
           setDay("");
           setStartDate(new Date());
           setBudget("");
           setStartLoc("");
           setCurrency("NPR");
           setExtra("");
           setPlaces([]);
           setPlaceTypes([]);
           setTheme([]);
           setActivities([]);
           setAccommodation("");
           setFoods("");
  };

  

  // Toggling Currency
  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "NPR" ? "USD" : "NPR"));
  };

  return (
    <>
    <div className="form-bg-container">
      <img className='bg-image from-bg' src={bgImage} alt="" />
    </div>
    <div className="form-bg-container-inv">
      <img className='bg-image from-bg' src={bgImage} alt="" />
    </div>
    <form action="" onSubmit={handleSubmit}>
      <h1 className="form-heading">
        Plan your trip with <span>Dora</span>
      </h1>

      {/* Input Field */}
      <div className="basic-input">
        <div className="text-input">
          <label htmlFor="">Starting date:</label>
          <div className="date-input">
            <DatePicker
              portalId="datepicker"
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </div>
        </div>

        <div className="text-input smaller-box">
          <label htmlFor="">No of days:</label>
          <input
            required
            type="number"
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>

        <div className="text-input">
          <label htmlFor="">Location:</label>
          <input
            required
            type="text"
            value={startLoc}
            onChange={(e) => setStartLoc(e.target.value)}
          />
        </div>
        
        <div className="text-input smaller-box">
          <label htmlFor="">Budget:</label>
          <div className="budget-input">
            <input
              required
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
            />
            <button
              type="button"
              className="currency-toggle"
              onClick={toggleCurrency}
            >
              {currency}
            </button>
          </div>
        </div>

      </div>

      <SimpleOptionsSelector
        label_text="What is your primary interest for this trip? "
        given_options={themes_options}
        onOptionsChange={setTheme}
      />
      <MultiOptionSelector
        label_text="What types of places excites you? "
        given_options={allPlaceTypes}
        onOptionsChange={setPlaceTypes}
      />
      <MultiOptionSelector
        label_text="Are there any specific places in your mind?"
        given_options={allPlaces}
        onOptionsChange={setPlaces}
      />
      <MultiOptionSelector
        label_text="Any activities you want to do in your trip?"
        given_options={allActivities}
        onOptionsChange={setActivities}
      />

      <SimpleOptionsSelector
        label_text="What type of food you prefer?"
        given_options={food_options}
        onOptionsChange={setFoods}
      />
      <SimpleOptionsSelector
        label_text="What is your preferred mode of transportation?"
        given_options={travel_options}
        onOptionsChange={setAccommodation}
      />

      <div className="text-input-extra">
        <label htmlFor="">Extra instructions: </label>
        <textarea
          className="extra-instructions"
          type="text"
          value={extra}
          onChange={(e) => setExtra(e.target.value)}
        ></textarea>
      </div>

      <button type="submit" className="plan-btn">
        Plan my trip
      </button>
    </form>
    </>
  );
};

export default Form;
