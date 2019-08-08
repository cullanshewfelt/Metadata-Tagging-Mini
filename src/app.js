import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

import { initializeModal } from "./actions/modalActions";
import { initializeIAReleases } from "./actions/IndieArtistsActions/releasesActions";
import { initializeIACategories } from "./actions/IndieArtistsActions/categoriesActions";
import { initializeIAInstruments } from "./actions/IndieArtistsActions/instrumentsIAActions";
import { initializeMasterKeywordsIA } from "./actions/IndieArtistsActions/masterKeywordsActions";
import { initializeKeywordsIA } from "./actions/IndieArtistsActions/keywordsActionsIA";
import { initializeIAStyles } from "./actions/IndieArtistsActions/stylesActions";
import { initializeTempos } from "./actions/temposActions";

import AppRouter from "./routers/AppRouter";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const environmentHost = location.hostname;
console.log(21, "Connected on", environmentHost);

const store = configureStore();

// ****************************************************************************************************
// ****************************************************************************************************
// IA STATE INITIALIZATION
// ****************************************************************************************************
// ****************************************************************************************************

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/releasesIA/")
  .then(response => response.json())
  .then(response => {
    response.data.unshift({rel_id: 9999, rel_num: "All", rel_num_only: "All"});
    store.dispatch(initializeIAReleases(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/categoriesIA/")
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIACategories(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/instrumentsIA/")
  .then(response => response.json())
  .then(response => {
    store.dispatch(initializeIAInstruments(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/masterKeywordsIA/")
  .then(response => response.json())
  .then(response => {store.dispatch(initializeMasterKeywordsIA(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/keywordsIA/")
  .then(response => response.json())
  .then(response => {store.dispatch(initializeKeywordsIA(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/stylesIA/")
  .then(response => response.json())
  .then(response => {store.dispatch(initializeIAStyles(response.data));})
  .catch(err => console.error(err));

fetch("https://react-metadata-beta.herokuapp.com/api/independent-artists/temposIA")
  .then(response => response.json())
  .then(response => {store.dispatch(initializeTempos(response.data));})
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
};

store.dispatch(initializeModal(modalReducerDeafultState));

const jsx = (
  <Provider store={store}>
    <AppRouter/>
  </Provider>
);


ReactDOM.render(jsx, document.getElementById("root"));
