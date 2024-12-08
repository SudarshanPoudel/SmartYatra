import React, { useState, useContext, act } from 'react';
import './Form.css';

import 'react-datepicker/dist/react-datepicker.css';
import {MultiOptionSelector, SimpleOptionsSelector} from '../../Components/FormComp/OptionsInput';
import { useNavigate } from 'react-router-dom';


export const Form = () => {
  const navigate = useNavigate()
  const [day, setDay] = useState('');
  const [budget, setBudget] = useState('');
  const [currency, setCurrency] = useState("NPR");
  const [extra, setExtra] = useState('');
  const [places, setPlaces] = useState([]);
  const [themes, setTheme] = useState([]);
  const [activities, setActivities] = useState([]);
  const [accommodation, setAccommodation] = useState('');
  const [foods, setFoods] = useState('');


  
  const places_options = []
  const activities_options = []

  const themes_options = [
    {
      "name": "Exploration",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Educational",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Religious",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    }
  ]

  const place_type_options = [
    {
      "name": "Commercial",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Historic",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Religious",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Cultural",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Natural",
      "image": "https://d3mvlb3hz2g78.cloudfront.net/wp-content/uploads/2018/02/thumb_720_450_Jungledreamstime_l_56902828.jpg"
    },
    {
      "name": "Wildlife",
      "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH9eTvV4wbXjs7XTgb_PKV6i9L697Q2qoNTw&s"
    }
  ];
  const food_options = [
    {
      'name': 'Non-Vegetarian',
      "image": "https://parade.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cq_auto:good%2Cw_1200/MTk3NzM1OTc2NzkxOTc1MjEz/best-meat-source-gut-health.jpg"
    },
    {
      'name': 'Vegetarian',
      "image": "https://i0.wp.com/post.healthline.com/wp-content/uploads/2021/10/food-rainbow-vegetable-fruit-variety-group-healthy-1296x728-header.jpg?w=1155&h=1528"
    }
  ]
  const travel_options = [
    {
      'name': 'Public',
      "image": "https://cdn.kimkim.com/files/a/content_articles/featured_photos/8429ce1e9fd968cab650cf1668a1e50c14a1cd7d/big-0e7d251e6b331de6e83619725d4844e9.jpg"
    },
    {
      'name': 'Private',
      "image": "https://s3.ap-south-1.amazonaws.com/chsfiles/media/eEfrCinGpB2vTIyv79JxkQRgiOavd7vuUEbahyoO.jpeg"
    }
  ]

  const urlArgs = (data)=>{
    let str = ''
    str = 'days=' + day + '&budget=' + budget + '&accommodation=' + accommodation + '&food=' + foods
    places.forEach(e =>{
      str += '&place='+e
    })
    themes.forEach(e =>{
      str += '&type=' + e
    })
    activities.forEach(e =>{
      str += '&activities=' + e
    })

    return str
  }



  const handleSubmit = (e) => {
    e.preventDefault();

    if (!day || !budget) {
        alert('Please Number of days and your budget');
        return;
    }

    let args = urlArgs();
    navigate('/package' + '?' +args)
  };

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "NPR" ? "USD" : "NPR"));
  };

  return (
    <form action="" onSubmit={handleSubmit}>

      <h1 className='form-heading'>Plan your trip with Smart<span>Yatra</span></h1>

      {/* Input Field */}
      <div className="basic-input">

        <div className="text-input">
          <label htmlFor="">No of days:</label>
          <input required type="number" value={day} onChange={(e) => setDay(e.target.value)} />
        </div>

        <div className="text-input">
          <label htmlFor="">Budget:</label>
          <div className="budget-input">

          <input required type="number" value={budget} onChange={(e) => setBudget(e.target.value)} />
          <button type="button" className="currency-toggle" onClick={toggleCurrency}>
            {currency}
          </button>
          </div>
        </div>

      </div>

      <SimpleOptionsSelector label_text="What is your primary interest for this trip? " given_options={themes_options} onOptionsChange={setTheme}/>
      <MultiOptionSelector label_text="What types of places excites you? " given_options={place_type_options} onOptionsChange={setTheme}/>
      <MultiOptionSelector label_text="Are there any specific places in your mind?" given_options={place_type_options} onOptionsChange={setPlaces}/>
      <MultiOptionSelector label_text="Any activities you want to do in your trip?" given_options={place_type_options} onOptionsChange={setActivities}/>

    
      <SimpleOptionsSelector label_text="What type of food you prefer?" given_options={food_options} onOptionsChange={setFoods}/>
      <SimpleOptionsSelector label_text="What is your preferred mode of transportation?" given_options={travel_options} onOptionsChange={setAccommodation}/>

      <div className="text-input-extra">
          <label htmlFor="">Extra instructions: </label> 
          <textarea className='extra-instructions' type='text' value={extra} onChange={(e) => setExtra(e.target.value)} ></textarea>
      </div>

      <button type="submit" className="plan-btn">Plan my trip</button>
    </form>
  );
};

export default Form;