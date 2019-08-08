// import { cuesExportBI, fetchBIExportsFromBatch, fetchBIExportsFromRelease } from "../BackgroundInstrumentalsActions/cuesActions";
// import { fetchBIcomposersExport, fetchBIcomposersReleaseExport, fetchBIcomposersBatchExport } from "../BackgroundInstrumentalsActions/composersActions";
import { tracksExportIA, fetchIAExportsFromRelease } from "../IndieArtistsActions/tracksActions";
import { fetchIAcomposersExport, fetchIAcomposersReleaseExport } from "../IndieArtistsActions/artistsActions";

// ==============================================================================================================
//  Export ACTIONS
// ==============================================================================================================
// Download Progress
// ==============================================================================================================
export const resetDownload = () => ({ type: "RESET_DL_PROGRESS", downloadProgress: (0).toFixed(2) });

export const updateDownload = (downloadProgress) => ({
    type: "UPDATE_DL_PROGRESS",
    downloadProgress: (downloadProgress * 100).toFixed(2)
});
// ==============================================================================================================
// Handle Fetch Cues From Releases
// ==============================================================================================================
export const handleFetchCuesForExport = (releaseID) => (dispatch) => {
  console.log("requesting cues from", releaseID);
  if (releaseID === 9999){ // if user is selecting "ALL" (value === 9999), dispatch a different fetch
    return dispatch(handleFetchAllCues())
  } else if (typeof releaseID === "string" && releaseID.includes("-")) {
    // release IDs including a slash "-" will always be BI
    return dispatch(fetchBIExportsFromRelease(releaseID)) & dispatch(fetchBIcomposersReleaseExport(releaseID));
  } else {
    return dispatch(handleFetchCuesFromBatch(releaseID)) & dispatch(handleFetchComposersFromRelease(releaseID))
  }
}
// ==============================================================================================================
// Handle Fetch All Cues
// ==============================================================================================================
export const handleFetchAllCues = () => {
  return (dispatch, getState) => {
    console.log(`from ${getState().selectedLibrary.libraryName}`);
    switch(getState().selectedLibrary.libraryName){
      // case "background-instrumentals":
      //   return dispatch(cuesExportBI()) & dispatch(fetchBIcomposersExport())
      //   break;
      case "independent-artists":
        return dispatch(tracksExportIA()) & dispatch(fetchIAcomposersExport())
        break;
    }
  }
}
// ==============================================================================================================
// Handle Fetch All Batch
// ==============================================================================================================
export const handleFetchCuesFromBatch = (releaseID) => {
  return (dispatch, getState) => {
    console.log(`from ${getState().selectedLibrary.libraryName}`);
    switch(getState().selectedLibrary.libraryName){
      // case "background-instrumentals":
      //   return dispatch(fetchBIExportsFromBatch(releaseID));
      //   break;
      case "independent-artists":
        return dispatch(fetchIAExportsFromRelease(releaseID));
        break;
    }
  }
}
// ==============================================================================================================
// Handle Fetch All Composers
// ==============================================================================================================
export const handleFetchAllComposers = () => {
  return (dispatch, getState) => {
    console.log(`from ${getState().selectedLibrary.libraryName}`);
    switch(getState().selectedLibrary.libraryName){
      // case "background-instrumentals":
      //   return dispatch(cuesExportBI());
      //   break;
      case "independent-artists":
        return dispatch(tracksExportIA());
        break;
    }
  }
}
// ==============================================================================================================
export const handleFetchComposersFromRelease = (releaseID) => {
  return (dispatch, getState) => {
    // console.log(`from ${getState().selectedLibrary.libraryName}`);
    switch(getState().selectedLibrary.libraryName){
      // case "background-instrumentals":
      //   return dispatch(fetchBIcomposersReleaseExport(releaseID));
      //   break;
      case "independent-artists":
        return dispatch(fetchIAcomposersReleaseExport(releaseID));
        break;
    }
  }
}
