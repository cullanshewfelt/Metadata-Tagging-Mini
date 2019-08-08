// ==============================================================================================================
// KEYWORDS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let keywordsReducersDefaultState = [];

export default (state = keywordsReducersDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_IA_KEYWORDS":
    return action.keywordsIA;
  case "SELECT_IA_KEYWORDS":
    return action.keywordsIA;
  case "CLEAR_IA_KEYWORDS":
    return action.keywordsIA;
  case "UPDATE_KEYWORD_IA":
    return [...state].map(keyword => {
      return action.updatedKeyword.keyword_id === keyword.keyword_id
        ? { ...keyword, key_cnt: action.updatedKeyword.key_cnt }
        : { ...keyword };
    });
  default:
    return state;
  }
};
