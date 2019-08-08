// ==============================================================================================================
// CUES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let trackReducerDefaultState = []

// export default (state = trackReducerDefaultState, action) => {
//  switch(action.type){
//    case 'INITIALIZE_TRACKS':
//    // array spreading, we are adding the new track to the previous track state without changing the original state
//      return action.tracks;
//   case 'UDPADTE_TRACKS':
//     return action.tracks;
//    default:
//      return state;
//    }
// };

export function trackFetchError(state = false, action) {
    switch (action.type) {
        case 'TRACK_FETCH_HAS_ERRORED':
            return action.hasErrored;
        default:
            return state;
    }
}

export function trackFetchIsLoading(state = false, action) {
    switch (action.type) {
        case 'TRACK_FETCH_IS_LOADING':
            return action.isLoading;
        default:
            return state;
    }
}

export function tracks(state = [], action) {
  switch (action.type) {
    case 'TRACK_FETCH_DATA_SUCCESS':
      return action.items;
    case 'CLEAR_IA_CUES':
      return [];
    default:
      return [...state];
  }
}
