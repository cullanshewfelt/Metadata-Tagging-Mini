import { handleStyleChange } from "./linkActions";
import { handleUpdateModal } from "./modalActions";
// import { handleUpdateStylesBI } from './BackgroundInstrumentalsActions/stylesActions';
import { handleUpdateStylesIA } from "./IndieArtistsActions/stylesActions";
import { handleUpdateMasterKeyword, updateSelectedMasterKeyword } from "./selectedMasterKeysActions";


// ==============================================================================================================
//  SELECTED STYLES ACTIONS
// ==============================================================================================================

export const initializeSelectedStyles = (selectedStyles) => ({ type: "INITIALIZE_SELECTED_STYLES", selectedStyles });

export const handleSelectStyle = (newStyle) => {
  return function (dispatch, getState){
    const selectedCue = getState().modal.selectedCue;
    const oldStyleID = selectedCue.style_id;
    const newStyleId = selectedCue.style_id !== newStyle.style_id ? newStyle.style_id : 147;
    const updatedCue = { ...selectedCue, style_id: newStyleId };

    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      // return dispatch(handleUpdateModal(updatedCue))
      // & dispatch(selectStyle(newStyleId))
      // & dispatch(handleUpdateStylesBI(newStyleId)) 
      // & dispatch(handleStyleToMasterKey(newStyle, oldStyleID))
      // & dispatch(handleStyleChange(newStyle))
    case "independent-artists":
      return dispatch(handleUpdateModal(updatedCue))
        & dispatch(selectStyle(newStyleId))
        & dispatch(handleUpdateStylesIA(newStyleId))
        & dispatch(handleStyleToMasterKey(newStyle, oldStyleID))
        & dispatch(handleStyleChange(newStyle));
    }
  };
};

export const selectStyle = (newSelectedStyleId) => ({ type: "SELECT_STYLE", newSelectedStyleId });

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedStyles = () => ({ type: "CLEAR_SELECTED_STYLES" });

export const handleStyleToMasterKey = (newStyle, oldStyleID) => {
  // console.log(37, newStyle)

  const newKeywordArray = newStyle.style_name.split(" ");
  let masterKeywords = [];
  let oldMasterKeywords = [];

  return (dispatch, getState) => {
    const { modal, selectedStyles, selectedLibrary, selectedMasterKeywords } = getState();
    const { selectedCue } = modal;
    let selectedKeyIdArray = selectedCue.key_id_arry !== "" ? selectedCue.key_id_arry.split(",") : [];

    let oldStyle = {};
    let oldMasterKeywordsArray = [];

    if(oldStyleID !== 147){
      oldStyle = selectedStyles.find(style => style.style_id === oldStyleID);
      // console.log(53, oldStyle)
      oldMasterKeywordsArray = oldStyle.style_name.split(" ");
    }

    // if the oldStyle and newCat are the same,
    // then don't pass the newStyle to the master keyword,
    // because that means the user is clicking to remove it.
    if(oldStyleID !== newStyle.style_id){
      switch(newKeywordArray.length){
      case 0:
        break;
      case 1:
        masterKeywords.push(selectedMasterKeywords.find(masterKey =>
          masterKey.key_name.toLowerCase() === newStyle.style_name.toLowerCase()));
        break;
      default:
        masterKeywords = newKeywordArray.filter(newKeyword => newKeyword !== "-").map(keywords =>
          selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase() === keywords.toLowerCase()));
        break;
      }
    }

    switch(oldMasterKeywordsArray.length){
    case 0:
      break;
    case 1:
      oldMasterKeywords.push(selectedMasterKeywords.find(masterKey =>
        masterKey.key_name.toLowerCase() === oldStyle.style_name.toLowerCase()));
      break;
    default:
      oldMasterKeywords = oldMasterKeywordsArray.filter(newKeyword => newKeyword !== "-").map(keywords =>
        selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase() === keywords.toLowerCase()));
      break;
    }

    // console.log(86, 'masterKeywords', masterKeywords);

    masterKeywords.forEach(masterKey => {
      if (!selectedCue.key_id_arry.includes(`${masterKey.key_id}`)) {
        selectedKeyIdArray.push(masterKey.key_id);
        let newKeyIdArray = selectedKeyIdArray.join(",");

        let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
        const updatedMasterKeyword =  { ...masterKey, key_cnt: masterKey.key_cnt + 1 };
        dispatch(handleUpdateModal(updatedCue))
         & dispatch(handleUpdateMasterKeyword(updatedMasterKeyword))
         & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
      } else {
        selectedKeyIdArray.splice(selectedKeyIdArray.indexOf(`${masterKey.key_id}`), 1);
        let newKeyIdArray = selectedKeyIdArray.join(",");

        let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
        const updatedMasterKeyword =  { ...masterKey, key_cnt: masterKey.key_cnt - 1 };
        dispatch(handleUpdateModal(updatedCue))
         & dispatch(handleUpdateMasterKeyword(updatedMasterKeyword))
         & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
      }
    });

    // console.log(108, 'oldMasterKeywords', oldMasterKeywords);

    oldMasterKeywords.forEach(masterKey => {
      if (selectedCue.key_id_arry.includes(`${masterKey.key_id}`)) {
        selectedKeyIdArray.splice(selectedKeyIdArray.indexOf(`${masterKey.key_id}`), 1);
        let newKeyIdArray = selectedKeyIdArray.join(",");
        let updatedCue = { ...selectedCue, key_id_arry: newKeyIdArray };
        const updatedMasterKeyword =  { ...masterKey, key_cnt: masterKey.key_cnt - 1 };
        dispatch(handleUpdateModal(updatedCue))
         & dispatch(handleUpdateMasterKeyword(updatedMasterKeyword))
         & dispatch(updateSelectedMasterKeyword(updatedMasterKeyword));
      }
    });

  };
};
