import React, { useState,  useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
// ------------------------------------------------------------------------------------------------------------
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from 'react-infinite-scroll-component';
import Loader from '../../../SubComponents/Loader/Loader';
import moment from 'moment';
import ReactModal from 'react-modal';
import Select from 'react-select';
// ------------------------------------------------------------------------------------------------------------
import { handleFetchCuesForExport } from '../../../../actions/ExportActions/exportActions';
// import { asyncCuesFetch } from '../../../../actions/BackgroundInstrumentalsActions/cuesActions';
import { asyncTracksFetch } from '../../../../actions/IndieArtistsActions/tracksActions';
// import { asyncMonitoringFetch } from '../../../../actions/ClientActions/monitoringActions';
// import { asyncSearchFetch } from '../../../../actions/ClientActions/searchActions';
import { initializeSelectedLibrary } from '../../../../actions/selectedLibraryActions';
import { initializeSelectedCategories } from '../../../../actions/selectedCategoriesActions';
import { initializeSelectedComposer } from '../../../../actions/selectedComposerActions';
import { initializeSelectedReleases } from '../../../../actions/selectedReleasesActions';
import { initializeSelectedStyles } from '../../../../actions/selectedStylesActions';
// import { asyncClientsFetch } from '../../../../actions/ClientActions/clientActions.js';
// ------------------------------------------------------------------------------------------------------------

const LeftColumn = (props) => {
  let { batchesBI, batchesDropDown, batchOrRelease, categoriesBI, categoriesIA, composersBI, composersIA, cues,
        endDate, inclusive, handleFetchCuesForExport, initializeSelectedCategories, initializeSelectedComposer, initializeSelectedLibrary,
        initializeSelectedReleases, initializeSelectedStyles, releasesIA, releaseFilter, releasesDropDown,
        selectedLibrary, selectedOption,
        setBatchesDropDown, setBatchOrRelease, setClients, setEndDate, setInclusive, setMonitoring,
        setReleaseFilter, setReleasesDropDown, setSelectedOption, setStartDate, startDate,
        stylesBI, stylesIA, tracks } = props;

  const handleReleaseFilter = (releaseFilter) => {
    setReleaseFilter(releaseFilter);
    setStartDate(moment().toDate());
    setEndDate(moment().toDate());
    handleFetchCuesForExport(releaseFilter.value);
  }

  const handleStartDate = (startDate) => { setStartDate(startDate) }

  const handleEndDate = (endDate) => { setEndDate(endDate) }

  const handleInclusive = () => { setInclusive(!inclusive) };

  const handleRadio = (event) => {
    // this function handles the logic for the radio buttons, sets the state to
    // the corresponding input
    switch(event.target.value){
      case 'background-instrumentals':
        setBatchesDropDown(batchesBI.map(rel => {
          return { value: rel.rel_id, label: rel.rel_num }
        }));
        setBatchOrRelease('Background Instrumental Batch');
        setReleaseFilter(147);
        setSelectedOption(event.target.value);

        initializeSelectedCategories(categoriesBI);
        initializeSelectedComposer(composersBI);
        initializeSelectedLibrary(cues, 'background-instrumentals');
        initializeSelectedReleases(batchesBI);
        initializeSelectedStyles(stylesBI);
        break;
      case 'independent-artists':
        setBatchesDropDown(releasesIA.map(rel => {
          return { value: rel.rel_id, label: rel.rel_num }
        }));
        setBatchOrRelease('Indie Artist Release');
        setReleaseFilter(147);
        setSelectedOption(event.target.value);

        initializeSelectedCategories(categoriesIA);
        initializeSelectedComposer(composersIA)
        initializeSelectedLibrary(tracks, 'independent-artists');
        initializeSelectedReleases(releasesIA)
        initializeSelectedStyles(stylesIA);

        break;
      case 'Background Instrumental Release':
        setBatchesDropDown(releasesDropDown);
        setBatchOrRelease(event.target.value);
        setReleaseFilter(147);

        initializeSelectedCategories(categoriesBI);
        initializeSelectedComposer(composersBI);
        initializeSelectedLibrary(cues, 'background-instrumentals');
        initializeSelectedReleases(batchesBI);
        initializeSelectedStyles(stylesBI);

        break;
      case 'Background Instrumental Batch':
        setBatchesDropDown(batchesBI.map(rel => {
          return { value: rel.rel_id, label: rel.rel_num }
        }));
        setBatchOrRelease(event.target.value);
        setReleaseFilter(147);

        initializeSelectedCategories(categoriesBI);
        initializeSelectedComposer(composersBI);
        initializeSelectedLibrary(cues, 'background-instrumentals');
        initializeSelectedReleases(batchesBI);
        initializeSelectedStyles(stylesBI);
        break;
      default:
        null
    }
  }

  // (selectedLibrary.library.length === 0 || monitoring.length === 0)
  //   ? <div className='loading'>
  //     <Loader/>
  //     <br/>
  //     Lot's of Data Loading! Please Be Patient...
  //   </div>
  //   :

  const RadioOptionsBI = () =>
    selectedOption === 'background-instrumentals' ?
      <div>
        <label className='radio'>
          <input
            type='radio'
            name='releases-or-batches'
            value='Background Instrumental Batch'
            checked={batchOrRelease === 'Background Instrumental Batch'}
            className='form-check-input'
            onChange={handleRadio}
          /> Batches
        </label>
        <label className='radio'>
          <input
            type='radio'
            name='releases-or-batches'
            value='Background Instrumental Release'
            checked={batchOrRelease === 'Background Instrumental Release'}
            className='form-check-input'
            onChange={handleRadio}
          /> Releases
        </label>
      </div>
    : <br/>

  return (
    <div className='dashboard-left-column'>
      <h2 className='dashboard-header'>Meta Data Dashboard</h2>
      <h3>Filter Options: </h3>
      <label className='radio'>
        <input
          type='radio'
          name='react-tips'
          value='background-instrumentals'
          checked={selectedOption === 'background-instrumentals'}
          className='form-check-input'
          onChange={handleRadio}
        /> Background Instrumentals
      </label>
      <label className='radio'>
        <input
          type='radio'
          name='react-tips'
          value='independent-artists'
          checked={selectedOption === 'independent-artists'}
          className='form-check-input'
          onChange={handleRadio}
        /> Independent Artists
      </label>
      <br/>
      <RadioOptionsBI/>
      <br/>
      {/****************************************** DROPDOWN ******************************************/}
      <Select
        value={releaseFilter}
        onChange={handleReleaseFilter}
        options={batchesDropDown}
        className='exports-dropdown'
        placeholder={ batchOrRelease === 'Indie Artist Release' ? `Select an ${batchOrRelease}` : `Select a ${batchOrRelease}`}
      />
      <br/>
      <input type="checkbox" id="inclusive" onChange={handleInclusive} checked={inclusive}/> Inclusive?
      <br/>
      (checking this will include all releases before the one that's selected)
      <br/>
      <br/>
      <strong>Select A Date Range To Export A Usage Report</strong>
      <br/>
      Start Date:

      <DatePicker
        selected={startDate}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        filterDate={(date) => {
          return moment() > date;
        }}
        onChange={handleStartDate}
      />
      <br/>
      End Date:
      <DatePicker
        selected={endDate}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        filterDate={(date) => {
          return moment() > date;
        }}
        onChange={handleEndDate}
      />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categoriesIA: state.categoriesIA,
    clients: state.clients,
    composersIA: state.composersIA,
    downloadProgress: state.downloadProgress,
    releasesIA: state.releasesIA,
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
  handleFetchCuesForExport,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedLibrary,
  initializeSelectedReleases,
  initializeSelectedStyles
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LeftColumn));
