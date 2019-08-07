import { handleSelectComposer  } from '../modalActions';
import { initializeSelectedComposer } from '../selectedComposerActions';
// ==============================================================================================================
//  ARTISTS ACTIONS
// ==============================================================================================================

export const initializeIAComposers = (composersIA) => ({ type: 'INITIALIZE_IA_COMPOSERS', composersIA });

export const fetchIAcomposer = (selectedCueId) => {
  return function (dispatch, getState) {
    // console.log(14, selectedCueId);
    fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/composersIA/${selectedCueId}`)
    .then(response => response.json())
    .then(composer => {
      // console.log(18, composer.data) // DO SOMETHING
      dispatch(handleSelectComposer(composer.data));
    })
    .catch(error =>
      !error
        ? console.log(22, 'done')
        : console.log(23, error)
    )
  }
}

// ==============================================================================================================
// EXPORTS ACTIONS
// ==============================================================================================================
export const fetchIAcomposersExport = () => (dispatch) => {
  // console.log('fetching all IA compsosers')
  fetch('https://react-metadata-beta.herokuapp.com/api/exports/composersIA/')
    .then(response => response.json())
    .then(response => {
      console.log(`fetched ${response.data.length} composers`)
      dispatch(initializeIAComposers(response.data)) & dispatch(initializeSelectedComposer(response.data))
    })
    .catch(err => console.error(37, err));
}

export const fetchIAcomposersReleaseExport = (releaseID) => (dispatch) => {
  // console.log(41, releaseID)
  fetch(`https://react-metadata-beta.herokuapp.com/api/exports/composersIA/rel/${releaseID}`)
    .then(response => response.json())
    .then(response => {
      console.log(`fetched ${response.data.length} composers`)
      dispatch(initializeIAComposers(response.data)) & dispatch(initializeSelectedComposer(response.data))
    })
    .catch(err => console.error(48, err));
}








// ==============================================================================================================
