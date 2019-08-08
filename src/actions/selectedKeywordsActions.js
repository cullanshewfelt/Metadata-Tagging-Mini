import { handleUpdateModal } from "./modalActions";
// import { handleUpdateKeywordsBI } from './BackgroundInstrumentalsActions/keywordsActionsBI';
import { handleUpdateKeywordsIA } from "./IndieArtistsActions/keywordsActionsIA";

import { handleSelectMasterKeyword } from "./selectedMasterKeysActions";

// ==============================================================================================================
//  SELECTED KEYWORDS ACTIONS
// ==============================================================================================================
export const initializeSelectedKeywords = (selectedKeywords) =>
  ({ type: "INITIALIZE_SELECTED_KEYWORDS", selectedKeywords });

export const handleSelectKeyword = (newKeyword) => (dispatch) =>
  // simeatanously dispatch keywords and master_keys actions
  dispatch(selectKeyword(newKeyword))
  & dispatch(handleSelectMasterKeyword(newKeyword.keyword_name));


export const selectKeyword = (newKeyword) => {
  return (dispatch, getState) => {
    const { selectedCue } = getState().modal;
    let selectedCueKeywords = selectedCue.cue_desc !== "" ? selectedCue.cue_desc.toLowerCase().split(", ") : [];

    // check to see if the newKeyword already exsits in the cue_description
    if (selectedCueKeywords.map(keys => keys.toLowerCase().trim()).indexOf(newKeyword.keyword_name.toLowerCase().trim()) === -1) {
      // if it doesn't, add it to cue_desc and key_id_array
      selectedCueKeywords.push(newKeyword.keyword_name);

      // this small function will capitalize the first letter of the keyword
      const newCueDesc = selectedCueKeywords.map(keyword => keyword.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")).join(", ");

      const updatedCue = { ...selectedCue, cue_desc: newCueDesc };
      const updatedKeyword =  { ...newKeyword, selected: true, key_cnt: newKeyword.key_cnt + 1 };

      return dispatch(updateKeywords(updatedKeyword)) & dispatch(handleUpdateModal(updatedCue));
    } else { // if newKeyword is already in the cue_desc, then they are clicking it again to remove it

      selectedCueKeywords.splice(selectedCueKeywords.indexOf(newKeyword.keyword_name.toLowerCase()), 1);
      const newCueDesc = selectedCueKeywords.map(keyword => keyword.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ")).join(", ");

      const updatedCue = { ...selectedCue, cue_desc: newCueDesc };
      const updatedKeyword =  { ...newKeyword, selected: false, key_cnt: newKeyword.key_cnt - 1 };

      return dispatch(updateKeywords(updatedKeyword)) & dispatch(handleUpdateModal(updatedCue));
    }
  };
};

// this function handles the dispatches to modify our redux store and SQL queries
let updateKeywords = (updatedKeyword) => {
  return (dispatch, getState) => {
    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      // return dispatch(handleUpdateKeywordsBI(updatedKeyword)) & dispatch(updateSelectedKeyword(updatedKeyword));
      break;
    case "independent-artists":
      return dispatch(handleUpdateKeywordsIA(updatedKeyword)) & dispatch(updateSelectedKeyword(updatedKeyword));
    }
  };
};

export const updateSelectedKeyword = (updatedKeyword) => ({ type: "UPDATE_SELECTED_KEYWORD", updatedKeyword });

export const clearSelectedKeywords = () => ({ type: "CLEAR_SELECTED_KEYWORDS" });
