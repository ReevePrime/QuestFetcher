import React from 'react';

const Dropdown = ({ selectedLanguage, onLanguageChange }) => {

  const handleOptionChange = (event) => {
    onLanguageChange(event.target.value);
  };

  return (
    <div>
      <label>Select an option:</label>
      <select className="dropdown" value={selectedLanguage} onChange={handleOptionChange}>
        <option value="Japanese">Japanese</option>
        <option value="English">English</option>
        <option value="French">French</option>
        <option value="German">German</option>
      </select>
    </div>
  );
};

export default Dropdown;