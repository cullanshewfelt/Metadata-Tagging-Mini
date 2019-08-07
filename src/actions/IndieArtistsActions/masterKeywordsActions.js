// INITIALIZE_KEYWORDS
export const initializeMasterKeywordsIA = (masterKeywordsIA) => ({ type: 'INITIALIZE_IA_MASTER_KEYWORDS', masterKeywordsIA });

export const selectMasterKeywordsIA = (masterKeywordsIA) => ({ type: 'SELECT_IA_MASTER_KEYWORDS', masterKeywordsIA });

export const clearMasterKeywordsIA = (masterKeywordsIA) => ({ type: 'CLEAR_IA_MASTER_KEYWORDS', masterKeywordsIA });

export const updateMasterKeywordIA = (updatedMasterKeyword) => {
  // console.log(20, updatedMasterKeyword)
  fetch(`http://localhost:4000/api/independent-artists/masterKeywordsIA/update/${updatedMasterKeyword.key_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({keyword: updatedMasterKeyword})
  })
  .then(response => response)
  .then(json => {
    // console.log(27, json)
  })
  .catch( error =>
    !error
    ? console.log('done')
    : console.log(32, error)
  )
  return ({
    type: 'UPDATE_MASTER_KEYWORD_IA',
    updatedMasterKeyword
  })
}

export const addMasterKeywordIA = (keywordQuery, keywords, cb) => {
  let newKeyword;
  fetch(`http://localhost:4000/api/independent-artists/masterKeywordsIA/new`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({keyword: keywordQuery})
  })
  .then(response => response)
  .then(json => {
    newKeyword = JSON.parse(json.statusText);
    cb(newKeyword);
  })
  .catch( error =>
    !error
    ? console.log('done')
    : console.log(error)
  )
  return({
    type: 'ADD_IA_MASTER_KEYWORDS',
    masterKeywordsIA: [...keywords, newKeyword]
  })
}

// masterkeys are handled as Arrays because there can be more than one being edited at a time
export const handleUpdateMasterKeysIA = (newMasterKeywords) => {
  // console.log(72, 'masterKeywordActions.handleUpdateMasterKeysIA.newMasterKeywords', newMasterKeywords)

  return (dispatch) => {
    return dispatch(updateMasterKeywordIA(newMasterKeywords))

  }
}
