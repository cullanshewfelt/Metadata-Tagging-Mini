
// ==============================================================================================================
//  SELECTED KEYWORDS ACTIONS
// ==============================================================================================================

export const initializeSelectedKeywords = (keywords) => {
    return ({
    type: 'INITIALIZE_SELECTED_KEYWORDS',
    selectedKeywords: keywords
    })
}

export const selectKeywords = (keywords) => ({
    type: 'SELECT_KEYWORD',
    selectedKeywords: keywords
})

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedKeywords = (keywords) => {
  for (let key in keywords) {
    keywords[key].selected = false
  }
  return({
    type: 'CLEAR_SELECTED_KEYWORDS',
    selectedKeywords: keywords
  })
}

export const saveKeyword = (keywords) => {
  return({
    type: 'SAVE_SELECTED_KEYWORDS',
    selectedKeywords: keywords
  })
}
