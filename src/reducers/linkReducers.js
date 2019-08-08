const catLinksDefaultState = {
  newCategoryLink: "",
  oldCategoryLink: ""
};

export function catLink(state = catLinksDefaultState, action) {
  switch (action.type) {
  case "SET_OLD_CAT_LINK":
    return { ...state, oldCategoryLink: action.oldCategoryLink };
  case "SET_NEW_CAT_LINK":
    return { ...state, newCategoryLink: action.newCategoryLink };
  case "CLEAR_CAT_LINKS":
    return { oldCategoryLink: "", newCategoryLink: "" };
  default:
    return { ...state };
  }
}

const styleLinksDefaultState = {
  newStyleLink: "",
  oldStyleLink: ""
};

export function styleLink(state = styleLinksDefaultState, action) {
  switch (action.type) {
  case "SET_OLD_STYLE_LINK":
    return { ...state, oldStyleLink: action.oldStyleLink };
  case "SET_NEW_STYLE_LINK":
    return { ...state, newStyleLink: action.newStyleLink };
  case "CLEAR_STYLE_LINKS":
    return { oldStyleLink: "", newStyleLink: "" };
  default:
    return { ...state };
  }
}
