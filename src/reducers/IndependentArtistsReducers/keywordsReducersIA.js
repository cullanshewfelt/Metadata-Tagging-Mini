// ==============================================================================================================
// KEYWORDS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let keywordsReducersDefaultState = []

export default (state = keywordsReducersDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_IA_KEYWORDS':
   // array spreading, we are adding the new cue to the previous cue state without changing the original state
      return action.keywordsIA;
    case 'SELECT_IA_KEYWORDS':
      return action.keywordsIA;
    case 'CLEAR_IA_KEYWORDS':
      return action.keywordsIA;
    case 'SAVE_IA_KEYWORDS':
      return action.keywordsIA;
   default:
     return state;
   }
};
