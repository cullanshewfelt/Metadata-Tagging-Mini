const { createStore, combineReducers, applyMiddleware, compose } = require('redux');
var ReduxThunk = require('redux-thunk').default

import categoriesIAReducers from '../reducers/IndependentArtistsReducers/categoriesIAReducers';
import composersIAReducers from '../reducers/IndependentArtistsReducers/composersIAReducers';

import {trackFetchError, trackFetchIsLoading, tracks} from '../reducers/IndependentArtistsReducers/tracksReducers';
import instrumentsIAReducers from '../reducers/IndependentArtistsReducers/instrumentsIAReducers';

import keywordsReducersIA from '../reducers/IndependentArtistsReducers/keywordsReducersIA';

import modalReducers from '../reducers/modalReducers';
import ratingsReducers from '../reducers/ratingsReducers';
import releasesIAReducers from '../reducers/IndependentArtistsReducers/releasesReducers';

import selectedCategoriesReducers from '../reducers/selectedCategoriesReducers';
import selectedComposersReducers from '../reducers/selectedComposerReducers';
import selectedInstrumentsReducers from '../reducers/selectedInstrumentsReducers';
import selectedKeywordsReducers from '../reducers/selectedKeywordsReducers';
import selectedLibraryReducers from '../reducers/selectedLibraryReducers';
import selectedReleasesReducers from '../reducers/selectedReleasesReducers';
import selectedStylesReducers from '../reducers/selectedStylesReducers';

import stylesIAReducers from '../reducers/IndependentArtistsReducers/stylesReducers';

import temposReducers from '../reducers/temposReducers';
import tracksReducers from '../reducers/IndependentArtistsReducers/tracksReducers';
import exportReducers from '../reducers/ExportReducers/exportReducers';


const reducers = combineReducers({
  categoriesIA: categoriesIAReducers,
  composersIA: composersIAReducers,
  downloadProgress: exportReducers,
  instrumentsIA: instrumentsIAReducers,
  keywordsIA: keywordsReducersIA,
  modal: modalReducers,
  ratings: ratingsReducers,
  releasesIA: releasesIAReducers,
  selectedCategories: selectedCategoriesReducers,
  selectedComposers: selectedComposersReducers,
  selectedInstruments: selectedInstrumentsReducers,
  selectedKeywords: selectedKeywordsReducers,
  selectedLibrary: selectedLibraryReducers,
  selectedStyles: selectedStylesReducers,
  selectedReleases: selectedReleasesReducers,
  stylesIA: stylesIAReducers,
  tempos: temposReducers,
  tracks: tracks
})

export default () => {
  const store = createStore(
    reducers,
    compose(
      applyMiddleware(ReduxThunk),
      window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  )
  return store;
}
