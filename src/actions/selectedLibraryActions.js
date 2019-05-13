
// ==============================================================================================================
//  SELECTED LIBRARY ACTIONS
// ==============================================================================================================

export const initializeSelectedLibrary = (data, libraryName) => {
    // console.log(7, data)
    return ({
    type: 'INITIALIZE_SELECTED_LIBRARY',
    selectedLibrary:
      {
        libraryName: libraryName,
        library: data
      }
});
}
// export const updateTracks = (updatedTrack, tracks) => {
//   let updatedTrackIndex = tracks.map(track => track.cue_id).findIndex(id => id === updatedTrack.cue_id)
//   tracks[updatedTrackIndex] = updatedTrack;
//   return({
//   type: 'UDPADTE_TRACKS',
//   tracks: tracks
// });}
