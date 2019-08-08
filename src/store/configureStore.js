// const { createStore, combineReducers, applyMiddleware, compose } = require("redux");
var thunk = require("redux-thunk").default;

import { configureStore } from "redux-starter-kit";
// import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import categoriesIAReducers from "../reducers/IndependentArtistsReducers/categoriesIAReducers";
import composersIAReducers from "../reducers/IndependentArtistsReducers/composersIAReducers";
import { trackFetchIsLoading, tracks } from "../reducers/IndependentArtistsReducers/tracksReducers";
import instrumentsIAReducers from "../reducers/IndependentArtistsReducers/instrumentsIAReducers";
import masterKeywordsReducersIA from "../reducers/IndependentArtistsReducers/masterKeywordsReducersIA";
import keywordsReducersIA from "../reducers/IndependentArtistsReducers/keywordsReducersIA";
import modalReducers from "../reducers/modalReducers";
import ratingsReducers from "../reducers/ratingsReducers";
import statusReducers from "../reducers/statusReducers";
import releasesIAReducers from "../reducers/IndependentArtistsReducers/releasesReducers";
import selectedCategoriesReducers from "../reducers/selectedCategoriesReducers";
import selectedComposersReducers from "../reducers/selectedComposerReducers";
import selectedInstrumentsReducers from "../reducers/selectedInstrumentsReducers";
import selectedKeywordsReducers from "../reducers/selectedKeywordsReducers";
import selectedLibraryReducers from "../reducers/selectedLibraryReducers";
import selectedMasterKeysReducers from "../reducers/selectedMasterKeysReducers";
import selectedReleasesReducers from "../reducers/selectedReleasesReducers";
import selectedStylesReducers from "../reducers/selectedStylesReducers";
import stylesIAReducers from "../reducers/IndependentArtistsReducers/stylesReducers";
import temposReducers from "../reducers/temposReducers";
import exportReducers from "../reducers/ExportReducers/exportReducers";

import { catLink, styleLink } from "../reducers/linkReducers";

const reducer = {
  categoriesIA: categoriesIAReducers,
  catLink: catLink,
  composersIA: composersIAReducers,
  downloadProgress: exportReducers,
  instrumentsIA: instrumentsIAReducers,
  masterKeywordsIA: masterKeywordsReducersIA,
  keywordsIA: keywordsReducersIA,
  modal: modalReducers,
  ratings: ratingsReducers,
  releasesIA: releasesIAReducers,
  selectedCategories: selectedCategoriesReducers,
  selectedComposers: selectedComposersReducers,
  selectedInstruments: selectedInstrumentsReducers,
  selectedKeywords: selectedKeywordsReducers,
  selectedLibrary: selectedLibraryReducers,
  selectedMasterKeywords: selectedMasterKeysReducers,
  selectedStyles: selectedStylesReducers,
  selectedReleases: selectedReleasesReducers,
  statuses: statusReducers,
  stylesIA: stylesIAReducers,
  styleLink: styleLink,
  tempos: temposReducers,
  tracks: tracks,
  trackFetchIsLoading: trackFetchIsLoading
};

// default middleware was causing the app to freeze so I am resetting it here
// [require('redux-immutable-state-invariant').default(), thunk, logger] // require('redux-immutable-state-invariant').default(),

// logger MUST come last

let middleware = process.env.NODE_ENV !== "production"
  ? [thunk, logger] // require('redux-immutable-state-invariant').default(), logger
  : [thunk]; //

export default () => {
  // using configureStore for extra error logging // createStore
  const store = configureStore({
    reducer,
    middleware,
    devTools: process.env.NODE_ENV !== "production"
  });
  return store;
};
