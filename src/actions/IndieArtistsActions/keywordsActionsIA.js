// INITIALIZE_KEYWORDS
export const initializeIAKeywords = (data) => ({
    type: 'INITIALIZE_IA_KEYWORDS',
    keywordsIA: data
});

export const selectKeywords = (keywords) => ({
  type: 'SELECT_IA_KEYWORDS',
  keywordsIA: keywords
})

export const clearIAKeywords = (keywords) => ({
  type: 'CLEAR_IA_KEYWORDS',
  keywordsIA: keywords
})


export const saveIAKeyword = (keywordObject, keywords) => {
  fetch(`http://localhost:4000/api/independent-artists/keywordsIA/update/${keywordObject.key_id}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({keyword: keywordObject})
  })
  .then(response => response)
  .then(json => {console.log(27, json)
  })
  .catch( error =>
    !error
    ? console.log('done')
    : console.log(33, error)
  )
  return({
    type: 'SAVE_IA_KEYWORDS',
    keywordsIA: keywords
  })
}
