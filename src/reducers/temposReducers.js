// ==============================================================================================================
// TEMPOS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let temposReducersDefaultState = []

export default (state = temposReducersDefaultState, action) => {
  switch(action.type){
    case 'INITIALIZE_TEMPOS':
      return action.tempos;
    case 'SELECT_TEMPOS':
      return [...state].map(tempo => {
        return action.newTempoId === tempo.tempo_id
          ? { ...tempo, selected: true }
          : { ...tempo, selected: false }
      });
    case 'CLEAR_TEMPOS':
      return [...state].map(tempo => ({...tempo, selected: false}));
    default:
      return state;
   }
};
