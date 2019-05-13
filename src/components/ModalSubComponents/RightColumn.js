import React, { useState } from 'react';
import {connect} from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import TextBox from './TextBox';
import { clearSearch, handleSearchFilter, updateData } from '../../actions/modalActions';
import { saveIAKeyword } from '../../actions/IndieArtistsActions/keywordsActionsIA';
import { selectCategory } from '../../actions/selectedCategoriesActions';
import { selectInstruments } from '../../actions/selectedInstrumentsActions';
import { selectKeywords } from '../../actions/selectedKeywordsActions';
import { selectRating } from '../../actions/ratingsActions';
import { selectStyle } from '../../actions/selectedStylesActions';
import { selectTempos } from '../../actions/temposActions';
import { updateTracks } from '../../actions/IndieArtistsActions/tracksActions';


const RightColumn = (props) => {
  let { handleSearchFilter, modal, ratings, saveIAKeyword, searchFilter, selectedCategories, selectCategory, selectedInstruments,
        selectInstruments, selectedLibrary, selectedKeywords, selectKeywords, selectedRating, selectRating, selectedStyles, selectStyle,
        selectTempos, tempos, tracks, updateTracks, updateData
  } = props;

  // const [isPlaying, setPlayback] = useState(props.isPlaying);
  //
  //
  // const playbackToggle = () => { // check for onkeydown event on spacebar to pause and playback tracks
  //    let searchBars = document.getElementsByClassName('search-bar');
  //
  //    if(searchBars & document.activeElement){
  //      document.onkeydown = (evt) => {
  //        console.log(32, evt)
  //        evt = evt || window.event; // if event is keycode === 32 ('Space') and both search bars aren't in focus, toggle isPlaying
  //        if ((evt.keyCode === 32) && ((document.activeElement.name !== searchBars[0].name) && (document.activeElement.name !== searchBars[1].name))) {
  //          togglePlayback(props.isPlaying)
  //        }
  //      }
  //    }
  //  }
  //
  //  playbackToggle();
  // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************
  const renderCategories = () => {
    let allCategories = selectedCategories;
    let selectedCue = modal.selectedCue;
    // if there is a category set for the cue...
      allCategories.forEach(category => {
          category.cat_id === selectedCue.cat_id
            ? category.selected = true
            : null
      })
      // checks to see if the category is selected or not
      // and we return the div with className with corresponding SASS.
      return allCategories.map(obj =>
        <div key={`${obj.cat_name} - ${obj.cat_id}`}
          className={obj.selected ? 'modal-selected' : 'modal-select'}
          id={obj.cat_id}
          onClick={() => setCategory(obj)}>
          {obj.cat_name}
        </div>
      )
    }
  // -------------------------------------------------------------------------------------------------------------
  const setCategory = (newCategory) => {
    let allCategories = selectedCategories;
    let updatedCue = modal.selectedCue;
    // if the selected cue has a category
    if (updatedCue.cat_id !== 19){
      if(updatedCue.cat_id !== newCategory.cat_id){
        updatedCue.cat_id = newCategory.cat_id;
        // change the selected value of the category that was selected to true
        for (let cat in allCategories) {
          if (allCategories[cat].cat_id === newCategory.cat_id) {
            allCategories[cat].selected = true;
          } else {
            // this makes sure only one category can be selected at a time
            allCategories[cat].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectCategory(allCategories)
        updateTracks(updatedCue, tracks) // must come last
      } else {
        // if newCategory is already the cat_id, then they are clicking it again to remove it
        updatedCue.cat_id = 19;
        for (let x in allCategories) {
          if (allCategories[x].cat_id === newCategory.cat_id) {
            allCategories[x].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectCategory(allCategories)
        updateTracks(updatedCue, tracks)
      }
    // else if the selected cue has no category, add it
    } else {
      updatedCue.cat_id = newCategory.cat_id;
      for (let x in allCategories) {
        if (allCategories[x].cat_id === newCategory.cat_id) {
          allCategories[x].selected = true;
        }
      }
      updateData(modal, updatedCue)
      selectCategory(allCategories)
      updateTracks(updatedCue, tracks)
    }
  }
  // **********************************************************************************************************
  // STYLES FUNCTIONS
  // **********************************************************************************************************
  const renderStyles = () => {

    let allStyles = selectedStyles.filter(style =>
      // this function checks to see if the searchFilterQuery appears at all
      // in any of the style names, and returns a filtered array
        style.style_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
    let selectedCue = modal.selectedCue;
    // if there is a category set for the cue...
    if (selectedCue.style_id !== 147) {
      allStyles.forEach(style => {
          style.style_id === selectedCue.style_id
            ? style.selected = true
            : null
      })
      let newStyleArray = allStyles.filter(style => style.selected === true).concat(allStyles.filter(style => style.selected === false))
      // checks to see if the category is selected or not
      // and we return the div with className with corresponding SASS.
      let stylesDivs = newStyleArray.map(obj =>
        <div key={`${obj.style_name} - ${obj.style_id}`}
          className={obj.selected ? 'modal-selected' : 'modal-select'}
          id={obj.style_id}
          onClick={() => setStyle(obj)}>
          {obj.style_name}
        </div>
      )
      // add some empty rows to force push data into margins
      for(let x = 0; x < 5; x++){
        stylesDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
      }
      return stylesDivs;
    } else {
      // if there is no category just render the normal divs
      let allStyles = selectedStyles.filter(style =>
        style.style_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
        let stylesDivs = allStyles.map(obj =>
          <div key={`${obj.style_name} - ${obj.style_id}`}
            className={obj.selected ? 'modal-selected' : 'modal-select'}
            id={obj.style_id}
            onClick={() => setStyle(obj)}>
            {obj.style_name}
          </div>
        )
        // add some empty rows to force push data into margins
        for(let x = 0; x < 5; x++){
          stylesDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
        }
        return stylesDivs;
    }
  }
  // -------------------------------------------------------------------------------------------------------------
  const setStyle = (newStyle) => {
    let allStyles = selectedStyles;
    let updatedCue = modal.selectedCue;
    // if the selected cue has a style
    if (updatedCue.style_id !== 147){
      if(updatedCue.style_id !== newStyle.style_id){
        updatedCue.style_id = newStyle.style_id;
        // change the selected value of the style that was selected to true
        for (let cat in allStyles) {
          if (allStyles[cat].style_id === newStyle.style_id) {
            allStyles[cat].selected = true;
          } else {
            // this makes sure only one style can be selected at a time
            allStyles[cat].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectStyle(allStyles)
        updateTracks(updatedCue, tracks)
      } else {
        // if newStyle is already the style_id, then they are clicking it again to remove it
        updatedCue.style_id = 147;
        for (let x in allStyles) {
          if (allStyles[x].style_id === newStyle.style_id) {
            allStyles[x].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectStyle(allStyles)
        updateTracks(updatedCue, tracks)
      }
    // else if the selected cue has no style, add it
    } else {
      updatedCue.style_id = newStyle.style_id;
      for (let x in allStyles) {
        if (allStyles[x].style_id === newStyle.style_id) {
          allStyles[x].selected = true;
        }
      }
      updateData(modal, updatedCue)
      selectStyle(allStyles)
      updateTracks(updatedCue, tracks)
    }
  }
  // **********************************************************************************************************
  // INSTRUMENTS FUNCTIONS
  // **********************************************************************************************************
  const renderInstruments = () => {

    // if there is a search happening and instruments in the selectedCue
    if (modal.searchFilter !== '' && modal.selectedCue.cue_instrus_edit) {
      let allInstruments = selectedInstruments.filter(instrument =>
        // this function checks to see if the searchFilterQuery appears at all
        // in any of the instrument names, and returns a filtered array
          instrument.instru_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
      // grab all the insturments from the selectedCue
      let instrumentsArray = modal.selectedCue.cue_instrus_edit.split(',');
      // change the selected boolean to true for those insturments
      instrumentsArray.forEach(instrument => {
        for (let i in allInstruments) {
          allInstruments[i].instru_name.toLowerCase().trim() === instrument.toLowerCase().trim()
            ? allInstruments[i].selected = true
            : null
          allInstruments[i].instru_name = allInstruments[i].instru_name.charAt(0).toUpperCase() + allInstruments[i].instru_name.slice(1)
        }
      })
      let newInstArray = allInstruments.filter(instrument => instrument.selected === true).concat(allInstruments.filter(instrument => instrument.selected === false))
      let instrumentsDivs = newInstArray.map(obj =>
        <div key = {`${obj.instru_id}`}
          className = {obj.selected ? 'modal-selected' : 'modal-select'}
          count={obj.instru_cnt}
          id = {obj.instru_id}
          onClick = {() => setInstruments(obj.instru_name)} >
          {obj.instru_name}
        </div>
      )
      if(instrumentsDivs.length === 0){
        return <div>
                  <br/>Sorry, Your Search Returned No Matches.
                  <br/>Use The Button Above To Add A New Instrument
              </div>
      } else {
        // add some empty rows to force push data into margins
        for(let x = 0; x < 5; x++){
          instrumentsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
        }
        return instrumentsDivs;
      }
    } else if (modal.searchFilter === '' && modal.selectedCue.cue_instrus_edit){
      // checks to see if the instrument in our query filtered array is selected or not
      // and we return the div with className with corresponding css styling.
      let allInstruments = selectedInstruments.filter(instrument =>
          instrument.instru_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
      // grab all the insturments from the selectedCue
      let instrumentsArray = modal.selectedCue.cue_instrus_edit.split(',');
      // change the selected boolean to true for those insturments
      instrumentsArray.forEach(instrument => {
        for (let i in allInstruments) {
          allInstruments[i].instru_name.toLowerCase().trim() === instrument.toLowerCase().trim()
            ? allInstruments[i].selected = true
            : null
          allInstruments[i].instru_name = allInstruments[i].instru_name.charAt(0).toUpperCase() + allInstruments[i].instru_name.slice(1)
        }
      })
      let newInstArray = allInstruments.filter(instrument => instrument.selected === true).concat(allInstruments.filter(instrument => instrument.selected === false))

      let instrumentsDivs = newInstArray.map(obj =>
        <div key = {`${obj.instru_id}`}
          className = {obj.selected ? 'modal-selected' : 'modal-select'}
          count={obj.instru_cnt}
          id = {obj.instru_id}
          onClick = {() => setInstruments(obj.instru_name)} >
          {obj.instru_name}
        </div>
      )
      if(instrumentsDivs.length === 0){
        return <div>
                  <br/>Sorry, Your Search Returned No Matches.
                  <br/>Use The Button Above To Add A New Instrument
              </div>
      } else {
        // add some empty rows to force push data into margins
        for(let x = 0; x < 5; x++){
          instrumentsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
        }
        return instrumentsDivs;
      }
    } else {
      //  if the search query is empty and there are no instruments in the selectedCue
      let allInstruments = selectedInstruments.filter(instrument =>
         instrument.instru_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
         let instrumentsDivs = allInstruments.map(obj =>
           <div key = {`${obj.instru_id}`}
             className = {obj.selected ? 'modal-selected' : 'modal-select'}
             count={obj.instru_cnt}
             id = {obj.instru_id}
             onClick = {() => setInstruments(obj.instru_name)} >
             {obj.instru_name.charAt(0).toUpperCase() + obj.instru_name.slice(1)}
           </div>
         )
         if(instrumentsDivs.length === 0){
           return <div>
                     <br/>Sorry, Your Search Returned No Matches.
                     <br/>Use The Button Above To Add A New Instrument
                 </div>
         } else {
           // add some empty rows to force push data into margins
           for(let x = 0; x < 5; x++){
             instrumentsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
           }
           return instrumentsDivs;
         }
    }
  }
  // -------------------------------------------------------------------------------------------------------------
  const setInstruments = (instrument) => {
    let allInstruments = selectedInstruments;
    let newInstrument = instrument;
    let updatedCue = modal.selectedCue;
    // if there is a are instruments selected already for the track
    if (updatedCue.cue_instrus_edit !== null && updatedCue.cue_instrus_edit !== '') {
      // let selectedInstruments = updatedCue.cue_instrus_edit
      let selectedInstruments = updatedCue.cue_instrus_edit.split(',').map(inst => inst.trim())
      if (selectedInstruments.indexOf(newInstrument) === -1) {
        updatedCue.cue_instrus_edit = `${selectedInstruments.join(', ')}, ${newInstrument}`;
        for (let inst in allInstruments) {
          if (allInstruments[inst].instru_name === newInstrument) {
            allInstruments[inst].selected = true;
          }
        }
        selectInstruments(allInstruments)
        updateData(modal, updatedCue)
        updateTracks(updatedCue, tracks)
      } else {
        // if the instrument IS in the selectedCue metadata already, we remove it
        let selectedIndex = selectedInstruments.indexOf(newInstrument);
        let i = selectedIndex;
        selectedInstruments.splice(i, 1)
        updatedCue.cue_instrus_edit = selectedInstruments.join(', ').trim();
        for (let inst in allInstruments) {
          if (allInstruments[inst].instru_name === newInstrument) {
            allInstruments[inst].selected = false;
          }
        }
        selectInstruments(allInstruments)
        updateData(modal, updatedCue)
        updateTracks(updatedCue, tracks)
      }
    } else {
      updatedCue.cue_instrus_edit = `${newInstrument}`;
      for (let inst in allInstruments) {
        if (allInstruments[inst].instru_name === newInstrument) {
          allInstruments[inst].selected = true;
        }
      }
      selectInstruments(allInstruments)
      updateData(modal, updatedCue)
      updateTracks(updatedCue, tracks)
    }
  }
  // **********************************************************************************************************
  // KEYWORDS FUNCTIONS
  // **********************************************************************************************************
  const renderKeywords = () => {

    // if there is a description for the cue and a search Filter
    if (modal.searchFilter !=='' && modal.selectedCue.cue_desc) {
      let allKeywords = selectedKeywords.filter(keyword =>
        // filter the array by searchFilterQuery
      keyword.key_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
      let selectedCueKeywords = modal.selectedCue.cue_desc.split(',')
      // change the selected boolean to true for those keywords
      selectedCueKeywords.forEach(keyword => {
        for (let i in allKeywords) {
          allKeywords[i].key_name.toLowerCase().trim() === keyword.toLowerCase().trim()
            ? allKeywords[i].selected = true
            : null
          allKeywords[i].key_name = allKeywords[i].key_name.charAt(0).toUpperCase() + allKeywords[i].key_name.slice(1)
        }
      })
      let newKeywordArray = allKeywords.filter(keyword => keyword.selected === true).concat(allKeywords.filter(keyword => keyword.selected === false))
      // checks to see if the keyword is selected or not and we return the div with className with corresponding SASS.
      let keywordsDivs = newKeywordArray.map(obj =>
        <div key = {`${obj.key_id}`}
          className = {obj.selected ? 'modal-selected' : 'modal-select'}
          count={obj.key_cnt}
          id = {obj.key_id}
          onClick = {() => setKeyword(obj)}>
          {obj.key_name}
        </div>
        )
        if(keywordsDivs.length === 0){
          return <div>
                    <br/>Sorry, Your Search Returned No Matches.
                    <br/>Use The Button Above To Add A New Keyword.
                </div>
        } else {
          // add some empty rows to force push data into margins
          for(let x = 0; x < 5; x++){
            keywordsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
          }
          return keywordsDivs;
        }
    } else if (modal.searchFilter === '' && modal.selectedCue.cue_desc){
      let allKeywords = selectedKeywords.filter(keyword =>
        // filter the array by searchFilterQuery
      keyword.key_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
      let selectedCueKeywords = modal.selectedCue.cue_desc.split(',');
      // change the selected boolean to true for those keywords
      selectedCueKeywords.forEach(keyword => {
        for (let i in allKeywords) {
          allKeywords[i].key_name.toLowerCase().trim() === keyword.toLowerCase().trim()
            ? allKeywords[i].selected = true
            : null
          allKeywords[i].key_name = allKeywords[i].key_name.charAt(0).toUpperCase() + allKeywords[i].key_name.slice(1)
        }
      })
      let newKeywordArray = allKeywords.filter(keyword => keyword.selected === true).concat(allKeywords.filter(keyword => keyword.selected === false))
      // checks to see if the keyword is selected or not and we return the div with className with corresponding SASS.
      let keywordsDivs = newKeywordArray.map(obj =>
        <div key = {`${obj.key_id}`}
          className = {obj.selected ? 'modal-selected' : 'modal-select'}
          count={obj.key_cnt}
          id = {obj.key_id}
          onClick = {() => setKeyword(obj)}>
          {obj.key_name}
        </div>
        )
        if(keywordsDivs.length === 0){
          return <div>
                    <br/>Sorry, Your Search Returned No Matches.
                    <br/>Use The Button Above To Add A New Keyword.
                </div>
        } else {
          // add some empty rows to force push data into margins
          for(let x = 0; x < 5; x++){
            keywordsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
          }
          return keywordsDivs;
        }
    } {
      let allKeywords = selectedKeywords.filter(keyword =>
        keyword.key_name.toLowerCase().indexOf(modal.searchFilter.toLowerCase()) !== -1)
      // if there is no description just render the normal divs
      let keywordsDivs = allKeywords.map(obj =>
        <div key = {`${obj.key_id}`}
          className = {obj.selected ? 'modal-selected' : 'modal-select'}
          count={obj.key_cnt}
          id = {obj.key_id}
          onClick = {() => setKeyword(obj)}>
          {obj.key_name.charAt(0).toUpperCase() + obj.key_name.slice(1)}
        </div>
        )
        if(keywordsDivs.length === 0){
          return <div>
                    <br/>Sorry, Your Search Returned No Matches.
                    <br/>Use The Button Above To Add A New Keyword.
                </div>
        } else {
          // add some empty rows to force push data into margins
          for(let x = 0; x < 5; x++){
            keywordsDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
          }
          return keywordsDivs;
        }
    }
  }
  // -------------------------------------------------------------------------------------------------------------
  const setKeyword = (keywordObject) => {
    let allKeywords = selectedKeywords;
    let newKeyword = keywordObject;
    newKeyword.key_name = newKeyword.key_name.charAt(0).toUpperCase() + newKeyword.key_name.slice(1);
    let updatedCue = modal.selectedCue;
    let selectedKeyIdArray = updatedCue.key_id_arry.split(',');

    // if the selected cue has keywords
    if (updatedCue.cue_desc !== null && updatedCue.cue_desc !== '') {
      // turn the cue_desc into an array
      let selectedCueKeywords = updatedCue.cue_desc.split(',').map(keys => keys.trim());
      // check to see if the newKeyword already exsits in the cue_description
      if (selectedCueKeywords.indexOf(newKeyword.key_name) === -1) {
        // if it doesn't, we will add it
        updatedCue.cue_desc = `${selectedCueKeywords.join(', ')}, ${newKeyword.key_name}`;
        for (let keyword in allKeywords) {
          if (allKeywords[keyword].key_name === newKeyword.key_name) {
            allKeywords[keyword].selected = true;
            allKeywords[keyword].key_cnt ++; // key_cnt goes up
            newKeyword = allKeywords[keyword];
          }
        }
        // also add the key_id to the key_id array
        selectedKeyIdArray.push(keywordObject.key_id);
        updatedCue.key_id_arry = selectedKeyIdArray.join(',');
        updateKeywords(allKeywords, tracks, modal, newKeyword, updatedCue);
      } else {
        // if newKeyword is already in the cue_desc, then they are clicking it again to remove it
        selectedKeyIdArray.splice(selectedKeyIdArray.indexOf(keywordObject.key_id), 1);
        updatedCue.key_id_arry = selectedKeyIdArray.join(',');
        selectedCueKeywords.splice(selectedCueKeywords.indexOf(newKeyword.key_name), 1);
        updatedCue.cue_desc = selectedCueKeywords.join(', ');
        for (let keyword in allKeywords) {
          if (allKeywords[keyword].key_name === newKeyword.key_name) {
            allKeywords[keyword].selected = false;
            allKeywords[keyword].key_cnt --; // key_cnt goes down
            newKeyword = allKeywords[keyword];
          }
        }
        updateKeywords(allKeywords, tracks, modal, newKeyword, updatedCue);
      }
      // else if the selected cue has no keywords, add it to the description
    } else {
      updatedCue.cue_desc = `${newKeyword.key_name}`;
      for (let keyword in allKeywords) {
        if (allKeywords[keyword].key_name === newKeyword.key_name) {
          allKeywords[keyword].selected = true;
          allKeywords[keyword].key_cnt ++; // key_cnt goes up
          newKeyword = allKeywords[keyword];
        }
      }
      selectedKeyIdArray.push(keywordObject.key_id);
      updatedCue.key_id_arry = selectedKeyIdArray.join(',');
      updateKeywords(allKeywords, tracks, modal, newKeyword, updatedCue);
    }
  }

  // this function handles the dispatches to modify our redux store and SQL queries
  let updateKeywords = (allKeywords, tracks, modal, newKeyword, updatedCue) => {
    if(selectedLibrary.libraryName === 'independent-artists'){
      saveIAKeyword(newKeyword, allKeywords);
      updateData(modal, updatedCue);
      selectKeywords(allKeywords);
      updateTracks(updatedCue, tracks);
    }
  }
  // **********************************************************************************************************
  // TEMPOS FUNCTIONS
  // **********************************************************************************************************
  const renderTempos = () => {

    let allTempos = tempos;
    let selectedCue = modal.selectedCue;
    // if there is a tempo set for the cue...
    if (selectedCue.tempo_id !== 28) {
      allTempos.forEach(tempo => {
          tempo.tempo_id === selectedCue.tempo_id
            ? tempo.selected = true
            : null
      })
      // checks to see if the tempo is selected or not
      // and we return the div with className with corresponding SASS.
      return allTempos.map(obj =>
        <div key={`${obj.tempo_id}`}
          className={obj.selected ? 'modal-selected' : 'modal-select'}
          id={obj.tempo_id}
          onClick={() => setTempo(obj)}>
          {obj.tempo_name}
        </div>
      )
    } else {
      // if there is no tempo just render the normal divs
      return allTempos.map(obj =>
        <div
          key={`${obj.tempo_id}`}
          className='modal-select'
          id={obj.tempo_id}
          onClick={() => setTempo(obj)}>
          {obj.tempo_name}
        </div>)
    }
  }
  // -------------------------------------------------------------------------------------------------------------
  const setTempo = (newTempo) => {
    let allTempos = tempos;
    let updatedCue = modal.selectedCue;
    // if the selected cue has a tempo
    if (updatedCue.tempo_id !== 28){
      if(updatedCue.tempo_id !== newTempo.tempo_id){
        updatedCue.tempo_id = newTempo.tempo_id;
        // change the selected value of the tempo that was selected to true
        for (let tempo in allTempos) {
          if (allTempos[tempo].tempo_id === newTempo.tempo_id) {
            allTempos[tempo].selected = true;
          } else {
            // this makes sure only one tempo can be selected at a time
            allTempos[tempo].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectTempos(allTempos)
        updateTracks(updatedCue, tracks)
      } else {
        // if newTempo is already the tempo_id, then they are clicking it again to remove it
        updatedCue.tempo_id = 28;
        for (let x in allTempos) {
          if (allTempos[x].tempo_id === newTempo.tempo_id) {
            allTempos[x].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectTempos(allTempos)
        updateTracks(updatedCue, tracks)
      }
    // else if the selected cue has no tempo, add it
    } else {
      updatedCue.tempo_id = newTempo.tempo_id;
      for (let x in allTempos) {
        if (allTempos[x].tempo_id === newTempo.tempo_id) {
          allTempos[x].selected = true;
        }
      }
      updateData(modal, updatedCue)
      selectTempos(allTempos)
      updateTracks(updatedCue, tracks)
    }
  }
  // **********************************************************************************************************
  // RATINGS FUNCTIONS
  // **********************************************************************************************************
  const renderRatings = () => {

    let allRatings = ratings;
    let selectedCue = modal.selectedCue;

    if(selectedCue.cue_rating !== null){
      allRatings.forEach(rating => {
        rating.value === selectedCue.cue_rating
          ? rating.selected = true
          : null
      })
      return allRatings.map(rating =>
        <div
          id={rating.value}
          key={rating.value}
          className={rating.selected ? 'modal-selected' : 'modal-select'}
          onClick={() => setRating(rating)}>{rating.value}
        </div>
      )
    } else {
      return allRatings.map(rating =>
        <div
          id={rating.value}
          key={rating.value}
          className='modal-select'
          onClick={() => setRating(rating)}
        > {rating.value}
        </div >
      )
    }
  }
// -------------------------------------------------------------------------------------------------------------
  const setRating = (newRating) => {
    let allRatings = ratings;
    let updatedCue = modal.selectedCue;
    if(updatedCue.cue_rating !== 0){
      if(updatedCue.cue_rating !== newRating.value){
        updatedCue.cue_rating = newRating.value;
        for(let x in allRatings){
          if (allRatings[x].value === newRating.value){
            allRatings[x].selected = true;
          } else {
            allRatings[x].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectRating(allRatings)
        updateTracks(updatedCue, tracks)
      } else {
        updatedCue.cue_rating === 0;
        for(let x in allRatings){
          if (allRatings[x].value === newRating.value){
            allRatings[x].selected = false;
          }
        }
        updateData(modal, updatedCue)
        selectRating(allRatings)
        updateTracks(updatedCue, tracks)
      }
    } else {
      updatedCue.cue_rating = newRating.value;
      for(let x in allRatings){
        if (allRatings[x].value === newRating.value){
          allRatings[x].selected = true;
        }
      }
      updateData(modal, updatedCue)
      selectRating(allRatings)
      updateTracks(updatedCue, tracks)
    }
  }
  // **********************************************************************************************************
  // TEXTBOX FUNCTIONS
  // **********************************************************************************************************
  const renderTextBox = (textType) => {
    switch (textType) {
      case 'sounds_like_band_edit':
        return <div><br/><strong> Sounds like Bands: </strong><TextBox handleChange={handleChange} value={modal.selectedCue.sounds_like_band_edit || ''} textType='sounds_like_band_edit'/></div>;
        break;
      case 'sounds_like_film_edit':
        return <div><br/><strong> Sounds like Films: </strong><TextBox handleChange={handleChange} value={modal.selectedCue.sounds_like_film_edit || ''} textType='sounds_like_film_edit'/></div>;
        break;
      case 'sounds_like_composer_edit':
        return <div><br/><strong> Sounds like Composers: </strong><TextBox handleChange={handleChange} value={modal.selectedCue.sounds_like_composer_edit || ''} textType='sounds_like_composer_edit'/></div>;
        break;
      }
  }

  const handleChange = (event) => {
    let updatedCue = modal.selectedCue;
    switch (event.target.getAttribute('texttype')) {
      case 'sounds_like_band_edit':
        updatedCue.sounds_like_band_edit = event.target.value;
        updateData(modal, updatedCue)
        break;
      case 'sounds_like_film_edit':
        updatedCue.sounds_like_film_edit = event.target.value;
        updateData(modal, updatedCue)
        break;
      case 'sounds_like_composer_edit':
        updatedCue.sounds_like_composer_edit = event.target.value;
        updateData(modal, updatedCue)
        break;
    }
  }
  // -------------------------------------------------------------------------------------------------------------
  const handleClearSearch = () => {
    handleSearchFilter('', modal)
    document.getElementById('search-filter').value = '';
  }
  // -------------------------------------------------------------------------------------------------------------
  const addKeyword = () => {
    // console.log(712, modal.searchFilter)
    // create a function that adds the new query to the SQL database.
    // set up an express post route.
  }

  // -------------------------------------------------------------------------------------------------------------
  let searchBar = modal.showInstruments || modal.showKeywords || modal.showStyles
    ?
      <div>
        <br/>
        <input
          className='search-bar'
          id='search-filter'
          name="search"
          onChange={ e => handleSearchFilter(e.target.value, modal) & (document.getElementsByClassName('scrollableModalDiv')[0] && scrollToTop())}
          onClick={() => {document.getElementById('search-filter') && document.getElementById('search-filter').focus()}}
          type="text"
          value={searchFilter}
        />
        <button onClick={addKeyword}>Add</button>
        <button onClick={handleClearSearch}>Clear</button>
        <br/>
        <br/>
      </div>
    :   <br/>;
  // -------------------------------------------------------------------------------------------------------------
    let scrollToTop = () => {
      const div = document.getElementsByClassName('scrollableModalDiv')[0];
      div ? div.scrollTop = 0 : null;
    }
    // If the InfiniteScroll component is present, this function will get called every time this RightColumn component renders.
    // document.getElementsByClassName('scrollableModalDiv')[0] && scrollToTop()
  // -------------------------------------------------------------------------------------------------------------
  return(
    <div className='modal-right-column'>
      {searchBar}
      <div>
        { modal.showText
          ? renderTextBox(event.target.getAttribute('texttype'))
          : modal.showCategories || modal.showStyles || modal.showInstruments ||
           modal.showKeywords || modal.showTempos || modal.showRating
             ?
               <div style={{overflowY: 'hidden', height: '550px'}}>
                 <InfiniteScroll
                   className='scrollableModalDiv'
                   dataLength={14}
                   hasMore={true}
                   height={600}
                   id='scrollableModalDiv'
                   endMessage={
                     <p style={{textAlign: 'center'}}>
                       <b></b>
                     </p>
                   }
                 >{modal.showCategories
                   ? renderCategories()
                   : modal.showStyles
                     ? renderStyles()
                     : modal.showInstruments
                       ? renderInstruments()
                       : modal.showKeywords
                         ? renderKeywords()
                         : modal.showTempos
                           ? renderTempos()
                           : modal.showRating
                             ? renderRatings()
                             : null}
                 </InfiniteScroll>
               </div>
             : null
        }
      </div>
    </div>
  )};
// -------------------------------------------------------------------------------------------------------------
const mapStateToProps = (state) => {
  return {
    isPlaying: state.isPlaying,
    modal: state.modal,
    ratings: state.ratings,
    searchFilter: state.searchFilter,
    selectedCategories: state.selectedCategories,
    selectedInstruments: state.selectedInstruments,
    selectedKeywords: state.selectedKeywords,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles,
    tempos: state.tempos,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  clearSearch,
  handleSearchFilter,
  saveIAKeyword,
  selectCategory,
  selectInstruments,
  selectKeywords,
  selectRating,
  selectStyle,
  selectTempos,
  updateTracks,
  updateData
}

export default connect(mapStateToProps, mapDispatchToProps)(RightColumn);
