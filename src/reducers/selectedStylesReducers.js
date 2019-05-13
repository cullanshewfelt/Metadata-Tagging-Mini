// ==============================================================================================================
// SELECTED STYLES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedStylesDefaultState = []


export default (state = selectedStylesDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_SELECTED_STYLES':
     return action.selectedStyles;
   case 'SELECT_STYLE':
     return action.selectedStyles;
   case 'CLEAR_SELECTED_STYLES':
     return action.selectedStyles;
   default:
     return state;
   }
};
