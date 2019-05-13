// ==============================================================================================================
// SELECTED INSTRUMENTS REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedInstrumentsDefaultState = []


export default (state = selectedInstrumentsDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_SELECTED_INSTRUMENTS':
      return action.selectedInstruments;
    case 'SELECT_INSTRUMENT':
      return action.selectedInstruments;
    case 'CLEAR_SELECTED_INSTRUMENTS':
      return action.selectedInstruments;
    default:
      return state;
  }
};
