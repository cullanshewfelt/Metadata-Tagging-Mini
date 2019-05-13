
// ==============================================================================================================
//  SELECTED INSTRUMENTS ACTIONS
// ==============================================================================================================

export const initializeSelectedInstruments = (data) => {
    return ({
    type: 'INITIALIZE_SELECTED_INSTRUMENTS',
    selectedInstruments: data
    })
}

export const selectInstruments = (data) => ({
  type: 'SELECT_INSTRUMENT',
  selectedInstruments: data
})

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedInstruments = (instruments) => {
  for (let key in instruments) {
    instruments[key].selected = false
  }
  return({
  type: 'CLEAR_SELECTED_INSTRUMENTS',
  selectedInstruments: instruments
})
}
