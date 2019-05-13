import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
// ------------------------------------------------------------------------------------------------------------
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../SubComponents/Loader';
import moment from 'moment';
import ReactModal from 'react-modal';
import Select from 'react-select';
// ------------------------------------------------------------------------------------------------------------
import { asyncTracksFetch } from '../../actions/IndieArtistsActions/tracksActions';
import { initializeSelectedLibrary } from '../../actions/selectedLibraryActions';
import { initializeSelectedCategories } from '../../actions/selectedCategoriesActions';
import { initializeSelectedComposer } from '../../actions/selectedComposerActions';
import { initializeSelectedReleases } from '../../actions/selectedReleasesActions';
import { initializeSelectedStyles } from '../../actions/selectedStylesActions';
import { resetDownload, updateDownload } from '../../actions/ExportActions/exportActions';
// ------------------------------------------------------------------------------------------------------------
// loads some JSON data that I felt was unnecessary to store in SQL / Redux
let batchesDropDown = require('./MetaDataExportFunctions/dropdownJsonData/batchesDropDown.json');
let releasesDropDown = require('./MetaDataExportFunctions/dropdownJsonData/releasesDropDown.json');
// ------------------------------------------------------------------------------------------------------------
// these imports contain all the export/download functions:
const exportTools = require('./MetaDataExportFunctions/ExportTools.js');
import Batches from './MetaDataSubComponents/Batches.js';
import IndependentArtists from './MetaDataSubComponents/IndependentArtists.js';
import Releases from './MetaDataSubComponents/Releases.js';

import UsageReportTimeline from './MetaDataExportFunctions/AdminFunctions/UsageReportTimeline';
// ------------------------------------------------------------------------------------------------------------

class ExportDashboard extends React.Component {
   constructor(props) {
     super(props)
     this.downloadCompletedChecker = this.downloadCompletedChecker.bind(this);
   }

   state = {
     batchesDropDown: batchesDropDown,
     batchOrRelease: 'Background Instrumental Batch',
     clients: this.props.clients,
     downloadFinished: true,
     downloadProgress: this.props.downloadProgress,
     endDate: moment().toDate(),
     inclusive: false,
     monitoring: this.props.monitoring,
     releaseFilter: 147,
     releasesDropDown: releasesDropDown,
     selectedOption: 'background-instrumentals',
     startDate: moment().toDate()
   }

   downloadCompletedChecker =  () => {
     this.setState({downloadFinished: !this.state.downloadFinished})
   }

   handleChange = (releaseFilter) => {
     this.setState({releaseFilter, startDate: moment().toDate(), endDate: moment().toDate()})
   }

   handleCheck = () => {
     this.setState({inclusive: !this.state.inclusive})
   }

  handleRadio = (event) => {
    // this function handles the logic for the radio buttons, sets the state to
    // the corresponding input
    switch(event.target.value){
      case 'independent-artists':
        this.setState({
            batchOrRelease: 'Indie Artist Release',
            releaseFilter: 147,
            selectedOption: event.target.value,
            batchesDropDown: this.props.releasesIA.map(rel => {
          return {value: rel.rel_id, label: rel.rel_num}})
          })
        this.props.initializeSelectedCategories(this.props.categoriesIA);
        this.props.initializeSelectedLibrary(this.props.tracks, event.target.value);
        this.props.initializeSelectedComposer(this.props.composersIA)
        this.props.initializeSelectedReleases(this.props.releasesIA)
        this.props.initializeSelectedStyles(this.props.stylesIA);
        break;
      default:
        null
    }
  }

  handleChangeStart = (e) => {
    this.setState({startDate: e})
  }

  handleChangeEnd = (e) => {
    this.setState({endDate: e})
  }

