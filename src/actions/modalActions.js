// ==============================================================================================================
// MODAL ACTIONS
// ==============================================================================================================

export const initializeModal = ({
  rightColumnHeader = '',
  searchFilter = '',
  selectedCategories = [],
  selectedComposer = [],
  selectedCue = {},
  selectedCueId = 0,
  showCategories = false,
  showInstruments = false,
  showKeywords = false,
  showModal = false,
  showRating = false,
  showStyles = false,
  showTempos = false,
  showText = false,
  textType = '',
}) => ({
  type: 'INITIALIZE_MODAL',
  modal: {
    rightColumnHeader,
    searchFilter,
    selectedCategories,
    selectedComposer,
    selectedCue,
    selectedCueId,
    showCategories,
    showInstruments,
    showKeywords,
    showModal,
    showRating,
    showStyles,
    showTempos,
    showText,
    textType
  }
});

export const toggleModal = (modal, selectedCueId, selectedCue, selectedCategories, selectedComposer) => ({
  type: 'TOGGLE_MODAL',
  modal: {
    ...modal,
    showModal: !modal.showModal,
    selectedCategories: selectedCategories,
    selectedCueId: selectedCueId,
    selectedCue: selectedCue,
    selectedComposer: selectedComposer
  }
});

export const closeModal = (modal) => ({
  type: 'CLOSE_MODAL',
  modal: {
    ...modal,
    searchFilter: '',
    showModal: !modal.showModal,
    selectedCategories: [],
    selectedCueId: undefined,
    selectedCue: undefined,
    selectedComposer: undefined,
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});

export const selectHeader = (modal, rightColumnHeader) => ({
  type: 'SELECT_HEADER',
  modal: {
    ...modal,
    rightColumnHeader
  }
})


export const showCategories = (modal, selectedCategories) => ({
  type: 'SHOW_CATEGORIES',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: true,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});

export const showInstruments = (modal) => ({
  type: 'SHOW_INSTRUMENTS',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: true,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});

export const showKeywords = (modal) => ({
  type: 'SHOW_KEYWORDS',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: false,
    showKeywords: true,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});

export const showRatings = (modal) => ({
  type: 'SHOW_RATINGS',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: true,
    showStyles: false,
    showTempos: false,
    showText: false
  }
});

export const showStyles = (modal) => ({
  type: 'SHOW_STYLES',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: true,
    showTempos: false,
    showText: false
  }
});

export const showTempos = (modal) => ({
  type: 'SHOW_TEMPOS',
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: true,
    showText: false
  }
});

export const showTextBox = (modal, textType) => ({
  type: 'SHOW_TEXTBOX',
  textType: textType,
  modal: {
    ...modal,
    searchFilter: '',
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: true
  }
});


export const handleSearchFilter =  (searchQuery, modal) => ({
  type: 'SEARCH_FILTER',
  modal: {
    ...modal,
    searchFilter: searchQuery
  }
})

export const clearSearch =  (modal) => ({
  type: 'CLEAR_FILTER',
  modal: {
    ...modal,
    searchFilter: ''
  }
})


export const updateData = (modal, updatedCue) => ({
  type: 'UPDATE_DATA',
  modal: {
    ...modal,
    selectedCue: updatedCue || {}
  }
})



export const save = (modal, updatedCue) => ({
  type: 'SAVE',
  modal: {
    ...modal,
    searchFilter: '',
    selectedCue: updatedCue,
    showCategories: false,
    showInstruments: false,
    showKeywords: false,
    showModal: true,
    showRating: false,
    showStyles: false,
    showTempos: false,
    showText: false
  }
})
