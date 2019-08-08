import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import { handleSelectKeyword } from "../../../../../actions/selectedKeywordsActions";

const Keywords = (props) => {
  let { limitTo, modal, selectedKeywords, handleSelectKeyword, selectedLibrary } = props;
  let { selectedCue } = modal;
  // **********************************************************************************************************
  // KEYWORDS FUNCTIONS
  // **********************************************************************************************************
  let allKeywords = selectedKeywords.filter(keyword =>
    keyword.keyword_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1);

  let selectedCueKeywords = selectedCue.cue_desc.split(", ");

  allKeywords = allKeywords.map(keyword => {
    // capitalize the first letter of each word
    let capitalKeyword = keyword.keyword_name.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
    return selectedCueKeywords.map(selectedKeyword => selectedKeyword.toLowerCase().trim()).includes(keyword.keyword_name.toLowerCase().trim())
      ? { ...keyword, selected: true, keyword_name: capitalKeyword } // change the selected boolean to true for those keywords
      : { ...keyword, selected: false, keyword_name: capitalKeyword };
  });

  // this puts the selected keywords to the top of the list
  allKeywords = allKeywords.filter(keyword => keyword.selected === true).concat(allKeywords.filter(keyword => keyword.selected === false));

  // -------------------------------------------------------------------------------------------------------------
  const RenderKeywords = () => {
    // checks to see if the keyword is selected or not and we return the div with className with corresponding SASS.
    let keywordsDivs = allKeywords.splice(0, limitTo).map(keyword =>
      <div key = {`${keyword.keyword_id}`}
        className = {keyword.selected ? "modal-selected" : "modal-select"}
        count={keyword.key_cnt}
        id = {keyword.keyword_id}
        onClick = {() => handleSelectKeyword(keyword)}>
        {keyword.keyword_name}
      </div>
    );
    if(keywordsDivs.length === 0){
      return(
        <div>
          <br/>Sorry, Your Search Returned No Matches.
          <br/>Use The Button Above To Add A New Keyword.
        </div>
      );
    } else {
      // add some empty rows to force push data into margins
      for(let x = 0; x < 5; x++){
        keywordsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>);
      }
      return keywordsDivs;
    }
  };
  // -------------------------------------------------------------------------------------------------------------
  return (
    <RenderKeywords/>
  );
};

const mapStateToProps = (state) => ({
  keywordsBI: state.keywordsBI,
  keywordsIA: state.keywordsIA,
  modal: state.modal,
  selectedKeywords: state.selectedKeywords,
  selectedLibrary: state.selectedLibrary
});

const mapDispatchToProps = {
  handleSelectKeyword
};

export default connect(mapStateToProps, mapDispatchToProps)(Keywords);
