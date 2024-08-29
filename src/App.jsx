import { useReducer, useState } from "react";
import Dropdown from "./components/Dropdown";
import SearchBar from "./components/SearchBar";
import SearchButton from "./components/SearchButton";
import languageMapping from "./assets/LanguageMapping";
import "./App.css";

function App() {
  const [questParams, questParamsDispatch] = useReducer(reducer, {
    languageLeft: "Japanese",
    languageRight: "English",
    questData: {},
  });

  const [showText, setShowText] = useState(false);

  // Matches the language picked on the dropdown menu to the matching language key in the dialogues
  const getTextDataByLanguage = (language, questData) => {
    const selectedTextDataKey = languageMapping[language];
    return questData[selectedTextDataKey];
  };

  const selectedTextDataLeft = getTextDataByLanguage(
    questParams.languageLeft,
    questParams.questData
  );
  const selectedTextDataRight = getTextDataByLanguage(
    questParams.languageRight,
    questParams.questData
  );

  // Function to handle showText when quest data is acquired
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
      case "SET_LANGUAGE_LEFT":
        return { ...state, languageLeft: action.payload };
      case "SET_LANGUAGE_RIGHT":
        return { ...state, languageRight: action.payload };
      case "SET_QUESTDATA":
        return { ...state, questData: action.payload };
        // If selecting the same language as in the other dropdown menu:
      case "SWAP_LANGUAGES":
        return {
          ...state,
          languageLeft: state.languageRight,
          languageRight: state.languageLeft,
        };
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
      <div className="dropdown-left">
        <Dropdown
          selectedLanguage={questParams.languageLeft}
          onLanguageChange={(newLanguage) =>
            questParamsDispatch({
              type: "SET_LANGUAGE_LEFT",
              payload: newLanguage,
            })
          }
          showText={showText}
          selectedTextData={selectedTextDataLeft}
          otherLanguage={questParams.languageRight}
          swapLanguages={questParamsDispatch}
        />
      </div>

      <div className="dropdown-right">
        <Dropdown
          selectedLanguage={questParams.languageRight}
          onLanguageChange={(newLanguage) =>
            questParamsDispatch({
              type: "SET_LANGUAGE_RIGHT",
              payload: newLanguage,
            })
          }
          showText={showText}
          selectedTextData={selectedTextDataRight}
          otherLanguage={questParams.languageLeft}
          swapLanguages={questParamsDispatch}
        />
      </div>
    </div>
  );
}

export default App;


// TODO: Clean up CSS
