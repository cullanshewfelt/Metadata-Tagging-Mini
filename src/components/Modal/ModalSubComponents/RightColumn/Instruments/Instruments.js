import React from "react";
import {connect} from "react-redux";
import { handleSelectInstrument } from "../../../../../actions/selectedInstrumentsActions";

const Instruments = (props) => {
  let { limitTo, modal, selectedInstruments, handleSelectInstrument } = props;

  // **********************************************************************************************************
  // INSTRUMENTS FUNCTIONS
  // **********************************************************************************************************
  let allInstruments = selectedInstruments.filter(instrument =>
    // this function checks to see if the searchFilterQuery appears at all
    // in any of the instrument names, and returns a filtered array
    instrument.instru_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1);

  // grab all the insturments from the selectedCue
  const selectedCueInstruments = modal.selectedCue.cue_instrus_edit.split(",");

  allInstruments = allInstruments.map(instrument => {
    // capitalize the first letter of each word
    let capitalInstrument = instrument.instru_name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(" ");
    return selectedCueInstruments.map(selectedInstrument => selectedInstrument.toLowerCase().trim()).includes(instrument.instru_name.toLowerCase().trim())
      ? { ...instrument, selected: true, instru_name: capitalInstrument } // change the selected boolean to true for those keywords
      : { ...instrument, selected: false, instru_name: capitalInstrument };
  });
  // change the selected boolean to true for those insturments

  allInstruments = allInstruments.filter(instrument => instrument.selected === true).concat(allInstruments.filter(instrument => instrument.selected === false));

  // -------------------------------------------------------------------------------------------------------------
  const RenderInstruments = () => {
    // if there is a search happening and instruments in the selectedCue
    let instrumentsDivs = allInstruments.splice(0, limitTo).map(instrument =>
      <div key = {`${instrument.instru_id}`}
        className = {instrument.selected ? "modal-selected" : "modal-select"}
        count={instrument.instru_cnt}
        id = {instrument.instru_id}
        onClick = {() => handleSelectInstrument(instrument)} >
        {instrument.instru_name}
      </div>
    );
    if(instrumentsDivs.length === 0){
      return <div>
        <br/>Sorry, Your Search Returned No Matches.
        <br/>Use The Button Above To Add A New Instrument
      </div>;
    } else {
      // add some empty rows to force push data into margins
      for(let x = 0; x < 5; x++){
        instrumentsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>);
      }
      return instrumentsDivs;
    }
  };
  // -------------------------------------------------------------------------------------------------------------
  return (
    <RenderInstruments/>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  selectedInstruments: state.selectedInstruments
});

const mapDispatchToProps = {
  handleSelectInstrument
};

export default connect(mapStateToProps, mapDispatchToProps)(Instruments);
