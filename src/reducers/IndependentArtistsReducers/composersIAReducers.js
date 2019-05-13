// ==============================================================================================================
// ARTISTS REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let composersIAReducerDefaultState = []

export default (state = composersIAReducerDefaultState, action) => {

 switch(action.type){
   case 'INITIALIZE_IA_COMPOSERS':
   // array spreading, we are adding the new cue to the previous cue state without changing the original state
     return action.composersIA;
   default:
     return state;
   }
};
