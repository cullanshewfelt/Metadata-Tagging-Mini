import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import { withRouter } from "react-router";
import ReactPlayer from 'react-player'
import Loader from './Loader';
import { togglePlayback } from '../../actions/playbackActions';

class Footer extends React.Component {
   constructor(props) {
     super(props)
   }

   state = {
      currentPath: '/',
      isPlaying: this.props.isPlaying,
      selectedCue: {},
      url: 'http://www.dl-music.com/mp3/Drama%20Orchestral/Bitter%20Sweet/DLM%20-%20A%20Desperate%20Act.mp3'
   }

   isEmpty = (selectedCue) => {
      for(var key in selectedCue) {
        if(selectedCue.hasOwnProperty(key))
          return false;
      }
      return true;
    }

   playbackToggle = () => { // check for onkeydown event on spacebar to pause and playback tracks
      document.onkeydown = (evt) => {
        let searchBars = document.getElementsByClassName('search-bar');
        evt = evt || window.event; // if event is keycode === 32 ('Space') and both search bars aren't in focus, toggle isPlaying
        if(searchBars.length === 2){
          if ((evt.keyCode === 32) && ((document.activeElement.name !== searchBars[0].name) && (document.activeElement.name !== searchBars[1].name))) {
            this.props.togglePlayback(this.state.isPlaying);
            this.setState({isPlaying: !this.state.isPlaying});
          }
        } else if (searchBars.length === 3){
          if ((evt.keyCode === 32)
          && ((document.activeElement.name !== searchBars[0].name) && (document.activeElement.name !== searchBars[1].name) && (document.activeElement.name !== searchBars[2].name))) {
            this.props.togglePlayback(this.state.isPlaying);
            this.setState({isPlaying: !this.state.isPlaying});
          }
        }
      }
    }

   playSelectedCue = (selectedCue, selectedLibrary) => { // this function generates the link to play the selected track
     let { selectedCategories, selectedStyles } = this.props;
     let genre = selectedCategories.filter(cat => cat.cat_id === selectedCue.cat_id)[0].cat_name;
     let subGenre = selectedStyles.filter(style => style.style_id === selectedCue.style_id)[0].style_name;
     let noInstrumentalsubGenre = subGenre.replace(/\sInstrumentals/, '');
     let urlPath =
        selectedCue.cue_id === 19 || selectedCue.style_id === 147
          ? selectedLibrary === 'background-instrumentals'
             ? `http://www.dl-music.com/proc_music/mp3/${genre}/${subGenre}/DLM - ${selectedCue.cue_title}.mp3`
             : selectedLibrary === 'independent-artists'
             ? `http://www.dl-music.com/proc_music/mp3/${genre}/${noInstrumentalsubGenre}/IA - ${selectedCue.cue_title}.mp3`
             : ''
          : selectedLibrary === 'background-instrumentals'
             ? `http://www.dl-music.com/mp3/${genre}/${subGenre}/DLM - ${selectedCue.cue_title}.mp3`
             : selectedLibrary === 'independent-artists'
             ? `http://www.dl-music.com/artist_music/ia_music/mp3/${genre}/${noInstrumentalsubGenre}/IA - ${selectedCue.cue_title}.mp3`
             : ''
     this.setState({url: urlPath.replace(/\s/mg, '%20'), selectedCue: selectedCue, isPlaying: true})
     this.props.togglePlayback(this.state.isPlaying);
   }

   componentDidUpdate(){
     let { currentPath, selectedCue } = this.state;
     let { location, modal, selectedLibrary } = this.props;
    (selectedCue === modal.selectedCue) || this.isEmpty(modal.selectedCue)
       ? null
       : this.playSelectedCue(modal.selectedCue, selectedLibrary.libraryName)
    currentPath === location.pathname
      ? null
      : this.setState({currentPath: location.pathname})

    currentPath !== location.pathname && location.pathname === '/exports' && this.state.isPlaying
      ? this.props.togglePlayback({isPlaying: false}) // this is integral to stopping the track from playing if switching back from /exports
      : null

      this.playbackToggle() // always be checking to see if spacebar is being pressed
   }

   render(){
     let { downloadProgress, location } = this.props;
     // console.log(80, 'props.isPlaying', this.props.isPlaying);
     // console.log(81, 'state.isPlaying', this.state.isPlaying);

     return(
       <div className='footer'>
         { (location.pathname === '/background-instrumentals'
           || location.pathname === '/independent-artists'
           || location.pathname === '/'
         )
           ? <ReactPlayer
               config={{ file: {attributes: {controlsList: 'nodownload'}}}}
               controls={true}
               height={80}
               playing={this.props.isPlaying}
               style={{margin: '0 auto'}}
               url={this.state.url}
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
             : 'BLANK'
       }
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    downloadProgress: state.downloadProgress,
    isPlaying: state.isPlaying,
    modal: state.modal,
    selectedCategories: state.selectedCategories,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles
  };
}

const mapDispatchToProps = {
  togglePlayback
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
