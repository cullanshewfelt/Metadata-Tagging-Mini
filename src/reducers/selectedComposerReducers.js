// ==============================================================================================================
// SELECTED COMPOSER REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedComposersDefaultState = []


export default (state = selectedComposersDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_SELECTED_COMPOSER':
     return action.selectedComposers;
   default:
     return state;
   }
};
