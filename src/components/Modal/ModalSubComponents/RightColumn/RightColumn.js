import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import Categories from './Categories/Categories';
import Instruments from './Instruments/Instruments';
import Keywords from './Keywords/Keywords';
import Ratings from './Ratings/Ratings';
import Status from './Status/Status';
import Styles from './Styles/Styles';
import Tempos from './Tempos/Tempos';
import TextBox from './TextBox';
import { clearSearch, handleSearchFilter, handleUpdateModal, handleUpdateSoundsLike } from '../../../../actions/modalActions';

const RightColumn = (props) => {
  let { clearSearch, handleSearchFilter, handleUpdateSoundsLike,
        modal, selectedLibrary,
        handleUpdateModal
  } = props;

  let searchFilter = modal.searchFilter;

  const showingRightColumnOptions = modal.showCategories || modal.showInstruments || modal.showKeywords
    || modal.showRating || modal.showStatus || modal.showStyles || modal.showTempos;

  const [limitTo, setLimit] = useState(15);

  const loadMore = () => {
    setLimit(limitTo + 15)
  }

// **********************************************************************************************************
// SEARCH BAR FUNCTIONS
// **********************************************************************************************************
  const RightColumnHeader = () => {
    if(showingRightColumnOptions){
      return (
        <strong>
            You are Editing {modal.showCategories && 'Categories' || modal.showInstruments && 'Instruments'
            || modal.showKeywords && 'Keywords' || modal.showRating && 'Rating' ||  modal.showStatus && 'Status'
            ||  modal.showStyles && 'Styles' || modal.showTempos && 'Tempos' }
        </strong>
    )} else {
      return null
    }
  }

  // const SearchBar = () =>
  //   modal.showInstruments || modal.showKeywords ?
  //     <div>
  //       <br/>
  //       <input
  //         className='search-bar'
  //         id='keyword-instrument-filter'
  //         name='keyword-instrument-filter'
  //         onChange={ e => handleSearchFilter(e.target.value)}
  //         onKeyPress={e => e.key === 'Enter' && handleAddKeyword() }
  //         onSubmit={handleAddKeyword}
  //         type='text'
  //         value={searchFilter}
  //       />
  //       <br/>
  //       <button onClick={handleAddKeyword}>Add</button>
  //       <button onClick={handleClearSearch}>Clear</button>
  //     </div> :
  //   null;

  const handleClearSearch = () => {
    clearSearch()
    document.getElementById('keyword-instrument-filter').value = '';
  }

// **********************************************************************************************************
// TEXTBOX FUNCTIONS
// **********************************************************************************************************
  const SubmitTextButton = () => (
    <button type="submit" onClick={handleSubmitTextBox} onSubmit={handleSubmitTextBox}>Add</button>
  )

  const handleSubmitTextBox = (event) => {
    event.preventDefault();
    const soundsLike = {
      value: document.getElementsByClassName('text-area')[0].value,
      type: document.getElementsByClassName('text-area')[0].getAttribute('texttype')
    }
    // console.log(88, soundsLike)
    handleUpdateSoundsLike(soundsLike);
  }

  const handleChange = (event) => {
    let updatedCue = modal.selectedCue;
    switch (event.target.getAttribute('texttype')) {
      case 'sounds_like_band_edit':
        handleUpdateModal({ ...updatedCue, sounds_like_band_edit: event.target.value})
        break;
      case 'sounds_like_film_edit':
        handleUpdateModal({ ...updatedCue, sounds_like_film_edit: event.target.value})
        break;
      case 'sounds_like_composer_edit':
        handleUpdateModal({ ...updatedCue, sounds_like_composer_edit: event.target.value})
        break;
    }
  }

  const renderTextBox = (textType) => {
    switch (textType) {
      case 'sounds_like_band_edit':
        return <div>
                 <br/><strong> Sounds like Bands: </strong>
                 <form onSubmit={handleSubmitTextBox}>
                   <TextBox
                      handleChange={handleChange}
                      onSubmit={handleSubmitTextBox}
                      value={modal.selectedCue.sounds_like_band_edit || ''} // if value is null set it to an empty string
                      textType='sounds_like_band_edit'
                    />
                   <SubmitTextButton/>
                 </form>
               </div>;
        break;
      case 'sounds_like_film_edit':
        return <div>
                <br/><strong> Sounds like Films: </strong>
                <form onSubmit={handleSubmitTextBox}>
                  <TextBox
                    handleChange={handleChange}
                    onSubmit={handleSubmitTextBox}
                    value={modal.selectedCue.sounds_like_film_edit || ''} // if value is null set it to an empty string
                    textType='sounds_like_film_edit'
                  />
                  <SubmitTextButton/>
                </form>
              </div>;
        break;
      case 'sounds_like_composer_edit':
        return <div>
                <br/><strong> Sounds like Composers: </strong>
                <form onSubmit={handleSubmitTextBox}>
                  <TextBox
                    handleChange={handleChange}
                    onSubmit={handleSubmitTextBox}
                    value={modal.selectedCue.sounds_like_composer_edit || ''}  // if value is null set it to an empty string
                    textType='sounds_like_composer_edit'
                  />
                  <SubmitTextButton/>
                </form>
                </div>;
        break;
      }
  }

// **********************************************************************************************************
// INFINITE SCROLL FUNCTIONS
// **********************************************************************************************************

const InfiniteScrollContent = () => {
  return (
    modal.showCategories && <Categories/> ||
    modal.showInstruments && <Instruments limitTo={limitTo}/> ||
    modal.showKeywords && <Keywords limitTo={limitTo}/> ||
    modal.showRating && <Ratings/> ||
    modal.showStatus && <Status/> ||
    modal.showStyles && <Styles/> ||
    modal.showTempos && <Tempos/>
  )
}

// -------------------------------------------------------------------------------------------------------------
// If the InfiniteScroll component is present, this function will get called every time this RightColumn component renders.
  let scrollToTop = () => {
    const div = document.getElementsByClassName('scrollableModalDiv')[0];
    div ? div.scrollTop = 0 : null;
  }
  // document.getElementsByClassName('scrollableModalDiv')[0] && scrollToTop() // uncomment to trigger scrollingToTop upon rerender
// -------------------------------------------------------------------------------------------------------------


// -------------------------------------------------------------------------------------------------------------
  return(
    <div className='modal-right-column'>
      <RightColumnHeader/>
      {modal.showInstruments || modal.showKeywords ?
        <div>
          <br/>
          <input
            className='search-bar'
            id='keyword-instrument-filter'
            name='keyword-instrument-filter'
            onChange={ e => handleSearchFilter(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && handleAddKeyword() }
            onSubmit={handleAddKeyword}
            type='text'
            value={searchFilter}
          />
          <br/>
          <button onClick={handleAddKeyword}>Add</button>
          <button onClick={handleClearSearch}>Clear</button>
        </div> :
        null
      }
      <br/>
      <br/>
      <div>
        { modal.showText ?
          renderTextBox(event.target.getAttribute('texttype')) :
          showingRightColumnOptions ?
          <div style={{overflowY: 'hidden', height: '550px'}}>
            <InfiniteScroll
              className='scrollableModalDiv'
              dataLength={limitTo}
              hasMore={true}
              height={520}
              id='scrollableModalDiv'
              next={loadMore}
              endMessage={
                <p style={{textAlign: 'center'}}>
                  <b></b>
                </p>}
            >
              <InfiniteScrollContent/>
            </InfiniteScroll>
          </div> :
          <div> Select a Category on the Left to Edit It. </div>
        }
      </div>
    </div>
  )};
// -------------------------------------------------------------------------------------------------------------
const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    selectedLibrary: state.selectedLibrary
  }
}