 componentDidMount (){
   document.title = 'DL Music | Export Portal | ';

   this.state.monitoring.length === 0 ? this.props.asyncMonitoringFetch((x)=>{
     this.setState({monitoring: x})
   }) : null;
   this.state.clients.length === 0 ? this.props.asyncClientsFetch((x)=>{
     this.setState({clients: x})}) : null;
   // this.props.monitoring.length === 0 ? this.props.asyncMonitoringFetch() : null;
   // this.props.clients.length === 0 ? this.props.asyncClientsFetch() : null;
    this.props.asyncTracksFetch()
    this.props.asyncSearchFetch();
    this.props.initializeSelectedCategories(this.props.categoriesIA);
    if(this.props.composersIA.length === 0){
      this.props.initializeSelectedComposer(this.props.composersIA)
    }

    // initialize the library in case this is the landing page
    switch(this.props.selectedLibrary.libraryName){
      case 'independent-artists':
        this.setState({batchesDropDown: this.props.releasesIA.map(rel => {
          return {value: rel.rel_id, label: rel.rel_num}
        }),  releaseFilter: 147, batchOrRelease: 'Indie Artist Release',  selectedOption: 'independent-artists'})
        this.props.asyncTracksFetch(tracks => {
          this.props.initializeSelectedLibrary(tracks, 'independent-artists')
        });
        this.props.initializeSelectedCategories(this.props.categoriesIA);
        this.props.initializeSelectedStyles(this.props.stylesIA);
        break;
        case '':
          // we reset releaseFilter to it's original state to avoid cues being filtered
          // when we switch libraries
          this.setState({batchesDropDown: this.props.releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }),  releaseFilter: 147, batchOrRelease: 'Indie Artist Release',  selectedOption: 'independent-artists'})
          this.props.asyncTracksFetch(tracks => {
            this.props.initializeSelectedLibrary(tracks, 'independent-artists')
          });
          this.props.initializeSelectedCategories(this.props.categoriesIA);
          this.props.initializeSelectedStyles(this.props.stylesIA);
          break;
      default:
        null
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // this is initializing our selected composers by default once the API request is returned
    // I added this condition so that the user could start on any /url_path
    if(this.props.selectedComposers.length === 0){
      this.props.initializeSelectedComposer(this.props.composersIA)
    }
    if(this.props.selectedCategories.length === 0){
      this.props.initializeSelectedCategories(this.props.categoriesIA);
    }
    if(this.props.selectedStyles.length === 0){
      this.props.initializeSelectedStyles(this.props.stylesIA);
    }
  }

  render(){
    const releaseFilter  = this.state.releaseFilter;
    const selectedLibrary = this.props.selectedLibrary.library;
    const batchesDropDown = this.state.batchesDropDown;
    return(
    <div className='dashboard'>
      { this.state.monitoring.length === 0
        ? <div className='loading'>
          <Loader/>
          <br/>
          Lot's of Data Loading! Please Be Patient...
        </div>
        : <div className='column-wrapper'>
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
            {/*********** conditionally render these radios if we are searching through the BI catalog ************/
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
            }
            <br/>
            {/****************************************** DROPDOWN ******************************************/}
            <Select
              value={releaseFilter}
              onChange={this.handleChange}
              options={batchesDropDown}
              className='exports-dropdown'
              placeholder={ this.state.batchOrRelease === 'Indie Artist Release' ? `Select an ${this.state.batchOrRelease}` : `Select a ${this.state.batchOrRelease}`}
            />
            <br/>
            <input type="checkbox" id="inclusive" onChange={this.handleCheck} checked={this.state.inclusive}/> Inclusive?
            <br/>
            (checking this will include all releases before the one that's selected)
            <br/>
            <br/>
            <strong>Select A Date Range To Export A Usage Report</strong>
            <br/>
            Start Date:

            <DatePicker
              selected={this.state.startDate}
              selectsStart
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              filterDate={(date) => {
                return moment() > date;
              }}
              onChange={this.handleChangeStart}
            />
            <br/>
            End Date:
            <DatePicker
              selected={this.state.endDate}
              selectsEnd
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              filterDate={(date) => {
                return moment() > date;
              }}
              onChange={this.handleChangeEnd}
            />
          </div>
          {/****************************************** RIGHT COLUMN - DOWNLOAD LINKS ******************************************/}
          <div className='dashboard-right-column'>
            <h2>Metadata Export Download Links:</h2>
            <div style={{overflowY: 'hidden', height: '550px'}}>
              <InfiniteScroll
                dataLength={this.state.limitTo}
                next={this.loadMore}
                height={600}
                hasMore={this.state.hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={
                  <p style={{textAlign: 'center'}}>
                    <b></b>
                  </p>
                }
              >
                { this.state.startDate.toString() !== this.state.endDate.toString()
                  ? <UsageReportTimeline
                    startDate={this.state.startDate}
                    endDate={this.state.endDate}
                    clients={this.state.clients}
                    monitoring={this.state.monitoring}
                    searches={this.props.searches}
                    downloadCounter={this.downloadCounter}
                    downloadCompletedChecker={this.downloadCompletedChecker}
                    />

                  : this.state.batchOrRelease === 'Indie Artist Release'
                      ? <IndependentArtists
                        batchesBI={this.props.batchesBI}
                        batchesDropDown={batchesDropDown}
                        downloadCompletedChecker={this.downloadCompletedChecker}
                        inclusive={this.state.inclusive}
                        releaseFilter={this.state.releaseFilter}
                        selectedCategories={this.props.selectedCategories}
                        selectedComposers={this.props.selectedComposers}
                        selectedLibrary={this.props.selectedLibrary}
                        selectedStyles={this.props.selectedStyles}
                        tempos={this.props.tempos}
                        />
                      : null
                }
              </InfiniteScroll>
            </div>
            <br/>
          </div>
        </div>
       }
    </div>
  )}
}

const mapStateToProps = (state) => {
  return {
    categoriesIA: state.categoriesIA,
    clients: state.clients,
    composersIA: state.composersIA,
    downloadProgress: state.downloadProgress,
    monitoring: state.monitoring,
    releasesIA: state.releasesIA,
    searches: state.searches,
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    selectedStyles: state.selectedStyles,
    stylesIA: state.stylesIA,
    tempos: state.tempos,
    tracks: state.tracks,
  };
}

const mapDispatchToProps = {
  asyncTracksFetch,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedLibrary,
  initializeSelectedReleases,
  initializeSelectedStyles,
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportDashboard));
