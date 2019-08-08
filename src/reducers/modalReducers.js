// ==============================================================================================================
// MODAL REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state

const modalReducerDeafultState = {
  rightColumnHeader: "",
  searchFilter: "",
  selectedCategories: [],
  selectedComposer: [],
  selectedCue: {},
  selectedCueId: 0,
  showCategories: false,
  showInstruments: false,
  showKeywords: false,
  showModal: false,
  showRating: false,
  showStatus: false,
  showStyles: false,
  showTempos: false,
  showText: false,
  textType: ""
};

export default (state = modalReducerDeafultState, action) => {
  switch (action.type) {
  case "INITIALIZE_MODAL":
    return state;
  case "MODAL_SELECT_CUE":
    return { ...state, selectedCue: action.selectedCue };
  case "MODAL_SELECT_COMPOSER":
    return { ...state, selectedComposer: action.selectedComposer };
  case "TOGGLE_MODAL":
    return { ...state, selectedCueId: action.selectedCueId, showModal: action.showModal };
  case "CLOSE_MODAL":
    return {
      ...state,
      searchFilter: "",
      showModal: false,
      selectedCueId: undefined,
      selectedCue: undefined,
      selectedComposer: [],
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SELECT_HEADER":
    return {
      ...state,
      rightColumnHeader: action.rightColumnHeader
    };
  case "SHOW_CATEGORIES":
    return {
      ...state,
      searchFilter: "",
      showCategories: true,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SHOW_INSTRUMENTS":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: true,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SHOW_KEYWORDS":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: true,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SHOW_RATINGS":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: true,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SHOW_STATUS":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: true,
      showStyles: false,
      showTempos: false,
      showText: false
    };
  case "SHOW_STYLES":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: true,
      showTempos: false,
      showText: false
    };
  case "SHOW_TEMPOS":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: true,
      showText: false
    };
  case "SHOW_TEXTBOX":
    return {
      ...state,
      searchFilter: "",
      showCategories: false,
      showInstruments: false,
      showKeywords: false,
      showRating: false,
      showStatus: false,
      showStyles: false,
      showTempos: false,
      showText: true,
      textType: action.textType
    };
  case "UPDATE_MODAL_DATA":
    return { ...state, selectedCue: action.updatedCue};
  case "SAVE":
    return action.modal;
  case "SEARCH_FILTER":
    return { ...state, searchFilter: action.searchFilter };
  case "CLEAR_FILTER":
    return { ...state, searchFilter: "" };
  default:
    return state;
  }
};
