import React, { useEffect, useRef } from 'react';
import {connect} from 'react-redux';
import { showCategories, selectHeader, showInstruments, showKeywords, showRatings  } from '../../../../actions/modalActions';
import { showStatus, showStyles, showTempos, showTextBox, updateData } from '../../../../actions/modalActions';

const LeftColumn = (props) => {
  let { batchesBI, modal, ratings, releasesIA, selectedCategories, selectedKeywords, selectedLibrary, selectedStyles,
        showCategories, showInstruments, showKeywords, showRatings, showStatus, showStyles, showTempos,
        showTextBox, stylesBI, stylesIA, tempos
      } = props;

  let { selectedCue } = modal;

  // **********************************************************************************************************
  // PUBLISHER DATA PARSE HELPER FUNCTION
  // **********************************************************************************************************

  let selectedComposer = modal.selectedComposer.map(publisher => (
    { publisher_name: publisher.publisher_name,
      publisher_pro: publisher.publisher_pro,
      composer_split: publisher.composer_split }
    ))

  // console.log(24, selectedComposer)

  let publisherArray = Object.values(selectedComposer.reduce((accumulator, currentValue, currentIndex, array) => {
    if (accumulator[currentValue.publisher_name]) {
      accumulator[currentValue.publisher_name].composer_split += currentValue.composer_split;
    } else {
      accumulator[currentValue.publisher_name] = currentValue;
    }
    return accumulator;
  }, {}))

  // console.log(35, publisherArray)
  // **********************************************************************************************************
  // STATUS FUNCTIONS
  // **********************************************************************************************************
  const handleShowStatus = () => {
    showStatus();
  }
  // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************
  const handleShowCategories = () => {
    showCategories();
  }
  // **********************************************************************************************************
  // STYLES FUNCTIONS
  // **********************************************************************************************************
  const handleShowStyles = () => {
    showStyles();
    clearSearchFilter();
  }
  // **********************************************************************************************************
  // INSTRUMENTS FUNCTIONS
  // **********************************************************************************************************
  const handleShowInstruments = () => {
    showInstruments();
    clearSearchFilter();
  }
  // **********************************************************************************************************
  // KEYWORDS FUNCTIONS
  // **********************************************************************************************************
  const handleShowKeywords = () => {
    showKeywords();
    clearSearchFilter();
  }
  // **********************************************************************************************************
  // TEMPOS FUNCTIONS
  // **********************************************************************************************************
  const handleShowTempos = () => {
    showTempos();
  }
  // **********************************************************************************************************
  // RATINGS FUNCTIONS
  // **********************************************************************************************************
  const handleShowRating = () => {
    showRatings();
  }
  // **********************************************************************************************************
  // TEXTBOX FUNCTIONS
  // **********************************************************************************************************
  const handleShowTextBox = () => {
    showTextBox(event.target.getAttribute('texttype'))
  }

  const clearSearchFilter = () => {
    if(document.getElementById('search-filter')){
      document.getElementById('search-filter').value = '';
    }
  }

  return (
    <div className='modal-left-column'>
      <strong>Catalog Name:</strong> {
        selectedLibrary.libraryName === 'background-instrumentals'
          ? 'Background Instrumentals'
          : selectedLibrary.libraryName === 'independent-artists'
            ? 'Independent Artists'
            : null
      }
      <br/>
      <strong>Cue ID:</strong> { selectedCue.cue_id }
      <br/>
      <strong>Release: </strong> {
        selectedCue && selectedLibrary.libraryName === 'background-instrumentals'
          ? batchesBI.filter(rel => rel.rel_id === selectedCue.rel_id).map(obj => obj.rel_num)
          : selectedCue && selectedLibrary.libraryName === 'independent-artists'
            ? releasesIA.filter(rel => rel.rel_id === selectedCue.rel_id).map(obj => obj.rel_num)
            : null
      }
      <br/>
      <strong>Duration:</strong> {selectedCue.cue_duration}
      <br/>
      <div className='modal-category-select' onClick={handleShowStatus}>
        <strong>Status: </strong> { selectedCue.cue_status }
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowCategories}>
        <strong>Category: </strong> { selectedCategories.filter(category => category.cat_id === selectedCue.cat_id).map(obj => obj.cat_name) }
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowStyles}>
        <strong>Style: </strong> {
          selectedStyles.filter(style => style.style_id === selectedCue.style_id).map(obj => obj.style_name)}
      </div>
      <br/>
      <strong>Composer{modal.selectedComposer.length > 1 ? 's' : null}: </strong> {
        modal.selectedComposer.map((composer, i) =>
          <div key={i}>{composer.composer_name} ({composer.pro_name}) {composer.composer_split}%  {String.fromCodePoint(183)} </div>)}
      <br/>
      <strong>Publisher{publisherArray.length > 1 ? 's' : null}: </strong> {
        publisherArray.map((composer, i) =>
          <div key={i}>{composer.publisher_name}  {composer.composer_split}% {String.fromCodePoint(183)}</div>)}
      <br/>
      <div className='modal-category-select' onClick={handleShowInstruments}>
        <strong>Instruments: </strong> {selectedCue.cue_instrus_edit}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowKeywords}>
        <strong>Keywords: </strong> {selectedCue.cue_desc}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowTempos}>
        <strong>Tempo: </strong> {tempos.filter(tempo => tempo.tempo_id === selectedCue.tempo_id).map(obj => obj.tempo_name)}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowRating}>
        <strong>Rating: </strong> {selectedCue.cue_rating}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_band_edit'>
        <strong texttype='sounds_like_band_edit'>Sounds Like Band: </strong> {selectedCue.sounds_like_band_edit}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_film_edit'>
        <strong texttype='sounds_like_film_edit'>Sounds Like Film/TV: </strong> {selectedCue.sounds_like_film_edit}
      </div>
      <br/>
      <div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_composer_edit'>
        <strong texttype='sounds_like_composer_edit'>Sounds Like Composer: </strong> {selectedCue.sounds_like_composer_edit}
      </div>
    </div>
  )}

const mapStateToProps = (state) => {
  // include ALL props which would cause LeftColumn to rerender
  return {
    modal: state.modal,
    ratings: state.ratings,
    releasesIA: state.releasesIA,
    selectedCategories: state.selectedCategories,
    selectedKeywords: state.selectedKeywords,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles,
    stylesIA: state.stylesIA,
    tempos: state.tempos
  }
}

const mapDispatchToProps = {
  selectHeader,
  showCategories,
  showInstruments,
  showKeywords,
  showRatings,
  showStatus,
  showStyles,
  showTempos,
  showTextBox
}


export default connect(mapStateToProps, mapDispatchToProps)(LeftColumn);
