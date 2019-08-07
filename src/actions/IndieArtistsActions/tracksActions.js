import { handleSelectCue } from '../modalActions';
import { initializeSelectedLibrary } from '../selectedLibraryActions';
import { initCatLink, initStyleLink } from '../linkActions';

// ==============================================================================================================
//  TRACK ACTIONS
// ==============================================================================================================

export const asyncTracksFetch = () => {
  console.log(`fetching all IA cues`);
  return (dispatch) => {
    dispatch(tracksAreLoading(true));
    fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/')
      .then(response => {
        !response.ok ? Error(response.statusText) : null ;
        dispatch(tracksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(tracks => {
        console.log(`fetching ${tracks.data.length} IA tracks`)
        dispatch(trackFetchDataSuccess(tracks.data)) & dispatch(initializeSelectedLibrary(tracks.data, 'independent-artists'))
      })
      .catch(() => dispatch(trackFetchError(true)));
  }
}

export function trackFetchError(bool) {
    return {
        type: 'TRACK_FETCH_HAS_ERRORED',
        hasErrored: bool
    };
}
export function tracksAreLoading(bool) {
    return {
        type: 'TRACK_FETCH_IS_LOADING',
        isLoading: bool
    };
}
export function trackFetchDataSuccess(items) {
    return {
        type: 'TRACK_FETCH_DATA_SUCCESS',
        items
    };
}
// ==============================================================================================================
// From Release
// ==============================================================================================================
export const fetchIATracksFromRelease = (releaseID) => {
  console.log(`fetching IA tracks for release ${releaseID}`);
  return (dispatch) => {
    dispatch(tracksAreLoading(true));
    fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/rel/${releaseID}/`)
      .then(response => {
        !response.ok ? Error(response.statusText) : null ;
        dispatch(tracksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(tracks => {
        console.log(`fetching ${tracks.data.length} IA tracks`)
        dispatch(trackFetchDataSuccess(tracks.data)) & dispatch(initializeSelectedLibrary(tracks.data, 'independent-artists'))
      })
      .catch(() => dispatch(trackFetchError(true)));
  }
}

export const fetchIAcue = (selectedCueId) => {
  return function (dispatch) {
    fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/${selectedCueId}`)
    .then(response => response.json())
    .then(res => {
      const cue = res.data[0];
      const catId = cue.cat_id;
      const styleId = cue.style_id;
      // console.log(76, cue.data[0]) // DO SOMETHING
      dispatch(handleSelectCue(cue))
      & dispatch(initCatLink(catId))
      & dispatch(initStyleLink(styleId));
    })
    .catch(error =>
      !error
        ? console.log(83, 'done')
        : console.log(84, error)
    )
  }
}

// ==============================================================================================================
// UPDATE
// ==============================================================================================================
export const handleUpdateCuesIA = (updatedCue, updatedCueIndex) => {
  return function (dispatch) {
    return dispatch(updateTacksIA(updatedCue, updatedCueIndex))
  }
}

export const updateTacksIA = (updatedCue, updatedCueIndex) => {
  return {
    type: 'UPDATE_CUES_IA',
    index: updatedCueIndex,
    updatedCue
  };
}

export const saveIAcue = (selectedCue) => {
  fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/update/${selectedCue.cue_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({updatedCue: selectedCue})
  })
  .then(response => response)
  .then(json => {
    console.log(117, json) // logging the server response
  })
  .catch(error =>
    !error
      ? console.log(121, 'done')
      : console.log(122, error)
  )
}

// ==============================================================================================================
// CLEAR
// ==============================================================================================================

export const handleClearIAcues = () => (dispatch) => {
  return dispatch(clearIAcues()) & dispatch(initializeSelectedLibrary([], 'independent-artists'));
}

export const clearIAcues = () => ({ type: 'CLEAR_IA_CUES' });

// ==============================================================================================================
// EXPORTS ACTIONS
// ==============================================================================================================
export const tracksExportIA = () => {
  return (dispatch) => {
    dispatch(tracksAreLoading(true));
    fetch('https://react-metadata-beta.herokuapp.com/api/exports/tracksIA/')
      .then(response => {
        !response.ok ? Error(response.statusText) : null ;
        dispatch(tracksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(tracks => {
        console.log(`fetched ${tracks.data.length} tracks`)
        dispatch(trackFetchDataSuccess(tracks.data)) & dispatch(initializeSelectedLibrary(tracks.data, 'independent-artists'))
      })
      .catch(() => dispatch(trackFetchError(true)))
  }
}

export const fetchIAExportsFromRelease = (releaseID) => {
  // console.log(158, 'releaseID', releaseID);
  return (dispatch) => {
    dispatch(tracksAreLoading(true));
    fetch(`https://react-metadata-beta.herokuapp.com/api/exports/tracksIA/rel/${releaseID}`)
      .then(response => {
        !response.ok ? Error(response.statusText) : null ;
        dispatch(tracksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(tracks => {
        console.log(`fetched ${tracks.data.length} tracks`)
        dispatch(trackFetchDataSuccess(tracks.data)) & dispatch(initializeSelectedLibrary(tracks.data, 'independent-artists'))
      })
      .catch(() => dispatch(trackFetchError(true)));
  }
}


// ==============================================================================================================
