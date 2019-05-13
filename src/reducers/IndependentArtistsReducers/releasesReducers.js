// ==============================================================================================================
// RELEASES REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let releasesReducersDefaultState = []

export default (state = releasesReducersDefaultState, action) => {
  switch (action.type) {
    case 'INITIALIZE_IA_RELEASES':
      return action.releasesIA;
    default:
      return state;
  }
};
