import React from 'react';
import {connect} from 'react-redux';
import LeftColumn from './LeftColumn';
import RightColumn from './RightColumn';
import TextBox from './TextBox';
import { showCategories, showInstruments, showKeywords, showRatings,} from '../../actions/modalActions';
import { showStyles, showTempos, showTextBox, save, updateData } from '../../actions/modalActions';
import { updateTracks } from '../../actions/IndieArtistsActions/tracksActions';

const ModalContent = (props) => {
  const { modal, releasesIA, selectedLibrary, tracks, updateData, updateTracks  } = props;
  let selectedCue = modal.selectedCue;
  let regex = /v\d{1,2}/g;

  // const copyFromV1 = () => {
  //   let allTracks = tracks;
  //   // our regex expression checks to see if 'v#' exists in the title of the track
  //   if(regex.test(selectedCue.cue_title)){
  //     let baseTitle = selectedCue.cue_title.split(regex)[0]
  //     // if there are multiple versions of the track
  //     // find all of the versions of that track
  //     let v1 = allTracks.filter(x => x.cue_title.includes(baseTitle))[0]
  //       // using object destructuring, set the metadata of the current (v>1) updated cue
  //       // to the master track (v1) metadata of that cue, overriding (or rather keeping)
  //       // it's unique identifying values (name, id, duration)
  //       let updatedCue = {
  //           ...v1,
  //           cue_id: selectedCue.cue_id,
  //           cue_title: selectedCue.cue_title,
  //           cue_duration: selectedCue.cue_duration,
  //           cue_duration_sec: selectedCue.cue_duration_sec,
  //           cue_status: selectedCue.cue_status
  //       }
  //       updateData(modal, updatedCue)
  //       updateTracks(updatedCue, tracks)
  //     }
  //   }


  // **********************************************************************************************************
  // RENDER JSX
  // **********************************************************************************************************
    // regex checks to see if v# appears anywhere in the track title
    let copyV1Button = regex.test(selectedCue.cue_title)
      ?   <button onClick={copyFromV1}>Copy From V1</button>
      : null;

    return (
    <div>
      <strong>Cue ID:</strong> {
        modal.selectedCue
          ? modal.selectedCue.cue_id
          : null
      }
      {copyV1Button}
      <button className='save-button' onClick={() => {props.handleSave((res) => console.log(res))}}>
        Save
      </button>
      <br/><strong>Release: </strong> {
        modal.selectedCue && selectedLibrary.libraryName === 'background-instrumentals'
          ? batchesBI.filter(rel => rel.rel_id === modal.selectedCue.rel_id).map(obj => obj.rel_num)
          : modal.selectedCue && selectedLibrary.libraryName === 'independent-artists'
            ? releasesIA.filter(rel => rel.rel_id === modal.selectedCue.rel_id).map(obj => obj.rel_num)
            : null
      }
      <div className='title' id={modal.selectedCueId}>
        <strong>You Are Editing Metadata For The Cue: </strong>
        <br/>
        {modal.selectedCue.cue_title}
      </div>
      <div className='modal-category'><strong >Duration:</strong> {modal.selectedCue.cue_duration}</div>
      <div className='column-wrapper'>
        <LeftColumn/>
        <RightColumn/>
      </div>
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    cues: state.cues,
    BImasterIDs: state.BImasterIDs,
    modal: state.modal,
    releasesIA: state.releasesIA,
    selectedLibrary: state.selectedLibrary,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  save,
  updateTracks,
  updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalContent);
