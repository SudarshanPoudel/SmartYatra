import React, { useState, useEffect } from 'react';
import './OptionsInput.css';

export const MultiOptionSelector = ({ label_text, given_options, onOptionsChange }) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState([]);
  console.log(given_options)
  useEffect(() => {
    if (onOptionsChange) {
      onOptionsChange(options);
    }
  }, [options, onOptionsChange]);

  const handleActivities = (event, option) => {
    event.preventDefault()
    setOptions(prevOptions =>
      prevOptions.includes(option)
        ? prevOptions.filter(p => p !== option)
        : [...prevOptions, option]
    );
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value) {
      const filtered = given_options.filter(option =>
        option.name.toLowerCase().includes(value.toLowerCase()) &&
        !options.includes(option.name) // Exclude already selected options
      ).slice(0,5);
      setFilteredOptions(filtered);
    } else {
      setFilteredOptions([]);
    }
  };

  const handleOptionClick = (option) => {
    if (!options.includes(option.name)) {
      setOptions([...options, option.name]);
      setInputValue('');
      setFilteredOptions([]);
    }
  };

  const handleTagRemove = (event, optionToRemove) => {
    event.preventDefault()
    setOptions(options.filter(option => option !== optionToRemove));
  };

  return (
    <div className="options-container">
      <h2>{label_text}</h2>
      <div className="btns">
        {given_options.slice(0, 6).map((e, i) => (
          <button 
            className={options.includes(e.name) ? "option-btn-selected option-btn" : "option-btn"}
            type="button"
            key={i}
            onClick={(event) => handleActivities(event, e.name)}
          >
            <img src={e.image} alt="" className="buttonBG" />
            <p className='name'>{e.name}</p>
          </button>
        ))}
      </div>
  
      {/* Render the "Search More Options" only if there are more than 6 items */}
      {given_options.length > 6 && (
        <div className="add-new">
          <div className="box">
            <label>Search More Options: </label>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </div>
          {filteredOptions.length > 0 && (
            <ul className="suggestions-list">
              {filteredOptions.map((option, index) => (
                <li
                  key={index}
                  onClick={() => handleOptionClick(option)}
                  style={{ cursor: 'pointer' }}
                >
                  {option.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
  
      {/* Render the "Selected Options" only if there are more than 6 items */}
      {given_options.length > 6 && options.length > 0 && (
        <div className="selected-options">
          {options.map((option, index) => (
            <div key={index} className="tag">
              <div className="name">{option}</div>
              <button 
                onClick={(event) => handleTagRemove(event, option)} 
                style={{ marginLeft: '5px', color: 'red' }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
};





export const SimpleOptionsSelector = ({ label_text, given_options, onOptionsChange }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  // Handle button click to select a option
  const handleSelectOption = (event, option) => {
    event.preventDefault()
    setSelectedOption(option);
    if (onOptionsChange) {
        onOptionsChange(option);
    }
  };

  return (
    <div className="options-container">
      <h2>{label_text}</h2>
      <div className="btns">
        {given_options.map((option, index) => (
          <button className={selectedOption === option.name ? "option-btn-selected option-btn": "option-btn"}
            type="button"
            key={index}
            onClick={(event) => handleSelectOption(event, option.name)}
          >
            <img src={option.image} alt="" className="buttonBG" />
            <p className='name'>{option.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};