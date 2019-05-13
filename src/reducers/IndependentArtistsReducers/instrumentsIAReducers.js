// ==============================================================================================================
// INSTRUNMENTS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let instrumentsReducersDefaultState = []

export default (state = instrumentsReducersDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_IA_INSTRUMENTS':
      return  action.instrumentsIA;
    case 'SELECT_IA_INSTRUMENTS':
      return action.instrumentsIA;
    case 'CLEAR_IA_INSTRUMENTS':
      return action.instrumentsIA;
     default:
     return state;
   }
};
