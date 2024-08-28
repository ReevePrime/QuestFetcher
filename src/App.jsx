import { useReducer, useState } from "react";
import Dropdown from "./components/Dropdown";
import SearchBar from "./components/SearchBar";
import SearchButton from "./components/SearchButton";
import languageMapping from "./assets/LanguageMapping";
import "./App.css";

function App() {
  const [questParams, questParamsDispatch] = useReducer(reducer, {
    language1: "Japanese",
    language2: "English",
    questData: {},
  });

  // Matches the language picked on the dropdown menu to the matching language key in the dialogues
  const getTextDataByLanguage = (language, questData) => {
    const selectedTextDataKey = languageMapping[language];
    return questData[selectedTextDataKey];
  };

  const selectedTextData1 = getTextDataByLanguage(
    questParams.language1,
    questParams.questData
  );
  const selectedTextData2 = getTextDataByLanguage(
    questParams.language2,
    questParams.questData
  );

  // Function to handle showText when quest data is acquired
  const [showText, setShowText] = useState(false);
  const displayDialogues = () => {
    if (Object.keys(questParams.questData).length > 0) {
      setShowText(true);
    }
  };

  // Update quest data when selected from search bar but ensure dialogues are not displayed right away
  const handleQuestSelection = (questData) => {
    questParamsDispatch({ type: "SET_QUESTDATA", payload: questData });
    setShowText(false);
  };

  function reducer(state, action) {
    switch (action.type) {
      case "SET_LANGUAGE1":
        return { ...state, language1: action.payload };
      case "SET_LANGUAGE2":
        return { ...state, language2: action.payload };
      case "SET_QUESTDATA":
        return { ...state, questData: action.payload };
      default:
        return state;
    }
  }

  return (
    <div className="container">
      <div className="search-engine">
        <SearchBar selectedQuest={handleQuestSelection} />
        <SearchButton onClick={displayDialogues} />
      </div>

      <div className="dropdown1">
        <Dropdown
          selectedLanguage={questParams.language1}
          onLanguageChange={(newLanguage) =>
            questParamsDispatch({ type: "SET_LANGUAGE1", payload: newLanguage })
          }
        />
        {showText && selectedTextData1 ? (
          selectedTextData1.Dialogue.map((text, index) => {
            return <p key={index}>{text.Text}</p>;
          })
        ) : (
          <div>No text to display</div>
        )}
      </div>

      <div className="dropdown2">
        <Dropdown
          selectedLanguage={questParams.language2}
          onLanguageChange={(newLanguage) =>
            questParamsDispatch({ type: "SET_LANGUAGE2", payload: newLanguage })
          }
        />
        {showText && selectedTextData2 ? (
          selectedTextData2.Dialogue.map((text, index) => {
            return <p key={index}>{text.Text}</p>;
          })
        ) : (
          <div>No text to display</div>
        )}
      </div>
    </div>
  );
}

export default App;

// TODO: Turn the rendered language into components that are part of of the dropdown
// TODO: Rename variables (language left right)
// TODO: Render the list of languages by iterating over the mapping
// TODO: Add a functionality to switch the languages if the same is selected twice
// TODO: Clean up CSS