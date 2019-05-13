
export const updateData = (modal, updatedCue) => ({
  type: 'UPDATE_DATA',
  modal: {
    ...modal,
    selectedCue: updatedCue,
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
})
