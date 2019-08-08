import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Loader from '../Loader/Loader';
import { NavLink } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { withRouter } from "react-router";

const Footer = (props) => {
  let { downloadProgress, location, modal, selectedCategories,
        selectedLibrary, selectedStyles
      } = props;

  const [isPlaying, handleTogglePlayback] = useState(false);
  const [isPaused, pause] = useState(false);
  const [url, setUrl] = useState('/proc_music/mp3/DLM%20-%20Buckle%20Up%20v1%20(Full).mp3');
  const [selectedCue, selectCue] = useState({});
  const [currentPath, selectPath] = useState('/');

  const isEmpty = (selectedCue) => {
    for(let key in selectedCue) {
      if(selectedCue.hasOwnProperty(key))
        return false;
      }
    return true;
  }

  // The order of effects matters!!!!

  useEffect(() => {
    // if cue is not paused, cue has been selected, or cue_title has changed, play the selectedCue.
    isPaused || isEmpty(modal.selectedCue) || (selectedCue.cue_title === modal.selectedCue.cue_title)
      ? null
      : playSelectedCue(modal.selectedCue, selectedLibrary.libraryName)
  })

  useEffect(() => {
    // If the cue has been changed, unpause.
    // (Only check the title though because obviously other params will change)
    (modal.selectedCue) && (selectedCue.cue_title !== modal.selectedCue.cue_title) ? pause(false) : null;
  })

  useEffect(() => {
    currentPath === location.pathname
     ? null // Tracks the window location.
     : selectPath(location.pathname)
  })

  useEffect(() => {
    currentPath !== location.pathname && location.pathname === '/exports'
     ? handleTogglePlayback(false) // Stops the track from playing if switching back from /exports
     : null
  })

  useEffect(() => { // Always be checking to see if spacebar is being pressed
    playbackToggle();
  })

  useEffect(() => { // if the modal closes, reset selectedCue state.
    !modal.showModal && !isEmpty(selectedCue) ? selectCue({}) : null
  })

  const playbackToggle = () => {
    // Checks for onkeydown event on spacebar to pause and playback tracks
    document.onkeydown = (evt) => {
      let searchBars = Array.from(document.getElementsByClassName('search-bar'));
      let textFields = Array.from(document.getElementsByClassName('text-area'));
      searchBars = searchBars.concat(textFields);
      evt = evt || window.event;
      // If event is keycode === 32 ('Space') AND the search bars aren't in focus...
      if ((evt.keyCode === 32) && !searchBars.some(searchBar => searchBar.name === document.activeElement.name)) {
        // ...toggle isPlaying and isPaused.
        handleTogglePlayback(!isPlaying);
        pause(!isPaused);
      } else {
        null;
      }
    }
  }

  const playSelectedCue = (selectedCue, selectedLibrary) => { // this function generates the link to play the selected track

    // console.log(82, selectedCue)

    let genre = selectedCue.cat_id !== 19 ?
      selectedCategories.find(cat => cat.cat_id === selectedCue.cat_id).cat_name :
      '';

    let subGenre = selectedCue.style_id !== 147 ?
      selectedStyles.filter(style => style.style_id === selectedCue.style_id)[0].style_name :
      '';

    let noInstrumentalsubGenre = subGenre.replace(/\sInstrumentals/, '');

    // ? `http://www.dl-music.com/proc_music/mp3/DLM - ${selectedCue.cue_title}.mp3`
    // `http://www.dl-music.com/proc_music/mp3/IA - ${selectedCue.cue_title}.mp3`

    let urlPath =
      selectedCue.cue_id === 19 || selectedCue.style_id === 147
        ? selectedLibrary === 'background-instrumentals'
           ? `http://www.dl-music.com/proc_music/mp3/DLM - ${selectedCue.cue_title}.mp3`
           : selectedLibrary === 'independent-artists'
           ? `http://www.dl-music.com/proc_music/mp3/IA - ${selectedCue.cue_title}.mp3`
           : ''
        : selectedLibrary === 'background-instrumentals'
           ? `http://www.dl-music.com/mp3/${genre}/${subGenre}/DLM - ${selectedCue.cue_title}.mp3`
           : selectedLibrary === 'independent-artists'
           ? `http://www.dl-music.com/artist_music/ia_music/mp3/${genre}/${noInstrumentalsubGenre}/IA - ${selectedCue.cue_title}.mp3`
           : ''

    // console.log(111, urlPath)

    setUrl(urlPath.replace(/\s/mg, '%20'));

    console.log(114, urlPath.replace(/\s/mg, '%20'))

    // console.log(117, 'playSelectedCue');
    // this is where the cue gets selected, and will trigger
    selectCue(modal.selectedCue);
    pause(false);
    handleTogglePlayback(true);
  }

 let domains = ['/background-instrumentals', '/independent-artists', '/']

   return(
     <div className='footer'>
       { (domains.includes(location.pathname))
         ? <ReactPlayer
           config={{ file: {attributes: {controlsList: 'nodownload'}}}}
           controls={true}
           height={80}
           playing={isPlaying}
           style={{margin: '0 auto'}}
           url={url}
           width={500}
           />
         : location.pathname === '/exports'
           ?  <div>
             {parseFloat(downloadProgress) !== 100.00
               ? <h2 style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>Download Progress: {
            `${downloadProgress}%`}
               </h2>
               : <h2>Download Completed!</h2>
             }
             {parseFloat(downloadProgress) > 0.00
               && parseFloat(downloadProgress) < 100.00
                 ? <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                   <Loader/>
                   Your Download Will Be Done Shortly...
                   <Loader/>
                 </div>
                 : null
             }
           </div>
           : <Loader/>
       }
     </div>
  )
}

const mapStateToProps = (state) => {
  return {
    downloadProgress: state.downloadProgress,
    modal: state.modal,
    selectedCategories: state.selectedCategories,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles
  };
}

export default withRouter(connect(mapStateToProps)(Footer));
