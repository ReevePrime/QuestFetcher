import React from 'react';
import languageMapping from '../assets/LanguageMapping';

const Dropdown = ({ selectedLanguage, onLanguageChange, showText, selectedTextData, otherLanguage, swapLanguages }) => {

  const handleOptionChange = async (event) => {
    const newLanguage = event.target.value;
      if (newLanguage === otherLanguage) {
        swapLanguages({ type: "SWAP_LANGUAGES"});
      } else {
        onLanguageChange(newLanguage);
      }
  };
  
  const languageList = Object.keys(languageMapping).map(value => (
    <option key={value} value={value}>{value}</option>
  ));

  return (
    <div>
      <label>Select an option:</label>
      <select className="dropdown" value={selectedLanguage} onChange={handleOptionChange} >
      {languageList}
      </select>
      {showText && selectedTextData ? (
        selectedTextData.Dialogue.map((text, index) => {
          return <p key={index}>{text.Text}</p>;
        })
      ) : (
        <div>No text to display</div>
      )}
    </div>
  );
};

export default Dropdown;