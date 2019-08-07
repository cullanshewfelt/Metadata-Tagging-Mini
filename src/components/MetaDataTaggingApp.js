import React, { lazy, Suspense } from 'react';
import {connect} from 'react-redux';
import ReactModal from 'react-modal';
import Loader from './SubComponents/Loader/Loader';
import PendingReleasesDashboard from './Dashboards/PendingReleasesDashboard/PendingReleasesDashboard';
const ModalContent = lazy(() => import ('./Modal/ModalContent'));

import { closeModal, handleCloseModal, handleFetchCue, handleToggleModal, handleUpdateModal } from '../actions/modalActions';

import { clearRatings } from '../actions/ratingsActions';
import { clearTempos } from '../actions/temposActions';
import { clearSelectedCategories } from '../actions/selectedCategoriesActions';
import { clearSelectedInstruments, initializeSelectedInstruments  } from '../actions/selectedInstrumentsActions';
import { clearSelectedKeywords, initializeSelectedKeywords } from '../actions/selectedKeywordsActions';
import { initializeSelectedLibrary } from '../actions/selectedLibraryActions';
import { clearSelectedStyles } from '../actions/selectedStylesActions';

const MetaDataTaggingApp = (props) => {
  let { handleCloseModal,
        handleFetchCue, handleToggleModal, initializeSelectedInstruments,
        initializeSelectedKeywords,
        instrumentsBI, instrumentsIA, keywordsBI, keywordsIA, location,
        modal, selectedInstruments,
        selectedLibrary, stylesBI, stylesIA, tempos
      } = props;

  let { selectedCue, selectedCueId } = modal;
  let { libraryName } = selectedLibrary;

  const handleOpenModal = (event) => {
    let selectedCueId = parseInt(event.target.id);
    // When the modal opens, conditionally initialize proper data sets
    //
    switch(selectedLibrary.libraryName){
      case 'background-instrumentals':
        initializeSelectedInstruments(instrumentsBI);
        initializeSelectedKeywords(keywordsBI);
        break;
      case 'independent-artists':
        initializeSelectedInstruments(instrumentsIA);
        initializeSelectedKeywords(keywordsIA);
        break;
    }
    // starts a chain of redux dispatches and thunks to gather all the data for the selectedCueId
    handleFetchCue(selectedCueId);
    handleToggleModal(selectedCueId);
  }

  let isLibrarySelected = libraryName.length > 0;

  const SelectLoader = () => (
    <div className='loading'>
      {!isLibrarySelected && 'Select a Menu To Begin'}
    </div>
  )

  // console.log(58, props)

  return (
    <div>
      <div className='dashboard'>
        <div className='container'>
          <div>
            { isLibrarySelected
                ? <PendingReleasesDashboard handleOpenModal={(e) => handleOpenModal(e)}/>
                : <SelectLoader/> }
          </div>
          <ReactModal
            isOpen={modal.showModal}
            contentLabel={`${selectedCueId}`}
            appElement={document.getElementById('root')}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className='cue-modal'
          >
            {modal.selectedCue && <ModalContent handleCloseModal={handleCloseModal}/>}
          </ReactModal>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cues: state.cues,
    instrumentsBI: state.instrumentsBI,
    instrumentsIA: state.instrumentsIA,
    keywordsBI: state.keywordsBI,
    keywordsIA: state.keywordsIA,
    modal: state.modal,
    selectedInstruments: state.selectedInstruments,
    selectedLibrary: state.selectedLibrary,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  handleCloseModal,
  handleFetchCue,
  initializeSelectedInstruments,
  initializeSelectedKeywords,
  handleToggleModal,
  handleUpdateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(MetaDataTaggingApp);
