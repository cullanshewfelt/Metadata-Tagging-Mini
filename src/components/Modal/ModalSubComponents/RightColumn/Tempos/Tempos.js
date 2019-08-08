import React from "react";
import {connect} from "react-redux";
import { handleSelectTempos } from "../../../../../actions/temposActions";

const Tempos = (props) => {
  // **********************************************************************************************************
  // TEMPOS FUNCTIONS
  // **********************************************************************************************************
  const { modal, handleSelectTempos, tempos } = props;
  const { selectedCue } = modal;

  const allTempos = tempos.map(tempo => {
    return tempo.tempo_id === selectedCue.tempo_id
      ? { ...tempo, selected: true }
      : { ...tempo, selected: false };
  });

  const RenderTempos = () => {
    // Return the div with className w/ corresponding SASS.
    return allTempos.map(tempo =>
      <div key={`${tempo.tempo_id}`}
        className={tempo.selected ? "modal-selected" : "modal-select"}
        id={tempo.tempo_id}
        onClick={() => handleSelectTempos(tempo)}>
        {tempo.tempo_name}
      </div>
    );
  };

  return (
    <div>
      <RenderTempos/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    tempos: state.tempos
  };
};

const mapDispatchToProps = {
  handleSelectTempos
};

export default connect(mapStateToProps, mapDispatchToProps)(Tempos);
