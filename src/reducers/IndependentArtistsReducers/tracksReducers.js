// ==============================================================================================================
// TRACKS REDUCER
// ==============================================================================================================

export function trackFetchError(state = false, action) {
  switch (action.type) {
  case "TRACK_FETCH_HAS_ERRORED":
    return action.hasErrored;
  default:
    return state;
  }
}

export function trackFetchIsLoading(state = false, action) {
  switch (action.type) {
  case "TRACK_FETCH_IS_LOADING":
    return action.isLoading;
  default:
    return state;
  }
}

export function tracks(state = [], action) {
  switch (action.type) {
  case "TRACK_FETCH_DATA_SUCCESS":
    return action.items;
  case "CLEAR_IA_CUES":
    return [];
  default:
    return [...state];
  }
}
