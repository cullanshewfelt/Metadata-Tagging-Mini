import { handleUpdateModal } from './modalActions';
// import { handleUpdateMasterKeysBI } from './BackgroundInstrumentalsActions/masterKeywordsActions';
import { handleUpdateMasterKeysIA } from './IndieArtistsActions/masterKeywordsActions';

// ==============================================================================================================
//  SELECTED MASTER KEYS ACTIONS
// ==============================================================================================================
export const initializeSelectedMasterKeywords = (selectedMasterKeywords) => ({ type: 'INITIALIZE_SELECTED_MASTER_KEYWORDS', selectedMasterKeywords });

// should only take a string as an argument
export const handleSelectMasterKeyword = (newKeyword) => {
  // console.log(11, 'selectedMasterKeysActions.handleSelectMasterKeyword.newKeyword', newKeyword);

  return (dispatch, getState) => {
    const { modal, selectedLibrary, selectedMasterKeywords } = getState();
    const { selectedCue } = modal;

    const newKeywordArray = newKeyword.includes(',') ? newKeyword.split(', ') : newKeyword.split(' ');
    let masterKeywords = [];

    switch(newKeywordArray.length){
      case 0:
        break;
      case 1:
        masterKeywords.push(selectedMasterKeywords.find(masterKey =>
          masterKey.key_name.toLowerCase() === newKeyword.toLowerCase()));
        break;
      default:
        masterKeywords = newKeywordArray.filter(newKeyword => newKeyword !== '-').map(keywords =>
          selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase().trim() === keywords.toLowerCase().trim()))
        break;
    }

    // console.log(34, 'masterKeywords', masterKeywords);

    let selectedKeyIdArray = selectedCue.key_id_arry !== '' ? selectedCue.key_id_arry.split(',') : [];
    masterKeywords.forEach(masterKey => {
      // console.log(38, '!selectedCue.key_id_arry.includes(`${masterKey.key_id}`)', !selectedCue.key_id_arry.includes(`${masterKey.key_id}`));
      // console.log(39, 'masterKey', masterKey);
      if(masterKey !== undefined){
        // check to see if the newKeyword already exsits in the cue_description
        if (!selectedCue.key_id_arry.includes(`${masterKey.key_id}`)) {
          // if it doesn't, add it to cue_desc and key_id_array

          // also add the masterKeyword.key_id to the keyword_id array
          selectedKeyIdArray.push(masterKey.key_id);
          let newKeyIdArray = selectedKeyIdArray.join(',');

          let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
          const updatedMasterKeyword =  { ...masterKey, key_cnt: masterKey.key_cnt + 1 };
          return dispatch(handleUpdateModal(updatedCue)) & dispatch(handleUpdateMasterKeyword(updatedMasterKeyword));

        } else { // if newKeyword is already in the cue_desc, then they are clicking it again to remove it
          selectedKeyIdArray.splice(selectedKeyIdArray.indexOf(`${masterKey.key_id}`), 1);
          let newKeyIdArray = selectedKeyIdArray.join(',');

          let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
          const updatedMasterKeyword =  { ...masterKey, key_cnt: masterKey.key_cnt - 1 };
          return dispatch(handleUpdateModal(updatedCue)) & dispatch(handleUpdateMasterKeyword(updatedMasterKeyword));
        }
      } else {

      }
    })
  }
}

export const handleUpdateMasterKeyword = (updatedMasterKeyword) => {
  // console.log(64, 'updatedMasterKeyword', updatedMasterKeyword)
  return (dispatch, getState) => {
    switch(getState().selectedLibrary.libraryName){
      case 'background-instrumentals':
        // return dispatch(handleUpdateMasterKeysBI(updatedMasterKeyword)) & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
      case 'independent-artists':
        return dispatch(handleUpdateMasterKeysIA(updatedMasterKeyword)) & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
    }
  }
}

export const handleAddMasterKeyword = (newKeyword) => {
  return (dispatch, getState) => {
    switch(getState().selectedLibrary.libraryName){
      case 'background-instrumentals':
        return
      case 'independent-artists':
        return
    }
  }
}

export const updateSelectedMasterKeyword = (updatedMasterKeyword) => ({ type: 'UPDATED_SELECTED_MASTER_KEYWORD', updatedMasterKeyword })
