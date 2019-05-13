import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class ATempoExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }

  // ******************************************************************************************
  //  A TEMPO EXPORT FUNCTION
  // ******************************************************************************************

  //  seems finished, double check and run through diffChecker


  aTempoExport = () => {
    this.props.resetDownload()
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
       'Category', 'CD #', 'Composer', 'CAE', 'PRO', 'Description', 'Duration', 'Instrumentation',
       'Publisher', 'Release', 'Composer Split', 'Publisher Split', 'Style', 'Tempo',
       'Song Title', 'Track #', 'Track ID', 'Cue Rating', 'ISRC', 'Sounds Like Band',
       'Sounds Like Film'
     ];

    this.setState({csvData: [headersRow.join('\t')]})
    let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
    let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
        this.props.inclusive
          ? cue.rel_id <= this.props.releaseFilter.value && cue.cue_status === 'Active'
          : this.props.releaseFilter.label === 'All'
          ? cue.cue_status === 'Active'
          : releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status === 'Active'
          : this.props.inclusive && releasesArray.length !== 0
          ? cue.rel_id <= releasesArray[releasesArray.length - 1] && cue.cue_status === 'Active'
          : cue.rel_id === this.props.releaseFilter.value && cue.cue_status === 'Active')
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
        let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
        let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      // --------------------------------------------------------------------------------------------------
        let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

        let compString = '';
        let splitString = '';
        let pubString = '';
        let caeString = '';
        let proString = '';
        for(let c in composerArray){
          pubString += composerArray[c].publisher_name.split(' (')[0];
          pubString += c < composerArray.length - 1 ? ' / ' : '';
          compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + ' ' : ''}${composerArray[c].last}`;
          compString += c < composerArray.length - 1 ? ' / ' : '';
          splitString += composerArray[c].composer_split
          splitString += c < composerArray.length - 1 ? ' / ' : '';
          caeString += composerArray[c].cae;
          caeString += c < composerArray.length - 1 ? ' / ' : '';
          proString += composerArray[c].pro_name;
          proString += c < composerArray.length - 1 ? ' / ' : '';
        }
      let newRow = [
        // 1 Category
        `${this.props.selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
        // 2 CD #
        `DLM${row.style_id.toString().padStart(3, 0)}`,
        // 3 Composer
        compString,
        // 4 CAE
        caeString,
        // 5 PRO
        proString,
        // 6 Description
        descriptionString,
        // 7 Duration
        row.cue_duration,
        // 8 Instrumentation
        instrumentsString,
        // 9 Publisher
        pubString,
        // 10 Release
        this.props.batchesDropDown.filter(release => release.value === row.rel_id).map(rel => rel.label)[0],
        // 11 Composer Split
        splitString,
        // 12 Publisher Split
        splitString,
        // 13 Style
        this.props.selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)[0],
        // 14 Tempo
        this.props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // 15 Song Title
        row.cue_title,
        // 16 Track #
        row.cue_id,
        // 17 Track ID
        row.cue_id,
        // 18 Cue Rating
        row.cue_rating,
        // 19 ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // 20 Sounds Like Band
        row.sounds_like_band_edit || 'N/A',
        // 21 Sounds Like Film
        row.sounds_like_film_edit || 'N/A'
      ]
      // console.log(newRow)
     let progress = (progressCount/filteredLibrary.length)
     this.setState({csvData: [...this.state.csvData, newRow.join('\t')], progress})
   }, () => { // inProgress()
     this.props.updateDownload(this.state.progress)
   },
   () => { // done()
     this.props.updateDownload(1)
     this.props.downloadCompletedChecker();
     exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}ATEMPO_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.csv`);
   })
  }
  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147
          ? exportTools.exportError()
          : this.props.inclusive || releaseFilter.label === 'All'
            ? exportTools.exportError('Please Unselect All/Inclusive.')
            : releaseFilter.label.includes('_')
            ? exportTools.exportError('We Typically Only Send A Tempo Releases. Please Select A Releases.')
            : this.props.selectedLibrary.libraryName === 'independent-artists'
            ? exportTools.exportError('Please Use The Generic IA Export for A Tempo')
            : this.aTempoExport())
      } className={
        this.props.inclusive || releaseFilter === 147 ||
        (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
          ? 'strikethrough'
          : 'download-links'
        }>
        {`A Tempo Release Export ${
          this.props.inclusive || releaseFilter === 147 ||
          (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
            ? ''
            : releaseFilter.label
        }`
      }
      </a>
    );
  }
}


const mapStateToProps = (state) => {
  return {
    downloadProgress: state.downloadProgress
  };
}

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ATempoExport));
