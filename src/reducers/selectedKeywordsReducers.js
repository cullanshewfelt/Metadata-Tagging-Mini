// ==============================================================================================================
// KEYWORDS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let keywordsReducersDefaultState = []

export default (state = keywordsReducersDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_SELECTED_KEYWORDS':
      return  action.selectedKeywords;
    case 'SELECT_KEYWORDS':
      return action.selectedKeywords;
    case 'CLEAR_SELECTED_KEYWORDS':
      return action.selectedKeywords;
    case 'SAVE_SELECTED_KEYWORDS':
      return action.selectedKeywords;
    default:
     return state;
   }
};
