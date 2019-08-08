import { handleCategoryChange } from "./linkActions";
import { handleUpdateModal } from "./modalActions";
import { handleUpdateCategoriesIA } from "./IndieArtistsActions/categoriesActions";
import { handleUpdateMasterKeyword, updateSelectedMasterKeyword } from "./selectedMasterKeysActions";
// ==============================================================================================================
//  SELECTED CATEGORIES ACTIONS
// ==============================================================================================================

export const initializeSelectedCategories = (selectedCategories) =>  ({ type: "INITIALIZE_SELECTED_CATEGORIES", selectedCategories });

export const handleSelectCategory = (newCategory) => {
  return function (dispatch, getState) {
    const selectedCue = getState().modal.selectedCue;
    const oldCatId = selectedCue.cat_id;
    const newCatId = oldCatId !== newCategory.cat_id ? newCategory.cat_id : 19;
    const updatedCue = { ...selectedCue, cat_id: newCatId };

    switch(getState().selectedLibrary.libraryName){
    case "background-instrumentals":
      // return dispatch(handleUpdateModal(updatedCue))
      // & dispatch(selectCategory(newCatId))
      // & dispatch(handleCategoryToMasterKey(newCategory, oldCatId))
      // & dispatch(handleCategoryChange(newCategory));
      break;
    case "independent-artists":
      return dispatch(handleUpdateModal(updatedCue))
        & dispatch(selectCategory(newCatId))
        & dispatch(handleUpdateCategoriesIA(newCatId))
        & dispatch(handleCategoryToMasterKey(newCategory, oldCatId))
        & dispatch(handleCategoryChange(newCategory));
    }
  };
};

export const selectCategory = (newCatId) => ({ type: "SELECT_CATEGORY", newCatId });

// when the modal closes we want to turn all selected
// metadata to false so they don't appear highlighted when the
// user goes to edit the metadata of the next track.
export const clearSelectedCategories = () => ({ type: "CLEAR_SELECTED_CATEGORIES" });

export const handleCategoryToMasterKey = (newCategory, oldCatID) => {
  // console.log(44, newCategory)

  const newKeywordArray = newCategory.cat_name.split(" ");
  let masterKeywords = [];
  let oldMasterKeywords = [];

  return (dispatch, getState) => {
    const { modal, selectedCategories, selectedMasterKeywords } = getState();
    const { selectedCue } = modal;
    let selectedKeyIdArray = selectedCue.key_id_arry !== "" ? selectedCue.key_id_arry.split(",") : [];

    let oldCat = {};
    let oldMasterKeywordsArray = [];

    if(oldCatID !== 19){
      oldCat = selectedCategories.find(cat => cat.cat_id === oldCatID);
      oldMasterKeywordsArray = oldCat.cat_name.split(" ");
    }

    // if the oldCat and newCat are the same,
    // then don't pass the newCategory to the master keyword,
    // because that means the user is clicking to remove it.
    if(oldCatID !== newCategory.cat_id){
      switch(newKeywordArray.length){
      case 0:
        break;
      case 1:
        masterKeywords.push(selectedMasterKeywords.find(masterKey =>
          masterKey.key_name.toLowerCase().trim() === newCategory.cat_name.toLowerCase().trim()));
        break;
      default:
        masterKeywords = newKeywordArray.filter(newKeyword => newKeyword !== "-").map(keywords =>
          selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase().trim() === keywords.toLowerCase().trim()));
        break;
      }
    }

    switch(oldMasterKeywordsArray.length){
    case 0:
      break;
    case 1:
      oldMasterKeywords.push(selectedMasterKeywords.find(masterKey =>
        masterKey.key_name.toLowerCase() === oldCat.cat_name.toLowerCase()));
      break;
    default:
      oldMasterKeywords = oldMasterKeywordsArray.filter(oldKeyword => oldKeyword !== "-").map(keywords =>
        selectedMasterKeywords.find(masterKey => masterKey.key_name.toLowerCase().trim() === keywords.toLowerCase().trim()));
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

    // console.log(117, 'oldMasterKeywords', oldMasterKeywords);

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
