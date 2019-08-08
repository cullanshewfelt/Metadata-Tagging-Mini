// ==============================================================================================================
// KEYWORDS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let keywordsReducersDefaultState = [];

export default (state = keywordsReducersDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_IA_MASTER_KEYWORDS":
    return action.masterKeywordsIA;
  case "SELECT_IA_MASTER_KEYWORDS":
    return action.masterKeywordsIA;
  case "CLEAR_IA_MASTER_KEYWORDS":
    return action.masterKeywordsIA;
  case "UPDATE_MASTER_KEYWORD_IA":
    return [...state].map(keyword =>
      keyword.key_id === action.updatedMasterKeyword.key_id ?
        { ...action.updatedMasterKeyword } :
        { ...keyword }
    );
  case "ADD_IA_MASTER_KEYWORDS":
    return action.masterKeywordsIA;
  default:
    return state;
  }
};
