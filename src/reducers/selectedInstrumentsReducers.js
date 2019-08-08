// ==============================================================================================================
// SELECTED INSTRUMENTS REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedInstrumentsDefaultState = []

export default (state = selectedInstrumentsDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_SELECTED_INSTRUMENTS':
      return action.selectedInstruments;
    case 'UPDATE_SELECTED_INSTRUMENT':
      return [...state].map(instrument =>
          instrument.instru_id === action.updatedInstrument.instru_id ?
            { ...instrument, instru_cnt: action.updatedInstrument.instru_cnt, selected: action.updatedInstrument.selected } :
            { ...instrument }
      );
    case 'CLEAR_SELECTED_INSTRUMENTS':
      return [...state].map(inst => ({...inst, selected: false}));
    default:
      return state;
  }
};
