import React, {Component, lazy, Suspense} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import Loader from './SubComponents/Loader';
import ExportDashboard from './MetaDataDashboard/ExportDashboard';
import PendingReleasesDashboard from './Dashboards/PendingReleasesDashboard';
const ModalContent = lazy(() => import ('./ModalSubComponents/ModalContent'));
import {clearSearch, closeModal, save, toggleModal, updateData} from '../actions/modalActions';
import {clearRatings} from '../actions/ratingsActions';
import {clearTempos} from '../actions/temposActions';
import { asyncTracksFetch, updateTracks } from '../actions/IndieArtistsActions/tracksActions';
import { clearSelectedCategories, initializeSelectedCategories } from '../actions/selectedCategoriesActions';
import { initializeSelectedComposer } from '../actions/selectedComposerActions';
import { clearSelectedInstruments, initializeSelectedInstruments  } from '../actions/selectedInstrumentsActions';
import { clearSelectedKeywords, initializeSelectedKeywords } from '../actions/selectedKeywordsActions';
import { initializeSelectedLibrary } from '../actions/selectedLibraryActions';
import { clearSelectedStyles, initializeSelectedStyles } from '../actions/selectedStylesActions';


class MetaDataTaggingApp extends React.Component {
  constructor(props) {
    super(props)
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  handleOpenModal = () => {
    let { categoriesIA, initializeSelectedInstruments, initializeSelectedKeywords,
          instrumentsIA, keywordsIA, location, modal, selectedComposers,
          selectedLibrary, toggleModal } = this.props; // destructure our props

    // let isBG = selectedLibrary.libraryName === 'background-instrumentals';
    // isBG
    //   ? initializeSelectedInstruments(instrumentsBI) && initializeSelectedKeywords(keywordsBI)
    //   : initializeSelectedInstruments(instrumentsIA) && initializeSelectedKeywords(keywordsIA)
    // let selectedCategories = isBG ? categoriesBI : categoriesIA;

    // /\ /\ /\ /\ /\ /\  5 lines of code /\ /\ /\ /\ /\ /\
    //  above and below code do the same thing, figure out which is better
    // \/ \/ \/ \/ \/ \/ 13 lines of code \/ \/ \/ \/ \/ \/

    let selectedCategories = [];
    switch(selectedLibrary.libraryName){
      case 'independent-artists':
        initializeSelectedInstruments(instrumentsIA);
        initializeSelectedKeywords(keywordsIA);
        selectedCategories = categoriesIA;
        break;
    }

    let selectedCueId = parseInt(event.target.id);
    let selectedComposer = selectedComposers.filter(composer => {
      return parseInt(composer.cue_id) === parseInt(event.target.id)
    })
    let selectedCue = selectedLibrary.library.find(cue => {
      return parseInt(cue.cue_id) === parseInt(event.target.id)
    })
    toggleModal(modal, selectedCueId, selectedCue, selectedCategories, selectedComposer)
  }


  handleCloseModal = () => { // this functional will handle all functions when modal should close
    let { clearRatings, clearSelectedCategories, clearSelectedInstruments, clearSelectedKeywords,
          clearSelectedStyles, closeModal, modal, ratings, selectedCategories, selectedInstruments,
          selectedKeywords, selectedStyles, tempos, tracks } = this.props; // destructure props for clarity
    updateData(modal); // update data
    clearRatings(ratings); // and clear all the selected properties
    clearSelectedCategories(selectedCategories);
    clearSelectedInstruments(selectedInstruments);
    clearSelectedKeywords(selectedKeywords);
    clearSelectedStyles(selectedStyles);
    clearTempos(tempos);
    closeModal(modal); // close the modal AFTER everything has been cleared
  }

  // make seperate functions/dispatches for handling IA saves or make conditional.
  // make sure both also update, key_cnt, inst_cnt, and tracks.
  handleSave = (callback) => { // takes the selectedCue and pushes it to the props with the update information
    let { keywordsBI, modal, save, saveBIKeyword, selectedKeywords, updateTracks } = this.props;
    console.log(80, modal.selectedCue)

    // make this a dispatch ????
    fetch(`https://react-metadata-beta.herokuapp.com/api/independent-artists/tracksIA/update/${modal.selectedCue.cue_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({updatedCue: modal.selectedCue})
    })
    .then(response => response)
    .then(json => {console.log(92, json)
    })
    .catch( error =>
      !error
      ? save(modal, modal.selectedCue) &
        updateTracks(modal.selectedCue, tracks) &
        console.log('done')
      : console.log(99, error)
    )


    // create a dispatch to update keywords key_cnt ????
  }

  componentDidMount() {
    document.title = 'DL Music | BETA';
    let { asyncTracksFetch, categoriesIA, initializeSelectedCategories, initializeSelectedInstruments,
          initializeSelectedKeywords, initializeSelectedLibrary, initializeSelectedStyles, instrumentsIA,
          keywordsIA, location, stylesIA, selectedLibrary } = this.props; // destructure props for clarity
    asyncTracksFetch();
    if(selectedLibrary.library.length === 0){
      switch(location.pathname){
        case '/independent-artists':
          asyncTracksFetch(tracks => {
            initializeSelectedCategories(categoriesIA);
            initializeSelectedInstruments(instrumentsIA);
            initializeSelectedKeywords(keywordsIA);
            initializedSelectedLibrary(tracks, 'independent-artists');
            initializeSelectedStyles(stylesIA);
          });
          break;
        case '/exports':
          initializeSelectedCategories(categoriesIA);
          initializeSelectedInstruments(instrumentsIA);
          initializeSelectedKeywords(keywordsIA);
          initializeSelectedLibrary(tracks, 'independent-artists');
          initializeSelectedStyles(stylesIA);
          break;
        default:
          asyncTracksFetch(tracks => {
            initializeSelectedCategories(categoriesIA);
            initializeSelectedInstruments(instrumentsIA);
            initializeSelectedKeywords(keywordsIA);
            initializedSelectedLibrary(tracks, 'independent-artists');
            initializeSelectedStyles(stylesIA);
          });
          break;
      }
    }
  }

  componentDidUpdate(prevProps, prevState) {
    let { composersIA, initializeSelectedComposer, selectedComposers} = this.props;
    // this is initializing our selected composers by default once the API request is returned
    if(selectedComposers.length === 0){
      initializeSelectedComposer(composersIA)
    }
  }

  render() {
    let { modal, selectedComposers, selectedCueId, selectedLibrary } = this.props;
    // console.log(164, this.props.modal.selectedCue)
    // console.log(165, this.props.selectedKeywords)
    const SelectLoader = () => (
      selectedComposers.length !== 0 && selectedLibrary.library.length === 0
      ? 'This app is stripped down and simplified in order to be deployed for free. \
         This explains why some code may look or seem unneccesary because the full application deals with more libraries / \
         and larger databases than the one being used on this example site. \
         The application will scale to over 50,000 tracks. \
         Please Select a Menu To Begin'
     : <Loader/>
    )
    return (
      <div >
        <div className='dashboard'>
          {<div className='container'>
            <div >
              {/* wait for the selectedLibrary to initialize before showing
              the dashboard to ensure dropdown menus have been initialized */}
              {selectedLibrary.library.length === 0 ?
                <div className='loading'>
                  <SelectLoader/>
                </div>
              : <PendingReleasesDashboard handleOpenModal={this.handleOpenModal}/>}
            </div>
            <ReactModal
              isOpen={modal.showModal}
              contentLabel={selectedCueId}
              appElement={document.getElementById('root')}
            onRequestClose={this.handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className='cue-modal'
          >
            {/* Call the Modal Content Conditionally To Avoid Errors */
              modal.selectedCue &&
              <ModalContent
                handleCloseModal={this.handleCloseModal}
                handleSave={this.handleSave}
              />
            }
          </ReactModal>
        </div>}
      </div>
    </div>
    )}
  }

const mapStateToProps = (state) => {
  return {
    categoriesIA: state.categoriesIA,
    composersIA: state.composersIA,
    instrumentsIA: state.instrumentsIA,
    keywordsIA: state.keywordsIA,
    modal: state.modal,
    ratings: state.ratings,
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedInstruments: state.selectedInstruments,
    selectedLibrary: state.selectedLibrary,
    selectedKeywords: state.selectedKeywords,
    selectedStyles: state.selectedStyles,
    stylesIA: state.stylesIA,
    tempos: state.tempos,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  asyncTracksFetch,
  clearRatings,
  clearSelectedCategories,
  clearSelectedInstruments,
  clearSelectedKeywords,
  clearSelectedStyles,
  clearTempos,
  closeModal,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedInstruments,
  initializeSelectedKeywords,
  initializeSelectedLibrary,
  initializeSelectedStyles,
  save,
  toggleModal,
  updateData,
  updateTracks
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaDataTaggingApp);
