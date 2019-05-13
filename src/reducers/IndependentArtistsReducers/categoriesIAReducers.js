// ==============================================================================================================
// IA CATEGORIES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let iaCategoriesReducerDefaultState = []

export default (state = iaCategoriesReducerDefaultState, action) => {
  switch (action.type) {
    case 'INITIALIZE_IA_CATEGORIES':
      return action.categoriesIA;
    case 'SELECT_IA_CATEGORY':
      return action.categoriesIA;
    default:
      return state;
  }
};
