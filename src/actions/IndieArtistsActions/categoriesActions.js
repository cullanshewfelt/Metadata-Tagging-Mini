
// ==============================================================================================================
//  IA CATEGORIES ACTIONS
// ==============================================================================================================

// ADD_CATEGORIES
export const initializeIACategories = (data) => ({
    type: 'INITIALIZE_IA_CATEGORIES',
    categoriesIA: data

});

export const selectIACategory = (data) => ({
  type: 'SELECT_IA_CATEGORY',
  categoriesIA: data
})
