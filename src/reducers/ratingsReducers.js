// ==============================================================================================================
// RATINGS REDUCERS
// ==============================================================================================================
// reducers take our state, an action, and return a new state
let ratingsReducersDefaultState = [{
  value: 10,
  selected: false
}, {
  value: 9,
  selected: false
}, {
  value: 8,
  selected: false
}, {
  value: 7,
  selected: false
}, {
  value: 6,
  selected: false
}, {
  value: 5,
  selected: false
},{
  value: 4,
  selected: false
},{
  value: 3,
  selected: false
},{
  value: 2,
  selected: false
},{
  value: 1,
  selected: false
}
];

export default (state = ratingsReducersDefaultState, action) => {
  switch (action.type) {
  case "INITIALIZE_RATINGS":
    return action.ratings;
  case "SET_RATING":
    return [...state].map(rating =>
      rating.value === action.newRatingValue
        ? { ...rating, selected: true }
        : { ...rating, selected: false }
    );
  case "CLEAR_RATING":
    return [...state].map(rating => ({ ...rating, selected: false }));
  default:
    return state;
  }
};
