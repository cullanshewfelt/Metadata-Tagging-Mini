// import { asyncCuesFetch,  fetchBICuesFromRelease, handleClearBIcues } from './BackgroundInstrumentalsActions/cuesActions';
import { asyncTracksFetch, fetchIATracksFromRelease, handleClearIAcues } from "./IndieArtistsActions/tracksActions";

// ==============================================================================================================
//  SELECTED RELEASES ACTIONS
// ==============================================================================================================

export const initializeSelectedReleases = (selectedReleases) => ({ type: "INITIALIZE_SELECTED_RELEASES", selectedReleases });

export const handleFetchCuesFromRelease = (releaseID) => {
  return (dispatch, getState) => {
    if (releaseID === 9999){ // if user is selecting 'ALL' (value === 9999), dispatch a different fetch
      switch(getState().selectedLibrary.libraryName){
      case "background-instrumentals":
        // return dispatch(asyncCuesFetch());
        break;
      case "independent-artists":
        return dispatch(asyncTracksFetch());
        break;
      }
    } else {
      switch(getState().selectedLibrary.libraryName){
      case "background-instrumentals":
        // return dispatch(fetchBICuesFromRelease(releaseID));
        break;
      case "independent-artists":
        return dispatch(fetchIATracksFromRelease(releaseID));
        break;
      }
    }
  };
};
