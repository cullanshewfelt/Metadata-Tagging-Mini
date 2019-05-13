
// ==============================================================================================================
//  SELECTED CATEGORIES ACTIONS
// ==============================================================================================================

export const initializeSelectedCategories = (data) => {
    return ({
    type: 'INITIALIZE_SELECTED_CATEGORIES',
    selectedCategories: data
    })
}

export const selectCategory = (data) => ({
  type: 'SELECT_CATEGORY',
  selectedCategories: data
})

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedCategories = (categories) => {
  for (let cat in categories) {
    categories[cat].selected = false
  }
  return({
    type: 'CLEAR_SELECTED_CATEGORIES',
    selectedCategories: categories
  })
}
