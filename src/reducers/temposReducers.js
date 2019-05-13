// ==============================================================================================================
// TEMPOS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let temposReducersDefaultState = []

export default (state = temposReducersDefaultState, action) => {
 switch(action.type){
   case 'INITIALIZE_TEMPOS':
   // array spreading, we are adding the new cue to the previous cue state without changing the original state
     return action.tempos;
  case 'SELECT_TEMPOS':
    return action.tempos;
  case 'CLEAR_TEMPOS':
    return action.tempos;
   default:
     return state;
   }
};
