
// ==============================================================================================================
//  SELECTED STYLES ACTIONS
// ==============================================================================================================

export const initializeSelectedStyles = (styles) => {
    return ({
      type: 'INITIALIZE_SELECTED_STYLES',
      selectedStyles: styles
    })
}

export const selectStyle = (styles) => ({
  type: 'SELECT_STYLE',
  selectedStyles: styles
})

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedStyles = (styles) => {
  for (let sty in styles) {
    styles[sty].selected = false
  }
  return({
    type: 'CLEAR_SELECTED_STYLES',
    selectedStyles: styles
  })
}
