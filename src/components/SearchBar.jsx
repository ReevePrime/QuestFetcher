import React, { useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import "./SearchBar.css";

function SearchBar({ selectedQuest }) {
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions = async (searchTerm) => {
    try {
      const response = await fetch(`https://xivapi.com/search?string=${searchTerm}&indexes=Quest`);
      const data = await response.json();
      const formattedSuggestions = data.Results.map(item => ({
        id: item.ID, 
        name: item.Name,
      }));
      setSuggestions(formattedSuggestions);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

    // Fetch detailed quest data based on selected quest ID
    const fetchQuestData = async (questID) => {
      try {
        const response = await fetch(`https://xivapi.com/quest/${questID}?columns=ID,Name_en,TextData_en,TextData_ja,TextData_fr,TextData_de,Name_ja,Name_fr,Name_de`);
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching quest data:', error);
      }
    };

const handleOnSearch = (string, results) => {
    fetchSuggestions(string);
  };

  const handleOnSelect = async (item) => {
    const questData = await fetchQuestData(item.id);
    selectedQuest(questData);
  };

  return (
    <div className="searchBar">
      <ReactSearchAutocomplete
        items={suggestions}
        onSearch={handleOnSearch}
        onSelect={handleOnSelect}
        autoFocus
        // reactsearchautocomplete property: sets the property the search will be based on
        fuseOptions={{ keys: ["name"] }}
      />
    </div>
  );
}

export default SearchBar;