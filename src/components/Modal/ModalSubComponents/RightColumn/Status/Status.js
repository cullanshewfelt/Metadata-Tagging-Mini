import React, { useEffect, useState } from 'react';
import {connect} from 'react-redux';
import { handleSelectStatus } from '../../../../../actions/modalActions';

const Status = (props) => {
  let { modal, handleSelectStatus, selectedLibrary, statuses } = props;
  let { selectedCue } = modal;

  statuses = statuses.map(status => {
    return status.value === selectedCue.cue_status
      ? {...status, selected: true}
      : {...status, selected: false}
  })

  statuses = selectedLibrary.libraryName !== 'independent-artists' ?
      statuses.filter(status => status.value !== 'Instrumental_Active') :
      statuses

  let RenderStatus = () => (
    statuses.map(status => (
        <div
          id={status.value}
          key={status.value}
          className={status.selected ? 'modal-selected' : 'modal-select'}
          onClick={() => handleSelectStatus(status)}>{status.label}
        </div>
    )))

  return(
    <div>
      <RenderStatus/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    selectedLibrary: state.selectedLibrary,
    statuses: state.statuses
  }
}

const mapDispatchToProps = {
  handleSelectStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);
