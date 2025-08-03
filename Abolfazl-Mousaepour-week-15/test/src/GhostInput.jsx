import React, { useState } from "react";
import PropTypes from "prop-types";
import "./styles.css"; 

const GhostInput = ({
  label,
  data,
  value,
  onChange,
  placeholder = "شروع به تایپ کنید...",
}) => {
  const [suggestion, setSuggestion] = useState("");


  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    onChange(event); 

    if (inputValue) {
      const match = data.find((item) =>
        item.startsWith(inputValue)
      );
 
      setSuggestion(match ? match.slice(inputValue.length) : "");
    } else {
      setSuggestion(""); 
    }
  };


  const handleKeyDown = (event) => {
    if (event.key === "Tab" && suggestion) {
      event.preventDefault(); 

      const syntheticEvent = { target: { value: value + suggestion } };
      onChange(syntheticEvent);
      setSuggestion(""); 
    }
  };

  return (
    <div className="ghost-input-container">
      {label && <label className="ghost-input-label">{label}</label>}
      <div className="ghost-input-wrapper">
       
        <input
          type="text"
          className="ghost-input-real"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
        />
      
        <div className="ghost-input-suggestion">
          {value}
          <span className="suggestion-text">{suggestion}</span>
        </div>
      </div>
    </div>
  );
};


GhostInput.propTypes = {
  label: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default GhostInput;
