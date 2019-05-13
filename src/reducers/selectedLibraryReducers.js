// ==============================================================================================================
// SELECTED LIBRARY REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedLibraryReducerDefaultState =       {
        libraryName: '',
        library: []
      }

export default (state = selectedLibraryReducerDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_SELECTED_LIBRARY':
     return action.selectedLibrary;
   default:
     return state;
   }
};
