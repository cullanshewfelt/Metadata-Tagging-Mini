import { handleUpdateModal } from "./modalActions";
// import { handleUpdateInstrumentsBI } from './BackgroundInstrumentalsActions/instrumentsActions';
import { handleSelectMasterKeyword } from "./selectedMasterKeysActions";

// ==============================================================================================================
//  SELECTED INSTRUMENTS ACTIONS
// ==============================================================================================================
export const initializeSelectedInstruments = (selectedInstruments) =>
  ({ type: "INITIALIZE_SELECTED_INSTRUMENTS", selectedInstruments });

export const handleSelectInstrument = (newInstrument) => (dispatch) =>
  dispatch(selectInstrument(newInstrument))
  & dispatch(handleSelectMasterKeyword(newInstrument.instru_name));

export const selectInstrument = (newInstrument) => (dispatch, getState) => {
  let { modal } = getState();
  let selectedCue = modal.selectedCue;
  let selectedCueInstruments = selectedCue.cue_instrus_edit !== "" ? selectedCue.cue_instrus_edit.toLowerCase().split(", ") : [];

  // if there are instruments selected already for the track
  // if (!selectedCue.cue_instrus_edit.includes(newInstrument.instru_name.toLowerCase())) {

  // check to see if the newInstrument already exsits in the cue_instrus_edit
  if (selectedCueInstruments.map(instruments => instruments.toLowerCase().trim()).indexOf(newInstrument.instru_name.toLowerCase().trim()) === -1){
    // if it doesn't, add it to cue_instrus_edit
    const newInstrumentName = newInstrument.instru_name.charAt(0).toUpperCase() + newInstrument.instru_name.slice(1).toLowerCase();
    selectedCueInstruments.push(newInstrumentName);
    // this small function will capitalize the first letter of the keyword:
    const newCueInstrumentsEdit = selectedCueInstruments.map(instru => instru.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")).join(", ");

    const updatedCue = { ...selectedCue, cue_instrus_edit: newCueInstrumentsEdit };
    const updatedInstrument =  { ...newInstrument, selected: true, instru_cnt: newInstrument.instru_cnt + 1 };

    return dispatch(updateInstruments(updatedInstrument)) & dispatch(handleUpdateModal(updatedCue));
  } else {  // if the instrument IS in the selectedCue metadata already, we remove it

    selectedCueInstruments.splice(selectedCueInstruments.indexOf(newInstrument.instru_name.toLowerCase()), 1);
    const newCueInstrumentsEdit = selectedCueInstruments.map(instru => instru.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ")).join(", ");

    const updatedCue = { ...selectedCue, cue_instrus_edit: newCueInstrumentsEdit };
    const updatedInstrument =  { ...newInstrument, selected: false, instru_cnt: newInstrument.instru_cnt - 1 };

    return dispatch(updateInstruments(updatedInstrument)) & dispatch(handleUpdateModal(updatedCue));
  }
};


// this function handles the dispatches to modify our redux store and SQL queries
let updateInstruments = (updatedInstrument) => {
  return (dispatch, getState) => {
    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      // return dispatch(handleUpdateInstrumentsBI(updatedInstrument)) & dispatch(updateSelectedInstrument(updatedInstrument));
      break;
    case "independent-artists":
      return dispatch(handleUpdateModal(updatedCue)) & dispatch(selectKeywords(newKeyword)) & dispatch(handleUpdateKeywordsIA(newKeyword));
    }
  };
};

export const updateSelectedInstrument = (updatedInstrument) => ({ type: "UPDATE_SELECTED_INSTRUMENT", updatedInstrument });

export const clearSelectedInstruments = () => ({ type: "CLEAR_SELECTED_INSTRUMENTS" });
