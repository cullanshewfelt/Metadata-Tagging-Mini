import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import LeftColumn from './ModalSubComponents/LeftColumn/LeftColumn';
import RightColumn from './ModalSubComponents/RightColumn/RightColumn';
import { handleSave, handleUpdateModal } from '../../actions/modalActions';

const ModalContent = (props) => {
  let { catLink, styleLink, handleSave, handleUpdateModal, keywordsBI,
        modal, saveKeywordBI, searchFilter, selectedCategories,
        selectCategory, selectedInstruments, selectedLibrary, selectedKeywords,
        selectedRating, selectRating, selectedStyles, selectStyle, selectTempos,
        tempos, tracks
  } = props;

  // console.log(15, catLink)
  // console.log(16, styleLink)

  const copyFromV1 = () => {
    let selectedCue = props.modal.selectedCue;
    let allCues = props.cues;
    // our regex expression checks to see if 'v#' exists in the title of the track
    let regex = /v\d{1,2}/g;
    if(regex.test(selectedCue.cue_title)){
      let baseTitle = selectedCue.cue_title.split(regex)[0]
      // if there are multiple versions of the track
      // find all of the versions of that track
      let v1 = allCues.filter(x => x.cue_title.includes(baseTitle))[0]
        // using object destructuring, set the metadata of the current (v>1) updated cue
        // to the master track (v1) metadata of that cue, overriding (or rather keeping)
        // it's unique identifying values (name, id, duration)
        let updatedCue = {
            ...v1,
            cue_id: selectedCue.cue_id,
            cue_title: selectedCue.cue_title,
            cue_duration: selectedCue.cue_duration,
            cue_duration_sec: selectedCue.cue_duration_sec,
            cue_status: selectedCue.cue_status
        }
      handleUpdateModal(updatedCue)
    }
  }

  // **********************************************************************************************************
  // RENDER JSX
  // **********************************************************************************************************
    let selectedCue = props.modal.selectedCue;
    // regex checks to see if v# appears anywhere in the track title
    let regex = /v\d{1,2}/g ;

    let copyV1Button = regex.test(selectedCue.cue_title)
      ?   <button onClick={copyFromV1}>Copy From V1</button>
      : <button onClick={copyFromV1} disabled>Copy From V1</button>;


    return (
    <div>
      {copyV1Button}
      <button className='save-button' onClick={() => { handleSave(selectedCue)}}>
        Save
      </button>
      <div className='title' id={modal.selectedCueId}>
        <strong>You Are Editing Metadata For The Cue: </strong>
        <br/>{modal.selectedCue.cue_title}
      </div>
      <div className='column-wrapper'>
        <LeftColumn/>
        <RightColumn/>
      </div>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    BImasterIDs: state.BImasterIDs,
    catLink: state.catLink,
    styleLink: state.styleLink,
    cues: state.cues,
    modal: state.modal,
    selectedLibrary: state.selectedLibrary
  }
}

const mapDispatchToProps = {
  handleSave,
  handleUpdateModal
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
