// ==============================================================================================================
// SELECTED LIBRARY REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedLibraryReducerDefaultState =       {
  libraryName: "",
  library: []
};

export default (state = selectedLibraryReducerDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_SELECTED_LIBRARY":
    return { ...state, library: action.library, libraryName: action.libraryName };
  case "UPDATE_SELECTED_LIBRARY":
    return {
      libraryName: action.libraryName,
      library : [...state.library].map((cue, index) => {
        return index !== action.index
          ? cue
          : action.updatedCue;
      }
      )};
  default:
    return state;
  }
};
