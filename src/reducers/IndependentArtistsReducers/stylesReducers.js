// ==============================================================================================================
// IA STYLES REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let stylesIAReducersDefaultState = []

export default (state = stylesIAReducersDefaultState, action) => {
  switch (action.type) {
    case 'INITIALIZE_IA_STYLES':
      return action.styles;
    default:
      return state;
  }
};
