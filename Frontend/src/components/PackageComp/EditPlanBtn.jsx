import React, { useState } from "react";
import "./EditPlanBtn.css"; 
import axios from "axios";
import { setformResponse } from "../../Redux/formResponseSlice";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { IoMdSend } from "react-icons/io";

export const EditPlanBtn = () => {
  const [isInputVisible, setInputVisible] = useState(false);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSend = async () => {
    console.log("Message sent:", text);
    setIsLoading(true); // Show loading state
    const editData = {
      user_edit_desc: text,
    };

    try {
      const response = await axios.post("edit-plan", editData);
      if (response.status === 200) {
        console.log("Plan generated successfully:", response.data);
        dispatch(setformResponse(response.data));
      } else {
        alert("Failed to generate plan. Please try again.");
      }
    } catch (error) {
      console.error("Error generating plan:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Hide loading state
    }

    setText("");
    setInputVisible(false);
  };

  return (
    <div className="floating-input-container">
      {!isInputVisible && (
        <button className="floating-button" onClick={() => setInputVisible(true)}>
          Edit Plan <MdEdit />
        </button>
      )}
      {isInputVisible && (
        <div className="input-container">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write what should be edited?"
            className="input-field"
          />
          <button onClick={handleSend} className="send-button">
            {isLoading ? (
              <div className="spinner"></div> // Add spinner here
            ) : (
              <IoMdSend />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default EditPlanBtn;
