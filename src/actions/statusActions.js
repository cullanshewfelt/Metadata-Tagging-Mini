// export const handleSelectStatus = (newStatus) => {
//   return function (dispatch, getState) {
//     let selectedCue = getState().modal.selectedCue;
//     let updatedCue = { ...selectedCue, cue_status: newStatus.value };
//     return dispatch(selectStatus(newStatus.value)) & dispatch(handleUpdateModal(updatedCue))
//   }
// }

export const selectStatus = (newStatus) => {
  return({ type: "SET_STATUS", newStatus });};

export const clearStatus = () => ({ type: "CLEAR_STATUS" });
