// ==============================================================================================================
// MODAL REDUCER
// ==============================================================================================================
// reducers take our state, an action, and return a new state

const modalReducerDeafultState = {
  rightColumnHeader: '',
  searchFilter: '',
  selectedCategories: [],
  selectedComposer: [],
  selectedCue: {},
  selectedCueId: 0,
  showCategories: false,
  showInstruments: false,
  showKeywords: false,
  showModal: false,
  showRating: false,
  showStyles: false,
  showTempos: false,
  showText: false,
  textType: ''
}

export default (state = modalReducerDeafultState, action) => {
  // console.log(21, action)
  switch (action.type) {
    case 'INITIALIZE_MODAL':
      return state;
    case 'TOGGLE_MODAL':
      return action.modal;
    case 'CLOSE_MODAL':
      return action.modal;
      case 'SELECT_HEADER':
      return action.modal;
    case 'SHOW_CATEGORIES':
      return action.modal;
    case 'SHOW_INSTRUMENTS':
      return action.modal;
    case 'SHOW_KEYWORDS':
      return action.modal;
    case 'SHOW_RATINGS':
      return action.modal;
    case 'SHOW_STYLES':
      return action.modal;
    case 'SHOW_TEMPOS':
      return action.modal;
    case 'SHOW_TEXTBOX':
      return {
        ...action.modal,
        textType: action.textType
      };
    case 'UPDATE_DATA':
      return action.modal;
    case 'SAVE':
      return action.modal;
    case 'SEARCH_FILTER':
      return action.modal;
    case 'CLEAR_FILTER':
      return action.modal;
    default:
      return state;
  }
};
