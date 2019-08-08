// ==============================================================================================================
// SELECTED MASTER KEYWORDS REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedMasterKeywordsDefaultState = []

export default (state = selectedMasterKeywordsDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_SELECTED_MASTER_KEYWORDS':
      return action.selectedMasterKeywords;
    case 'UPDATED_SELECTED_MASTER_KEYWORD':
      return [...state].map(keyword =>
        keyword.key_id === action.updatedMasterKeyword.key_id ?
          { ...keyword, key_cnt: action.updatedMasterKeyword.key_cnt } :
          { ...keyword }
        );
    default:
      return state;
  }
};
