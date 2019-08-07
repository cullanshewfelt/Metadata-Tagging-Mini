import React, { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
// ------------------------------------------------------------------------------------------------------------
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../../SubComponents/Loader/Loader';
// ------------------------------------------------------------------------------------------------------------
// these imports contain all the export/download functions:
const exportTools = require('../MetaDataExportFunctions/ExportTools.js');
import Batches from './Batches.js';
import IndependentArtists from './IndependentArtists.js';
import Releases from './Releases.js';
import UsageReportTimeline from '../MetaDataExportFunctions/AdminFunctions/UsageReportTimeline';
// ------------------------------------------------------------------------------------------------------------
// import { asyncClientsFetch } from '../../../../actions/ClientActions/clientActions.js';
// import { asyncCuesFetch } from '../../../../actions/BackgroundInstrumentalsActions/cuesActions';
import { asyncTracksFetch } from '../../../../actions/IndieArtistsActions/tracksActions';
// import { asyncMonitoringFetch } from '../../../../actions/ClientActions/monitoringActions';
// import { asyncSearchFetch } from '../../../../actions/ClientActions/searchActions';
import { handleFetchCuesFromRelease } from '../../../../actions/selectedReleasesActions';
import { initializeSelectedLibrary } from '../../../../actions/selectedLibraryActions';
import { initializeSelectedCategories } from '../../../../actions/selectedCategoriesActions';
import { initializeSelectedComposer } from '../../../../actions/selectedComposerActions';
import { initializeSelectedReleases } from '../../../../actions/selectedReleasesActions';
import { initializeSelectedStyles } from '../../../../actions/selectedStylesActions';
// ------------------------------------------------------------------------------------------------------------
const RightColumn = (props) => {
  let { batchesBI, batchesDropDown, batchOrRelease, clients, downloadCompletedChecker, endDate, inclusive, cueFetchIsLoading,
        monitoring, releaseFilter, searches, selectedCategories, selectedComposers, selectedLibrary, selectedStyles,
        startDate, tempos, trackFetchIsLoading } = props;

  let cuesLoading = cueFetchIsLoading || trackFetchIsLoading;

  // console.log(35, cuesLoading)

  // (selectedLibrary.library.length === 0 || monitoring.length === 0)
  //   ? <div className='loading'>
  //     <Loader/>
  //     <br/>
  //     Lot's of Data Loading! Please Be Patient...
  //   </div>
  //   :

  return (
    <div className='dashboard-right-column'>
      <h2 className='dashboard-header'>Metadata Export Download Links:</h2>
      <div style={{overflowY: 'hidden', height: '550px'}}>
        <InfiniteScroll
          height={600}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
              <b></b>
            </p>
          }
        >
          { startDate.toString() !== endDate.toString()
            ? <UsageReportTimeline
                clients={clients}
                downloadCompletedChecker={downloadCompletedChecker}
                endDate={endDate}
                monitoring={monitoring}
                searches={searches}
                startDate={startDate}
              />

            : batchOrRelease === 'Background Instrumental Batch'
              ? <Batches
                  batchesDropDown={batchesDropDown}
                  cuesLoading={cuesLoading}
                  downloadCompletedChecker={downloadCompletedChecker}
                  inclusive={inclusive}
                  releaseFilter={releaseFilter}
                />
              : batchOrRelease === 'Indie Artist Release'
                ? <IndependentArtists
                    batchesDropDown={batchesDropDown}
                    cuesLoading={cuesLoading}
                    downloadCompletedChecker={downloadCompletedChecker}
                    inclusive={inclusive}
                    releaseFilter={releaseFilter}
                  />
                : batchOrRelease === 'Background Instrumental Release'
                  ? <Releases
                      batchesDropDown={batchesDropDown}
                      cuesLoading={cuesLoading}
                      downloadCompletedChecker={downloadCompletedChecker}
                      inclusive={inclusive}
                      releaseFilter={releaseFilter}
                    />
                  : null
          }
        </InfiniteScroll>
      </div>
      <br/>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    batchesBI: state.batchesBI,
    BImasterIDs: state.BImasterIDs,
    categoriesBI: state.categoriesBI,
    categoriesIA: state.categoriesIA,
    clients: state.clients,
    composersBI: state.composersBI,
    composersIA: state.composersIA,
    cues: state.cues,
    downloadProgress: state.downloadProgress,
    instrumentsBI: state.instrumentsBI,
    cueFetchIsLoading: state.cueFetchIsLoading,
    keywordsBI: state.keywordsBI,
    monitoring: state.monitoring,
    releasesIA: state.releasesIA,
    searches: state.searches,
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    selectedStyles: state.selectedStyles,
    stylesBI: state.stylesBI,
    stylesIA: state.stylesIA,
    tempos: state.tempos,
    tracks: state.tracks,
    trackFetchIsLoading: state.trackFetchIsLoading
  };
}

const mapDispatchToProps = {
  asyncSearchFetch,
  asyncTracksFetch,
  handleFetchCuesFromRelease,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedLibrary,
  initializeSelectedReleases,
  initializeSelectedStyles
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightColumn));
