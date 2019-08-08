// INITIALIZE_KEYWORDS
export const initializeKeywordsIA = (keywordsIA) => ({ type: "INITIALIZE_IA_KEYWORDS", keywordsIA });

export const selectKeywordsIA = (keywordsIA) => ({ type: "SELECT_IA_KEYWORDS", keywordsIA });

export const clearIAKeywords = (keywordsIA) => ({ type: "CLEAR_IA_KEYWORDS", keywordsIA });

export const updateKeywordIA = (updatedKeyword) => ({ type: "UPDATE_KEYWORD_IA", updatedKeyword });

export const handleUpdateKeywordsIA = (updatedKeyword) => {
  return (dispatch, getState) => dispatch(saveKeywordIA(updatedKeyword));
};

export const saveKeywordIA = (updatedKeyword) => {
  return (dispatch) => {
    fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/keywordsIA/update/${updatedKeyword.keyword_id}`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ keyword: updatedKeyword })
    })
      .then(response => response)
      .then(json => {
        // console.log(25, json);
        dispatch(updateKeywordIA(updatedKeyword));
      })
      .catch(error =>
        !error ?
          console.log("done") :
          console.log(31, error)
      );
  };
};
