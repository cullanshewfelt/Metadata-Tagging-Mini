// endpoints: https://react-metadata-beta.herokuapp.com/
// https://localhost:4000/
// ==============================================================================================================
//  TRACK ACTIONS
// ==============================================================================================================
export const asyncTracksFetch = (callback) => {
  return (dispatch) => {
    dispatch(tracksAreLoading(true));
    fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/')
      .then(response => {
        !response.ok ? Error(response.statusText) : null ;
        dispatch(tracksAreLoading(false));
        return response;
      })
      .then(response => response.json())
      .then(tracks => dispatch(trackFetchDataSuccess(tracks.data)) && callback(tracks.data))
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

// export const initializeIATracks = (data) => ({
//     type: 'INITIALIZE_IA_TRACKS',
//     tracks: data
// });

export const updateTracks = (updatedTrack, tracks) => {
  let updatedTrackIndex = tracks.map(track => track.cue_id).findIndex(id => id === updatedTrack.cue_id)
  tracks[updatedTrackIndex] = updatedTrack;
  return({
  type: 'UDPADTE_TRACKS',
  tracks: tracks
});}
