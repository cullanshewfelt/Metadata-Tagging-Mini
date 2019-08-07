// ==============================================================================================================
// IA CATEGORIES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let iaCategoriesReducerDefaultState = []

export default (state = iaCategoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'INITIALIZE_IA_CATEGORIES':
      return action.categoriesIA;
    case 'UPDATE_CATEGORIES_IA':
      return [...state].map(cat => {
        return action.newCatId === cat.cat_id
          ? { ...cat, selected: true }
          : { ...cat, selected: false }
      });
    default:
      return state;
  }
};
