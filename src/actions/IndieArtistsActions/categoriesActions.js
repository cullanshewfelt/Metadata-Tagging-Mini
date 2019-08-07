
// ==============================================================================================================
//  IA CATEGORIES ACTIONS
// ==============================================================================================================

// ADD_CATEGORIES
export const initializeIACategories = (data) => ({
    type: 'INITIALIZE_IA_CATEGORIES',
    categoriesIA: data

});

export const handleUpdateCategoriesIA = (newCatId) => {
  return {
    type: 'UPDATE_CATEGORIES_IA',
    newCatId: newCatId
  }
}
