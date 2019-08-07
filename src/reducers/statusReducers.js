// ==============================================================================================================
// STATUS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let statusReducersDefaultState = [
  {
    label: 'Active',
    selected: false,
    value: 'Active'
  }, {
    label: 'Pulled',
    selected: false,
    value: 'Pulled'
  }, {
    label: 'Pending',
    selected: false,
    value: 'Pending'
  }, {
    label: 'Instrumental Active',
    selected: false,
    value: 'Instrumental_Active'
  }
]

export default (state = statusReducersDefaultState, action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return [...state].map(status =>
        status.value === action.newStatus
          ? { ...status, selected: true }
          : { ...status, selected: false }
      );
    case 'CLEAR_STATUS':
      return [...state].map(status => (
          { ...status, selected: false }
        ));
    default:
      return state;
  }
};
