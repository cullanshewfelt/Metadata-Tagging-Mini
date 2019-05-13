// INITIALIZE_RATINGS
export const initializeBIRatings = (data) => ({
    type: 'INITIALIZE_RATINGS',
    ratings: data
});

export const selectRating = (data) => ({
  type: 'SELECT_RATING',
  ratings: data
})

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearRatings = (ratings) => {
  for (let r in ratings) {
    ratings[r].selected = false
  }
  return({
    type: 'CLEAR_RATING',
    ratings: ratings
  })
}