const mapDispatchToProps = {
  clearSearch,
  handleSearchFilter,
  handleUpdateModal,
  handleUpdateSoundsLike
}

export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);












const handleAddKeyword = () => {
  // let searchQuery = modal.searchFilter;
  // if(searchQuery.trim() !== ''){ // if the searchQuery isn't blank
  //    // if we are editing instruments
  //   if(modal.showInstruments && selectedInstruments.find(inst => inst.instru_name.toLowerCase().trim() === searchQuery.toLowerCase().trim()) === undefined){
  //   // addInstrumentBI will add the search query to our SQL database
  //     addInstrumentBI(searchQuery, selectedInstruments, (newInstrument) => {
  //       setInstruments(newInstrument)
  //       // add searchQuery to our instrument's list,
  //       // AND the selectedCue.cue_instrus_edit,
  //       // AND add the id to selectedCue.key_id_arry
  //     })
  //   } else if (modal.showKeywords && selectedKeywords.find(keyword => keyword.keyword_name.toLowerCase().trim() === searchQuery.toLowerCase().trim()) === undefined){
  //
  //     // 666 **** !!!!! THIS IS WHERE I LEFT OFF !!!!!!!
  //     asyncAddKeywordBI(searchQuery, selectedKeywords, (newKeyword) => {
  //       selectKeywords([...selectedKeywords, newKeyword], (x) => {
  //
  //       })
  //       setKeyword(newKeyword, [...selectedKeywords, newKeyword])
  //     })
  //   } else {
  //     alert('That keyword already exists');
  //   }
  // }
}
