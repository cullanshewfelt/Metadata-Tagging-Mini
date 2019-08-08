// ==============================================================================================================
// SELECTED STYLES REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let selectedStylesDefaultState = [];


export default (state = selectedStylesDefaultState, action) => {
  switch(action.type){
  case "INITIALIZE_SELECTED_STYLES":
    return action.selectedStyles;
  case "SELECT_STYLE":
    return [...state].map(style => {
      return action.newSelectedStyleId === style.style_id
        ? { ...style, selected: true }
        : { ...style, selected: false };
    });
  case "CLEAR_SELECTED_STYLES":
    return [...state].map(styles => {
      return { ...styles, selected: false };
    });
  default:
    return state;
  }
};
