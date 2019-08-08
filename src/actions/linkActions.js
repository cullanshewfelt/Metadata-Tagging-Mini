// ==============================================================================================================
// CATEGORIES LINKS
// ==============================================================================================================

export const initCatLink = (oldCatId) => (dispatch, getState) => {
  let { selectedCategories } = getState();
  let oldCategoryLink = (typeof (oldCatId) === 'number') ? selectedCategories.find(cat => cat.cat_id === oldCatId) : '';
  oldCategoryLink = oldCategoryLink ? oldCategoryLink.cat_name.replace(/\s/g, '%20') : '';
  dispatch(setOldCatLink(oldCategoryLink)) & dispatch(changeCatLink(oldCategoryLink))
}

const setOldCatLink = (oldCategoryLink) => ({ type: 'SET_OLD_CAT_LINK', oldCategoryLink });

export const handleCategoryChange = (newCategory) => (dispatch, getState) => {
  let newCategoryLink = newCategory.cat_name.replace(/\s/g, '%20');
  dispatch(changeCatLink(newCategoryLink))
}

const changeCatLink = (newCategoryLink) => ({ type: 'SET_NEW_CAT_LINK', newCategoryLink });

export const clearCatLink = () => ({ type: 'CLEAR_CAT_LINKS' });


// ==============================================================================================================
// STYLE LINKS
// ==============================================================================================================

export const initStyleLink = (oldStyleId) => (dispatch, getState) => {
  let { selectedStyles } = getState();
  let oldStyleLink = (typeof (oldStyleId) === 'number') ? selectedStyles.find(style => style.style_id === oldStyleId) : '';
  oldStyleLink = oldStyleLink ? oldStyleLink.style_name.replace(/\s/g, '%20') : '';
  dispatch(setOldStyleLink(oldStyleLink)) & dispatch(changeStyleLink(oldStyleLink))
}

const setOldStyleLink = (oldStyleLink) => ({ type: 'SET_OLD_STYLE_LINK', oldStyleLink });

export const handleStyleChange = (newStyle) => (dispatch, getState) => {
  let newStyleLink = newStyle.style_name.replace(/\s/g, '%20');
  dispatch(changeStyleLink(newStyleLink))
}

const changeStyleLink = (newStyleLink) => ({ type: 'SET_NEW_STYLE_LINK', newStyleLink });

export const clearStyleLink = () => ({ type: 'CLEAR_STYLE_LINKS' });


// ==============================================================================================================
// EXPRESS DISPATCHES TO HANDLE FILE SYSTEM PROTOCOLS
// ==============================================================================================================
// BI EXPRESS ROUTES
// ==============================================================================================================

export const handleSaveBILinks = () => (dispatch, getState) => {
  const { catLink, styleLink } = getState();
  // console.log(55, catLink.oldCategoryLink)
  // console.log(56, styleLink.oldStyleLink)
  if(styleLink.oldStyleLink || catLink.oldCategoryLink){
    dispatch(moveBILinks());
  } else {
    dispatch(saveBINewLinks());
  }
}

export const saveBINewLinks = () => (dispatch, getState) => {
  const { catLink, modal, styleLink } = getState();
  const { selectedCue } = modal;
  fetch(`https://react-metadata-beta.herokuapp.com/move/init-BI/${catLink.newCategoryLink}/${styleLink.newStyleLink}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selectedCue: selectedCue})
  })
    .then(response => response)
    .then(json => {
      // console.log(77, json) // DO SOMETHING
      dispatch(setOldCatLink(catLink.newCategoryLink)) &
      dispatch(setOldStyleLink(styleLink.newStyleLink))
    })
    .catch(error =>
      !error
        ? console.log(83, 'done')
        : console.log(84, error)
    )
}

export const moveBILinks = () => (dispatch, getState) => {
  const { catLink, modal, styleLink } = getState();
  const { selectedCue } = modal;
  const catURI = `${catLink.oldCategoryLink}+${catLink.newCategoryLink}`;
  const styleURI = `${styleLink.oldStyleLink}+${styleLink.newStyleLink}`;
  fetch(`https://react-metadata-beta.herokuapp.com/move/BI/${catURI}/${styleURI}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selectedCue: selectedCue})
  })
    .then(response => response)
    .then(json => {
      // console.log(103, json) // DO SOMETHING
      dispatch(setOldCatLink(catLink.newCategoryLink)) &
      dispatch(setOldStyleLink(styleLink.newStyleLink))
    })
    .catch(error =>
      !error
        ? console.log(109, 'done')
        : console.log(110, error)
    )
}

// ==============================================================================================================
// IA EXPRESS ROUTES
// ==============================================================================================================

export const handleSaveIALinks = () => (dispatch, getState) => {
  const { catLink, styleLink } = getState();
  console.log(120, catLink.oldCategoryLink)
  console.log(121, styleLink.oldStyleLink)
  if(styleLink.oldStyleLink || catLink.oldCategoryLink){
    dispatch(moveIALinks());
  } else {
    dispatch(saveIANewLinks());
  }
}

export const saveIANewLinks = () => (dispatch, getState) => {
  const { catLink, modal, styleLink } = getState();
  const { selectedCue } = modal;
  fetch(`https://react-metadata-beta.herokuapp.com/move/init-IA/${catLink.newCategoryLink}/${styleLink.newStyleLink}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selectedCue: selectedCue})
  })
    .then(response => response)
    .then(json => {
      // console.log(142, json) // DO SOMETHING
      dispatch(setOldCatLink(catLink.newCategoryLink)) &
      dispatch(setOldStyleLink(styleLink.newStyleLink))
    })
    .catch(error =>
      !error
        ? console.log(148, 'done')
        : console.log(149, error)
    )
}

export const moveIALinks = () => (dispatch, getState) => {
  const { catLink, modal, styleLink } = getState();
  const { selectedCue } = modal;
  const catURI = `${catLink.oldCategoryLink}+${catLink.newCategoryLink}`;
  const styleURI = `${styleLink.oldStyleLink}+${styleLink.newStyleLink}`;
  fetch(`https://react-metadata-beta.herokuapp.com/move/IA/${catURI}/${styleURI}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({selectedCue: selectedCue})
  })
    .then(response => response)
    .then(json => {
      console.log(168, json) // DO SOMETHING
      dispatch(setOldCatLink(catLink.newCategoryLink)) &
      dispatch(setOldStyleLink(styleLink.newStyleLink))
    })
    .catch(error =>
      !error
        ? console.log(174, 'done')
        : console.log(175, error)
    )
}








// ==============================================================================================================
