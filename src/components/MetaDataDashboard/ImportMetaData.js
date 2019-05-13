import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { withRouter } from "react-router";
import moment from 'moment';
import Select from 'react-select';
import Loader from './SubComponents/Loader';

// this import contains all the export/download functions:
const exportTools = require('./MetaDataExportFunctions/ExportTools.js');

class ImportDashboard extends React.Component {
   constructor(props) {
     super(props)
   }

   state = {
     batchesDropDown: batchesDropDown,
     batchOrRelease: 'Background Instrumental Batch',
     downloadProgress: this.props.downloadProgress,
     inclusive: false,
     releaseFilter: 147,
     releasesDropDown: releasesDropDown,
     selectedOption: 'background-instrumentals'
   }


 componentDidMount (){
    document.title = 'DL Music | Export Portal | '
    this.props.asyncTracksFetch()
    this.props.asyncCuesFetch()

    if(this.props.composersBI.length === 0){
      this.props.initializeSelectedComposer(this.props.composersBI)
    }

    // initialize the library in case this is the landing page
    switch(this.props.selectedLibrary.libraryName){
      case 'background-instrumentals':
        // we reset releaseFilter to it's original state to avoid cues being filtered
        // when we switch libraries
        this.setState({releaseFilter: 147, batchOrRelease: 'Background Instrumental Batch',  selectedOption: 'background-instrumentals'})
        if(this.state.batchesDropDown.length === 0){
          this.setState({batchesDropDown: this.props.batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
            })})
        }
        this.props.asyncCuesFetch(cues => {
          this.props.initializeSelectedLibrary(cues, 'background-instrumentals')
        });
        break;
      case 'independent-artists':
        this.setState({batchesDropDown: this.props.releasesIA.map(rel => {
          return {value: rel.rel_id, label: rel.rel_num}
        }),  releaseFilter: 147, batchOrRelease: 'Indie Artist Release',  selectedOption: 'independent-artists'})
        this.props.asyncTracksFetch(tracks => {
          this.props.initializeSelectedLibrary(tracks, 'independent-artists')
        });
        break;
        case '':
          // we reset releaseFilter to it's original state to avoid cues being filtered
          // when we switch libraries
          this.setState({releaseFilter: 147, batchOrRelease: 'Background Instrumental Batch',  selectedOption: 'background-instrumentals'})
          if(this.state.batchesDropDown.length === 0){
            this.setState({batchesDropDown: this.props.batchesBI.map(rel => {
              return {value: rel.rel_id, label: rel.rel_num}
              })})
          }
          this.props.asyncCuesFetch(cues => {
            this.props.initializeSelectedLibrary(cues, 'background-instrumentals')
          });
          break;
      default:
        null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.downloadProgress !== this.state.downloadProgress){
      this.setState({downloadProgress: this.props.downloadProgress})
    }
    // this is initializing our selected composers by default once the API request is returned
    // I added this condition so that the user could start on any /url_path
    if(this.props.selectedComposers.length === 0){
      this.props.initializeSelectedComposer(this.props.composersBI)
    }
    // when our component updates we check to see if the state.selectedOption
    // is the name of the selected library, and then we render the
    // releasesDropDown from that library accodringly
    if(this.state.selectedOption !== this.props.selectedLibrary.libraryName){
      switch(this.props.selectedLibrary.libraryName){
        case 'background-instrumentals':
          this.setState({releasesDropDown: this.state.batchesDropDown.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147, selectedOption: 'background-instrumentals'})
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: this.props.releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147, selectedOption: 'independent-artists'})
          break;
        // default:
        // this.setState({releasesDropDown: this.props.batchesBI.map(rel => {
        //   return {value: rel.rel_id, label: rel.rel_num}
        // }), selectedOption: 'background-instrumentals', releaseFilter: 147})
        // break;
      }}
  }

  render(){
    const releaseFilter  = this.state.releaseFilter;
    const selectedLibrary = this.props.selectedLibrary.library;
    const batchesDropDown = this.state.batchesDropDown;

    const SelectLoader = () => (
      this.props.selectedComposers.length !== 0 ? null : <Loader/>
    )
    // console.log(195, this.state)
    // console.log(196, this.props)

    return(
    <div className='dashboard'>
      { this.props.selectedComposers.length === 0
        ? <SelectLoader/> :<div className='column-wrapper'>
          <div className='dashboard-left-column'>
            <h2>Meta Data Dashboard</h2>
            <h3>Filter Options: </h3>
            <label className='radio'>
              <input
                type='radio'
                name='react-tips'
                value='background-instrumentals'
                checked={this.state.selectedOption === 'background-instrumentals'}
                className='form-check-input'
                onChange={this.handleRadio}
              /> Background Instrumentals
            </label>
            <label className='radio'>
              <input
                type='radio'
                name='react-tips'
                value='independent-artists'
                checked={this.state.selectedOption === 'independent-artists'}
                className='form-check-input'
                onChange={this.handleRadio}
              /> Independent Artists
            </label>
            <br/>
            {/* conditionally render these radios if we are searching through the BI catalog */
              this.state.selectedOption === 'background-instrumentals' ?
                <div>
                  <label className='radio'>
                    <input
                      type='radio'
                      name='releases-or-batches'
                      value='Background Instrumental Batch'
                      checked={this.state.batchOrRelease === 'Background Instrumental Batch'}
                      className='form-check-input'
                      onChange={this.handleRadio}
                    /> Batches
                  </label>
                  <label className='radio'>
                    <input
                      type='radio'
                      name='releases-or-batches'
                      value='Background Instrumental Release'
                      checked={this.state.batchOrRelease === 'Background Instrumental Release'}
                      className='form-check-input'
                      onChange={this.handleRadio}
                    /> Releases
                  </label>
                </div>
              : <br/>
            /********************** end of conditionally rendering radios **********************/}
            <br/>
            {/****************************************** DROPDOWN ******************************************/}
            <Select
              value={releaseFilter}
              onChange={this.handleChange}
              options={this.state.batchesDropDown}
              className='exports-dropdown'
              placeholder={ this.state.batchOrRelease === 'Indie Artist Release' ? `Select an ${this.state.batchOrRelease}` : `Select a ${this.state.batchOrRelease}`}
            />
            <br/>
            <input type="checkbox" id="inclusive" onChange={this.handleCheck} checked={this.state.inclusive}/> Inclusive?
            <br/>
            (checking this will include all releases before the one that's selected)
          </div>

          {/****************************************** RIGHT COLUMN - DOWNLOAD LINKS ******************************************/}
          <div className='dashboard-right-column'>
            {/*<h2>Download Progress: {parseFloat(this.state.downloadProgress.toFixed(2))*100}%</h2>*/}
            <h2>Download Links:</h2>

            <a onClick={(() =>
              exportTools.batchChecker(releaseFilter)
                ? exportTools.renameExport(this.props, this.state, (x, y) => {
                  // console.log(252, exportTools.downloadProgress(x, y))
                  // &&
                  this.setState({downloadProgress: exportTools.downloadProgress(x, y)}
                  )})
                : exportTools.exportError())
            } className='download-links'>
              {`Rename Export ${this.state.releaseFilter && this.state.releaseFilter.label
                ? this.state.releaseFilter.label
                : ''}
              ${this.state.inclusive
                ? 'INC'
                : ''}
              `}
            </a>

            <br/>
            <a onClick={(() =>
              exportTools.batchChecker(releaseFilter)
                ? exportTools.bmatExport(this.props, this.state, (x, y) => {
                  // console.log(290, exportTools.downloadProgress(x, y))
                  // &&
                  this.setState({downloadProgress: exportTools.downloadProgress(x, y)}
                  )})
                : exportTools.exportError())
            } className='download-links'>
              {`BMAT Batch Export ${this.state.releaseFilter && this.state.releaseFilter.label
              ? this.state.releaseFilter.label
              : ''}
              ${this.state.inclusive
                ? 'INC'
                : ''
              }`
              }
            </a>

            <br/>
            <a onClick={(() =>
              exportTools.batchChecker(releaseFilter)
                ? exportTools.soundMinerExport(this.props, this.state, (x, y) => {
                  // console.log(266, exportTools.downloadProgress(x, y))
                  // &&
                  this.setState({downloadProgress: exportTools.downloadProgress(x, y)}
                  )})
                : (releaseFilter !== 147 && !releaseFilter.label.includes('_')
                  ? exportTools.exportError('You Can Only Export Releases')
                  : exportTools.exportError()))} className='download-links'>
              {`SoundMiner Batch Export ${this.state.releaseFilter && this.state.releaseFilter.label
                ? this.state.releaseFilter.label
                : ''}
                ${this.state.inclusive
                  ? 'INC'
                  : ''
                }`
              }
            </a>
            <br/>
            <a onClick={(() => exportTools.batchChecker(releaseFilter) ? exportTools.sourceAudioExport(this.props, this.state, (x, y) => {console.log(274, exportTools.downloadProgress(x, y)) && this.setState({downloadProgress: exportTools.downloadProgress(x, y)})}) : exportTools.exportError())} className='download-links'>{`SourceAudio Batch Export ${this.state.releaseFilter && this.state.releaseFilter.label ? this.state.releaseFilter.label : ''} ${this.state.inclusive ? 'INC' : ''}`}</a>
              <br/>
              <a onClick={(() => exportTools.batchChecker(releaseFilter) ? exportTools.nbcSoundMinerExport(this.props, this.state, (x, y) => {console.log(276, exportTools.downloadProgress(x, y)) && this.setState({downloadProgress: exportTools.downloadProgress(x, y)})}) : exportTools.exportError())} className='download-links'>{`NBCU SoundMiner Batch Export ${this.state.releaseFilter && this.state.releaseFilter.label ? this.state.releaseFilter.label : ''} ${this.state.inclusive ? 'INC' : ''}`}</a>
              <br/>
              <a onClick={(() => exportTools.batchChecker(releaseFilter) ? exportTools.proTunesExport(this.props, this.state, (x, y) => {console.log(278, exportTools.downloadProgress(x, y)) && this.setState({downloadProgress: exportTools.downloadProgress(x, y)})}) : exportTools.exportError())} className='download-links'>{`ProTunes Batch Export ${this.state.releaseFilter && this.state.releaseFilter.label ? this.state.releaseFilter.label : ''} ${this.state.inclusive ? 'INC' : ''}`}</a>
              <br/>
              <a onClick={(() => exportTools.batchChecker(releaseFilter) ? exportTools.alterKExport(this.props, this.state, (currentProgress, complete) => {this.downloadCounter(currentProgress, complete)}) : exportTools.exportError())} className='download-links'>{`Alter K Release Export ${this.state.releaseFilter && this.state.releaseFilter.label ? this.state.releaseFilter.label : ''} ${this.state.inclusive ? 'INC' : ''}`}</a>
              <br/>
           </div>
         </div>
       }
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    batchesBI: state.batchesBI,
    BImasterIDs: state.BImasterIDs,
    categories: state.categories,
    composersBI: state.composersBI,
    composersIA: state.composersIA,
    cues: state.cues,
    downloadProgress: state.downloadProgress,
    instrumentsBI: state.instrumentsBI,
    keywordsBI: state.keywordsBI,
    releasesIA: state.releasesIA,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    styles: state.styles,
    tempos: state.tempos,
    tracks: state.tracks,
  };
}

const mapDispatchToProps = {
  asyncCuesFetch,
  asyncTracksFetch,
  initializeSelectedLibrary,
  initializeSelectedComposer,
  initializeSelectedReleases,
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ImportDashboard));
