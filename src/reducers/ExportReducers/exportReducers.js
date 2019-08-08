// ==============================================================================================================
// EXPORT REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let exportReducerDefaultState =  (0).toFixed(2);
export default (state = exportReducerDefaultState, action) => {
  switch (action.type) {
  case "RESET_DL_PROGRESS":
    return action.downloadProgress;
  case "UPDATE_DL_PROGRESS":
    // console.log(11, action.downloadProgress)
    return action.downloadProgress;
  default:
    return state;
  }
};
