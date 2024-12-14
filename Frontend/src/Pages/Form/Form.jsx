import React, { useState, useEffect } from "react";
import "./Form.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  MultiOptionSelector,
  SimpleOptionsSelector,
} from "../../Components/FormComp/OptionsInput";
import { useNavigate } from "react-router-dom";
import {
  food_options,
  themes_options,
  travel_options,
} from "./FormOption";
import bgImage from "../../Assets/Image/homepagebg.png";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setformResponse } from "../../Redux/formResponseSlice";
import {
  fetchAllActivities,
  fetchAllPlaces,
  fetchAllPlaceType,
} from "../../Redux/apiFetchSlice";

import {RotatingLines} from 'react-loader-spinner'

export const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { allPlaces, allActivities, allPlaceTypes, status } = useSelector(
    (state) => state.fetchApi
  );

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
  const [isLoading, setIsLoading] = useState(false); // New loading state

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchAllPlaces());
      dispatch(fetchAllActivities());
      dispatch(fetchAllPlaceType());
    }
  }, [dispatch, allPlaces, allActivities, allPlaceTypes, status]);

  if (status === "loading") {
    return <h1>Loading...</h1>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!day || !budget || !startLoc) {
      alert("Please enter the number of days and your budget");
      return;
    }

    setIsLoading(true); // Set loading state to true

    const formData = {
      user_location: startLoc,
      tour_type: themes,
      no_of_days: parseInt(day),
      priority_place_types: placeTypes.join(","),
      priority_activities: activities.join(","),
      priority_places: places.join(","),
      extra_desc: extra || "",
    };

    try {
      const response = await axios.post("generate-plan", formData);
      if (response.status === 200) {
        console.log("Plan generated successfully:", response.data);
        dispatch(setformResponse(response.data));
        navigate("/plans");
      } else {
        alert("Failed to generate plan. Please try again.");
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false after completion
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

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "NPR" ? "USD" : "NPR"));
  };

  return (
    <div>
      <div className="form-bg-container">
        <img className="bg-image from-bg" src={bgImage} alt="" />
      </div>
      <div className="form-bg-container-inv">
        <img className="bg-image from-bg" src={bgImage} alt="" />
      </div>
      <form action="" onSubmit={handleSubmit}>
        <h1 className="form-heading">
          Plan your trip with <span>Dora</span>
        </h1>

        {/* Input Fields */}
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
          label_text="What types of places excite you? "
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
          label_text="What type of food do you prefer?"
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

        {isLoading ? (
            <div className="">
           <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
            </div>
        ) : (
          <button type="submit" className="plan-btn">
            Plan my trip
          </button>
        )}
      </form>
    </div>
  );
};

export default Form;
