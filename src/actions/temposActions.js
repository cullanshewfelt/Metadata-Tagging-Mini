import { handleUpdateModal } from "./modalActions";
import { handleUpdateMasterKeyword, updateSelectedMasterKeyword } from "./selectedMasterKeysActions";

// ==============================================================================================================
//  TEMPOS ACTIONS
// ==============================================================================================================

export const initializeTempos = (tempos) => ({
  type: "INITIALIZE_TEMPOS",
  tempos: tempos
});

export const handleSelectTempos = (newTempo) => {
  return function (dispatch, getState) {
    const selectedCue = getState().modal.selectedCue;
    const oldTempoID = selectedCue.tempo_id;

    newTempo = newTempo.tempo_id === selectedCue.tempo_id ? { tempo_id: 28, tempo_name: "" } : newTempo;
    const newTempoId = selectedCue.tempo_id !== newTempo.tempo_id ? newTempo.tempo_id : 28;
    const oldTempo =  getState().tempos.find(tempo => tempo.tempo_id === oldTempoID);

    const updatedCue = { ...selectedCue, tempo_id: newTempoId };
    return dispatch(selectTempos(newTempoId)) & dispatch(handleUpdateModal(updatedCue)) & dispatch(handleTempoToMasterKey(newTempo, oldTempo));
  };
};

export const selectTempos = (newTempoId) => {
  return {
    type: "SELECT_TEMPOS",
    newTempoId: newTempoId
  };
};


// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearTempos = () => ({ type: "CLEAR_TEMPOS" });


export const handleTempoToMasterKey = (newTempo, oldTempo) => {
  return (dispatch, getState) => {
    const { modal, selectedMasterKeywords } = getState();
    const { selectedCue } = modal;
    let selectedKeyIdArray = selectedCue.key_id_arry !== "" ? selectedCue.key_id_arry.split(",") : [];

    let oldMasterKeyword = undefined;

    // whatever tempo was deselected gets removed from the key_id_arry and the key count goes down
    if(oldTempo){
      oldMasterKeyword = selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase() === oldTempo.tempo_name.toLowerCase());
      oldMasterKeyword = { ...oldMasterKeyword, key_cnt: oldMasterKeyword.key_cnt - 1 };
      selectedKeyIdArray.splice(selectedKeyIdArray.indexOf(`${oldMasterKeyword.key_id}`), 1);
    }

    let newMasterKeyword = selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase() === newTempo.tempo_name.toLowerCase());

    // whatever tempo was selected gets added to key_id_arry and the key count goes up
    if (newMasterKeyword){
      newMasterKeyword =  { ...newMasterKeyword, key_cnt: newMasterKeyword.key_cnt + 1 };
      selectedKeyIdArray.push(newMasterKeyword.key_id);
    }

    let newKeyIdArray = selectedKeyIdArray.join(",");
    let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
    let keywordsArray = [oldMasterKeyword, newMasterKeyword];

    dispatch(handleUpdateModal(updatedCue));

    keywordsArray.forEach(updatedMasterKeyword => {
      // console.log(72, updatedMasterKeyword)
      if(updatedMasterKeyword !== undefined){
        dispatch(handleUpdateMasterKeyword(updatedMasterKeyword)) & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
      }
    });
  };
};
