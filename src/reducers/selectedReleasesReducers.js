

// ==============================================================================================================
// SELECTED COMPOSER REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedReleasesDefaultState = []


export default (state = selectedReleasesDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_SELECTED_RELEASES':
     return action.selectedReleases;
   default:
     return state;
   }
};
