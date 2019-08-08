import React from "react";
import {connect} from "react-redux";
import ReactModal from "react-modal";
import PendingReleasesDashboard from "./Dashboards/PendingReleasesDashboard/PendingReleasesDashboard";
import ModalContent from "./Modal/ModalContent";
import { initializeSelectedInstruments } from "../actions/selectedInstrumentsActions";
import { initializeSelectedKeywords } from "../actions/selectedKeywordsActions";

import { handleCloseModal, handleFetchCue, handleToggleModal, handleUpdateModal } from "../actions/modalActions";

const MetaDataTaggingApp = (props) => {
  let { handleCloseModal, handleToggleModal, initializeSelectedInstruments, initializeSelectedKeywords,
    instrumentsIA, keywordsIA, modal, selectedLibrary } = props;

  let { selectedCueId } = modal;
  let { libraryName } = selectedLibrary;

  const handleOpenModal = (event) => {
    let selectedCueId = parseInt(event.target.id);
    // When the modal opens, conditionally initialize proper data sets
    switch(selectedLibrary.libraryName){
    case "background-instrumentals":
      // initializeSelectedInstruments(instrumentsBI);
      // initializeSelectedKeywords(keywordsBI);
      break;
    case "independent-artists":
      initializeSelectedInstruments(instrumentsIA);
      initializeSelectedKeywords(keywordsIA);
      break;
    }
    // starts a chain of redux dispatches and thunks to gather all the data for the selectedCueId
    handleFetchCue(selectedCueId);
    handleToggleModal(selectedCueId);
  };

  let isLibrarySelected = libraryName.length > 0;

  const SelectLoader = () => (
    <div className="loading">
      {!isLibrarySelected && "Select a Menu To Begin"}
    </div>
  );

  // console.log(58, props)

  return (
    <div>
      <div className="dashboard">
        <div className="container">
          <div>
            { isLibrarySelected
              ? <PendingReleasesDashboard handleOpenModal={(e) => handleOpenModal(e)}/>
              : <SelectLoader/> }
          </div>
          <ReactModal
            isOpen={modal.showModal}
            contentLabel={`${selectedCueId}`}
            appElement={document.getElementById("root")}
            onRequestClose={handleCloseModal}
            shouldCloseOnOverlayClick={true}
            className="cue-modal"
          >
            {modal.selectedCue && <ModalContent handleCloseModal={handleCloseModal}/>}
          </ReactModal>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    instrumentsIA: state.instrumentsIA,
    keywordsIA: state.keywordsIA,
    modal: state.modal,
    selectedInstruments: state.selectedInstruments,
    selectedLibrary: state.selectedLibrary,
    tracks: state.tracks
  };
};

const mapDispatchToProps = {
  handleCloseModal,
  handleFetchCue,
  initializeSelectedInstruments,
  initializeSelectedKeywords,
  handleToggleModal,
  handleUpdateModal
};

export default connect(mapStateToProps, mapDispatchToProps)(MetaDataTaggingApp);
