// ==============================================================================================================
// SELECTED CATEGORIES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedCategoriesDefaultState = []


export default (state = selectedCategoriesDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_SELECTED_CATEGORIES':
     return action.selectedCategories;
   case 'SELECT_CATEGORY':
     return action.selectedCategories;
   case 'CLEAR_SELECTED_CATEGORIES':
     return action.selectedCategories;
   default:
     return state;
   }
};
