// INITIALIZE_IA_INSTRUMENTS
export const initializeIAInstruments = (data) => ({
    type: 'INITIALIZE_IA_INSTRUMENTS',
    instrumentsIA: data
});

export const selectIAInstruments = (instruments) => ({
  type: 'SELECT_IA_INSTRUMENTS',
  instrumentsIA: instruments
})

export const clearIAInstruments = (instruments) => {
  for (let key in instruments) {
    instruments[key].selected = false
  }
  return({
  type: 'CLEAR_IA_INSTRUMENTS',
  instrumentsIA: instruments
})
}
