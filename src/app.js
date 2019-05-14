import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { initializeModal } from './actions/modalActions';
import { initializeIAComposers } from './actions/IndieArtistsActions/artistsActions';

import { initializeIAReleases } from './actions/IndieArtistsActions/releasesActions';
import { initializeIACategories } from './actions/IndieArtistsActions/categoriesActions';

import { initializeIAInstruments } from './actions/IndieArtistsActions/instrumentsActionsIA';
import { initializeIAKeywords } from './actions/IndieArtistsActions/keywordsActionsIA';

import { initializeIAStyles } from './actions/IndieArtistsActions/stylesActions';

import { initializeTempos } from './actions/temposActions';

import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';

const store = configureStore();

console.log(25, process.env)

//  i moved the most important fetch calls to the beginning to optimize state initialization loading times

  // ****************************************************************************************************
  // ****************************************************************************************************
  // IA STATE INITIALIZATION
  // ****************************************************************************************************
  // ****************************************************************************************************

fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/releasesIA/')
  .then(response => response.json())
  .then(response => {
    response.data.unshift({rel_id: 9999, rel_num: "All", rel_num_only: "All"})
    store.dispatch(initializeIAReleases(response.data))})
  .catch(err => console.error(err));

fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/composersIA/')
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIAComposers(response.data))})
  .catch(err => console.error(err))


fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/categoriesIA/')
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIACategories(response.data))})
  .catch(err => console.error(err))

fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/instrumentsIA/')
  .then(response => response.json())
  .then(response => {
    store.dispatch(initializeIAInstruments(response.data))})
  .catch(err => console.error(err));


fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/keywordsIA/')
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIAKeywords(response.data))})
  .catch(err => console.error(err))

fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/stylesIA/')
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIAStyles(response.data))})
  .catch(err => console.error(err));

// fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/artistsIA/')
//   .then(response => response.json())
//   .then(response => {store.dispatch(initializeArtistsStageName(response.data))})
//   .catch(err => console.error(err));

fetch('https://react-metadata-beta.herokuapp.com/api/independent-artists/temposIA')
  .then(response => response.json())
  .then(response => {store.dispatch(initializeTempos(response.data))})
  .catch(err => console.error(err));


const modalReducerDeafultState = {
  selectedComposer: [],
  selectedCue: {},
  selectedTrack: {},
  selectedCueId: 0,
  showCategories: false,
  showInstruments: false,
  showKeywords: false,
  showModal: false,
  showRating: false,
  showStyles: false,
  showTempos: false,
  showText: false
}

store.dispatch(initializeModal(modalReducerDeafultState))

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);


ReactDOM.render(jsx, document.getElementById('root'));
