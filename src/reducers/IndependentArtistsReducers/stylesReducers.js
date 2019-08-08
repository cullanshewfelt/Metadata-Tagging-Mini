// ==============================================================================================================
// IA STYLES REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let stylesIAReducersDefaultState = [];

export default (state = stylesIAReducersDefaultState, action) => {
  switch (action.type) {
  case "INITIALIZE_IA_STYLES":
    return action.styles;
  case "UPDATE_STYLES_IA":
    return [...state].map(style => {
      return action.newStyleId === style.style_id
        ? { ...style, selected: true }
        : { ...style, selected: false };
    });
  default:
    return state;
  }
};
