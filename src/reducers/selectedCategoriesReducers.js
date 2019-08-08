// ==============================================================================================================
// SELECTED CATEGORIES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedCategoriesDefaultState = [];


export default (state = selectedCategoriesDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_SELECTED_CATEGORIES":
    return action.selectedCategories;
  case "SELECT_CATEGORY":
    return [...state].map(cat => {
      return action.newCatId === cat.cat_id
        ? { ...cat, selected: true }
        : { ...cat, selected: false };
    });
  case "CLEAR_SELECTED_CATEGORIES":
    return [...state].map(cat => {
      return { ...cat, selected: false };
    });
  default:
    return state;
  }
};
