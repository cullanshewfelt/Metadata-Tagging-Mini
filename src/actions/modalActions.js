import { handeleUpdateSelectedLibrary } from "./selectedLibraryActions";
// import { fetchBIcue, saveBIcue } from './BackgroundInstrumentalsActions/cuesActions';
// import { fetchBIcomposer } from './BackgroundInstrumentalsActions/composersActions';
import { fetchIAcue, saveIAcue } from "./IndieArtistsActions/tracksActions";
import { fetchIAcomposer } from "./IndieArtistsActions/artistsActions";
import { selectStatus } from "./statusActions";
import { handleSelectMasterKeyword } from "./selectedMasterKeysActions";
import { clearRatings } from "./ratingsActions";
import { clearSelectedCategories } from "./selectedCategoriesActions";
import { clearSelectedInstruments } from "./selectedInstrumentsActions";
import { clearSelectedKeywords } from "./selectedKeywordsActions";
import { clearSelectedStyles } from "./selectedStylesActions";
import { clearTempos } from "./temposActions";
import { clearCatLink, clearStyleLink, handleSaveIALinks } from "./linkActions";

// ==============================================================================================================
// MODAL ACTIONS
// ==============================================================================================================

export const initializeModal = ({
  rightColumnHeader = "",
  searchFilter = "",
  selectedComposer = [],
  selectedCue = {},
  selectedCueId = 0,
  showCategories = false,
  showInstruments = false,
  showKeywords = false,
  showModal = false,
  showRating = false,
  showStatus = false,
  showStyles = false,
  showTempos = false,
  showText = false,
  textType = "",
}) => ({
  type: "INITIALIZE_MODAL",
  modal: {
    rightColumnHeader,
    searchFilter,
    selectedComposer,
    selectedCue,
    selectedCueId,
    showCategories,
    showInstruments,
    showKeywords,
    showModal,
    showRating,
    showStatus,
    showStyles,
    showTempos,
    showText,
    textType
  }
});

// trigger this from fetchBIcue and fetchIAcue ????
export const handleToggleModal = (selectedCueId) => {
  return function (dispatch){
    return dispatch(toggleModal(selectedCueId));
  };
};

const toggleModal = (selectedCueId) => ({
  type: "TOGGLE_MODAL",
  showModal: true,
  selectedCueId
});

// handleFetchCue will dispatch actions to fetch the cue data AND composer data for the selected track
export const handleFetchCue = (selectedCueId) => {
  // console.log(61, 'modalActions.handleFetchCue.selectedCueId', selectedCueId)
  return function (dispatch, getState) {
    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      break;
      // return dispatch(fetchBIcue(selectedCueId)) & dispatch(fetchBIcomposer(selectedCueId));
    case "independent-artists":
      return dispatch(fetchIAcue(selectedCueId)) & dispatch(fetchIAcomposer(selectedCueId));
    }
  };
};

export const handleSelectCue = (selectedCue) => ({
  type: "MODAL_SELECT_CUE",
  selectedCue
});

export const handleSelectComposer = (selectedComposer) => ({
  type: "MODAL_SELECT_COMPOSER",
  selectedComposer
});

export const selectHeader = (rightColumnHeader) => ({
  type: "SELECT_HEADER",
  rightColumnHeader
});


export const showCategories = () => ({ type: "SHOW_CATEGORIES" });

export const showInstruments = () => ({ type: "SHOW_INSTRUMENTS" });

export const showKeywords = () => ({ type: "SHOW_KEYWORDS" });

export const showRatings = () => ({ type: "SHOW_RATINGS" });

export const showStatus = () => ({ type: "SHOW_STATUS" });

export const showStyles = () => ({ type: "SHOW_STYLES" });

export const showTempos = () => ({ type: "SHOW_TEMPOS" });

export const showTextBox = (textType) => ({ type: "SHOW_TEXTBOX", textType });

export const handleSearchFilter =  (searchFilter) => ({ type: "SEARCH_FILTER", searchFilter });

export const clearSearch =  () => ({ type: "CLEAR_FILTER" });

export const handleSelectStatus = (newStatus) => {
  return function (dispatch, getState) {
    let selectedCue = getState().modal.selectedCue;
    let updatedCue = { ...selectedCue, cue_status: newStatus.value };
    return dispatch(selectStatus(newStatus.value)) & dispatch(handleUpdateModal(updatedCue));
  };
};

export const handleUpdateModal = (updatedCue) => {
  // console.log(115, updatedCue)
  return function (dispatch) {
    return dispatch(updateModal(updatedCue)) && dispatch(handeleUpdateSelectedLibrary(updatedCue));
  };
};


export const updateModal = (updatedCue) => ({ type: "UPDATE_MODAL_DATA", updatedCue });

export const handleSave = (selectedCue) => {  // takes the selectedCue and pushes it to the props with the update information
  // console.log(138, selectedCue)
  return function (dispatch, getState) {
    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      break;
      // return dispatch(handleSaveBILinks()) & dispatch(saveBIcue(selectedCue));
    case "independent-artists":
      return  dispatch(handleSaveIALinks()) & dispatch(saveIAcue(selectedCue));
    }
  };
};

export const handleUpdateSoundsLike = (soundsLike) => (dispatch) => {
  const soundsLikeArray = soundsLike.value.split(", ");
  // const oldSoundsLike = getState().modal.selectedCue[soundsLike.type];
  // console.log(138, oldSoundsLike)
  soundsLikeArray.forEach(keyword => dispatch(handleSelectMasterKeyword(keyword)));
};

export const handleCloseModal = () => (dispatch) => {
  let emptyCue = {};
  // could potentiall call one of these and trigger the rest through thunks
  // VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV
  dispatch(handleUpdateModal(emptyCue)); // update data
  dispatch(clearRatings()); // and clear all the selected properties
  dispatch(clearSelectedCategories());
  dispatch(clearSelectedInstruments());
  dispatch(clearSelectedKeywords());
  dispatch(clearSelectedStyles());
  dispatch(clearTempos());
  dispatch(clearCatLink());
  dispatch(clearStyleLink());
  dispatch(closeModal()); // close the modal AFTER everything has been cleared
};

export const closeModal = () => ({ type: "CLOSE_MODAL" });


export const save = (modal, updatedCue) => ({
  type: "SAVE",
  modal: {
    ...modal,
    searchFilter: "",
    selectedCue: updatedCue,
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showModal: true,
    showStatus: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});
