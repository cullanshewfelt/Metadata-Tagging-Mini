import { handleUpdateModal } from './modalActions';


// export const handleSelectStatus = (newStatus) => {
//   return function (dispatch, getState) {
//     let selectedCue = getState().modal.selectedCue;
//     let updatedCue = { ...selectedCue, cue_status: newStatus.value };
//     return dispatch(selectStatus(newStatus.value)) & dispatch(handleUpdateModal(updatedCue))
//   }
// }

export const selectStatus = (newStatus) => {
  return({ type: 'SET_STATUS', newStatus });}

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.

export const clearStatus = () => ({ type: 'CLEAR_STATUS' });
