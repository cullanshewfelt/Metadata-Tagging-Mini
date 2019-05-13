// TEMPO_INITIALIZE
export const initializeTempos = (tempos) => ({
    type: 'INITIALIZE_TEMPOS',
    tempos: tempos
});

export const selectTempos = (tempos) =>{
  return({
    type: 'SELECT_TEMPOS',
    tempos: tempos
  })
}

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearTempos = (tempos) => {
  for (let t in tempos) {
    tempos[t].selected = false
  }
  return({
    type: 'CLEAR_TEMPOS',
    tempos: tempos
  })
}
