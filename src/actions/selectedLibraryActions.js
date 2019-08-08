// import { handleUpdateCuesBI } from './BackgroundInstrumentalsActions/cuesActions';
import { handleUpdateCuesIA } from "./IndieArtistsActions/tracksActions";

// ==============================================================================================================
//  SELECTED LIBRARY ACTIONS
// ==============================================================================================================

export const initializeSelectedLibrary = (library, libraryName) => {
  return {
    type: "INITIALIZE_SELECTED_LIBRARY",
    libraryName,
    library
  };
};

export const handeleUpdateSelectedLibrary = (updatedCue) => {
  return function (dispatch, getState) {
    const selectedLibrary = getState().selectedLibrary;
    const selectedCueIdsArray = selectedLibrary.library.map(cue => cue.cue_id);
    const updatedCueIndex = selectedCueIdsArray.findIndex(id => id === updatedCue.cue_id);
    switch(selectedLibrary.libraryName){
    case "background-instrumentals":
      // return dispatch(handleUpdateCuesBI(updatedCue, updatedCueIndex)) & dispatch(updateSelectedLibrary(updatedCue, updatedCueIndex, selectedLibrary.libraryName));
      break;
    case "independent-artists":
      return dispatch(handleUpdateCuesIA(updatedCue, updatedCueIndex)) & dispatch(updateSelectedLibrary(updatedCue, updatedCueIndex, selectedLibrary.libraryName));
    }
  };
};

const updateSelectedLibrary = (updatedCue, updatedCueIndex, libraryName) => {
  return {
    type: "UPDATE_SELECTED_LIBRARY",
    index: updatedCueIndex,
    libraryName,
    updatedCue
  };
};
