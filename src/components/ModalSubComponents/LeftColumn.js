import React from 'react';
import {connect} from 'react-redux';
import { showCategories, showInstruments, showKeywords, showRatings, selectHeader} from '../../actions/modalActions';
import { showStyles, showTempos, showTextBox, updateData } from '../../actions/modalActions';

// this is a stateless functional component
const LeftColumn = (props) => {
  let { batchesBI, modal, ratings, releasesIA, selectedCategories, selectedCue, selectedLibrary, selectedStyles,
        showCategories, showInstruments, showKeywords, showRatings, showStyles, showTempos, showTextBox, tempos
      } = props;
  // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************
  const handleShowCategories = () => {
    showCategories(modal);
  }
  // **********************************************************************************************************
  // STYLES FUNCTIONS
  // **********************************************************************************************************
  const handleShowStyles = () => {
    showStyles(modal);
    if(document.getElementById('search-filter')){
      document.getElementById('search-filter').value = '';
    }}
  // **********************************************************************************************************
  // INSTRUMENTS FUNCTIONS
  // **********************************************************************************************************
  const handleShowInstruments = () => {
    showInstruments(modal);
    if(document.getElementById('search-filter')){
      document.getElementById('search-filter').value = '';
    }}
  // **********************************************************************************************************
  // KEYWORDS FUNCTIONS
  // **********************************************************************************************************
  const handleShowKeywords = () => {
    showKeywords(modal);
    if(document.getElementById('search-filter')){
      document.getElementById('search-filter').value = '';
    }}
  // **********************************************************************************************************
  // TEMPOS FUNCTIONS
  // **********************************************************************************************************
  const handleShowTempos = () => {
    showTempos(modal);
  }
  // **********************************************************************************************************
  // RATINGS FUNCTIONS
  // **********************************************************************************************************
  const handleShowRating = () => {
    showRatings(modal);
  }
  // **********************************************************************************************************
  // TEXTBOX FUNCTIONS
  // **********************************************************************************************************
  const handleShowTextBox = () => {
    showTextBox(modal, event.target.getAttribute('texttype'))
  }

  return(
    <div className='modal-left-column'>
      <strong>Cue ID:</strong> {
        modal.selectedCue
          ? modal.selectedCue.cue_id
          : null
      }
      <br/><strong>Release: </strong> {
        modal.selectedCue && selectedLibrary.libraryName === 'background-instrumentals'
          ? batchesBI.filter(rel => rel.rel_id === modal.selectedCue.rel_id).map(obj => obj.rel_num)
          : modal.selectedCue && selectedLibrary.libraryName === 'independent-artists'
            ? releasesIA.filter(rel => rel.rel_id === modal.selectedCue.rel_id).map(obj => obj.rel_num)
            : null
      }
      <div className='modal-category'><strong >Duration:</strong> {modal.selectedCue.cue_duration}</div>
      <div className='modal-category'><strong>Catalog Name:</strong> {
        selectedLibrary.libraryName === 'background-instrumentals'
          ? 'Background Instrumentals'
          : selectedLibrary.libraryName === 'independent-artists'
            ? 'Independent Artists'
            : null
      }
      </div>
      <div className='modal-category'><strong>Status:</strong> {
        modal.selectedCue
          ? modal.selectedCue.cue_status
          : null
      }
      </div>
      <div className='modal-category-select' onClick={handleShowCategories}><strong>Category:</strong> {
        modal.selectedCategories
          ? selectedCategories.filter(category => category.cat_id === modal.selectedCue.cat_id).map(obj => obj.cat_name)
          : null
      }
      </div>
      <div className='modal-category-select' onClick={handleShowStyles}>
        <strong>Style: </strong> {
            selectedStyles
              ? selectedStyles.filter(style => style.style_id === modal.selectedCue.style_id).map(obj => obj.style_name)
              : null
        }
      </div>
      <div className='modal-category'>
        <strong>Composer(s): </strong> {
          modal.selectedComposer.length === 1
            ? modal.selectedComposer.map((composer, i) => `${composer.composer_name} (${composer.pro_name}) ${composer.composer_split}%`)
            : modal.selectedComposer.map((composer, i) => `${composer.composer_name} (${composer.pro_name}) ${composer.composer_split}%  ${String.fromCodePoint(183)} `)
      }
      </div>
      <div className='modal-category'>
        <strong>Publisher(s): </strong> {
            modal.selectedComposer.length === 1
              ? modal.selectedComposer.map((composer, i) => `${composer.publisher_name}  ${composer.composer_split}%`)
              : modal.selectedComposer.map((composer, i) => `${composer.publisher_name}  ${composer.composer_split}% ${String.fromCodePoint(183)}  `)
        }
      </div>
      <div className='modal-category-select' onClick={handleShowInstruments}>
        {/* <strong>Instruments: </strong> {modal.selectedCue.cue_instrus} */}
        <strong>Instruments: </strong> {modal.selectedCue.cue_instrus_edit}
      </div>
      <div className='modal-category-select' onClick={handleShowKeywords}>
        <strong>Keywords: </strong> {modal.selectedCue.cue_desc}
      </div>
      <div className='modal-category-select' onClick={handleShowTempos}>
        <strong>Tempo: </strong> {tempos.filter(tempo => tempo.tempo_id === modal.selectedCue.tempo_id).map(obj => obj.tempo_name)}
      </div>
      <div className='modal-category-select' onClick={handleShowRating}>
        <strong>Rating: </strong> {modal.selectedCue.cue_rating}
      </div>
      { selectedLibrary.libraryName === 'background-instrumentals' ?
      <div>
        <br/><div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_band_edit'>
        <strong texttype='sounds_like_band_edit'>Sounds Like Band: </strong> {modal.selectedCue.sounds_like_band_edit}
      </div>
      <br/><div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_film_edit'>
        <strong texttype='sounds_like_film_edit'>Sounds Like Film/TV: </strong> {modal.selectedCue.sounds_like_film_edit}
      </div>
      <br/><div className='modal-category-select' onClick={handleShowTextBox} texttype='sounds_like_composer_edit'>
        <strong texttype='sounds_like_composer_edit'>Sounds Like Composer: </strong> {modal.selectedCue.sounds_like_composer_edit}
      </div>
    </div>
      : null
    }
    </div>
  )}

const mapStateToProps = (state) => {
  return {
    composersIA: state.composersBI,
    instrumentsIA: state.instrumentsBI,
    keywordsIA: state.keywordsBI,
    modal: state.modal,
    releasesIA: state.releasesIA,
    ratings: state.ratings,
    selectedCategories: state.selectedCategories,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles,
    styles: state.styles,
    tempos: state.tempos,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  selectHeader,
  showCategories,
  showInstruments,
  showKeywords,
  showRatings,
  showStyles,
  showTempos,
  showTextBox
}


export default connect(mapStateToProps, mapDispatchToProps)(LeftColumn);
