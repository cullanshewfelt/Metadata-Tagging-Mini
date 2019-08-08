// ==============================================================================================================
// KEYWORDS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let keywordsReducersDefaultState = [];

export default (state = keywordsReducersDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_SELECTED_KEYWORDS":
    return  action.selectedKeywords;
  case "UPDATE_SELECTED_KEYWORD":
    return [...state].map(keyword =>
      keyword.keyword_id === action.updatedKeyword.keyword_id ?
        { ...keyword, key_cnt: action.updatedKeyword.key_cnt, selected: action.updatedKeyword.selected } :
        { ...keyword }
    );
  case "CLEAR_SELECTED_KEYWORDS":
    return [...state].map(keyword => ({...keyword, selected: false}));
  default:
    return state;
  }
};
