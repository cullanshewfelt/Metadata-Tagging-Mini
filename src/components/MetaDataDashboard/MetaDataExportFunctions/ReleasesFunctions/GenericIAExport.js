import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class GenericIAExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     xlsData: []
   }

  // ******************************************************************************************
  //  GENERIC IA EXPORT FUNCTION
  // ******************************************************************************************

  genericIAExport = () => {
    this.props.resetDownload()
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
       'Category', 'Composer', 'Description', 'Duration', 'PRO',
       'Publisher', 'Composer Split', 'Publisher Split', 'Style', 'Tempo', 'DL Title',
       'Original Title', 'Cue ID', 'Artist', 'Instru Avail', 'Rating', 'Instruments',
       'Release'
     ];
    this.setState({xlsData: [headersRow.join('\t')]})
    let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
    let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
        this.props.inclusive
          ? cue.rel_id <= this.props.releaseFilter.value && cue.cue_status !== 'Pulled'
          : this.props.releaseFilter.label === 'All'
          ? cue.cue_status !== 'Pulled'
          : releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status !== 'Pulled'
          : this.props.inclusive && releasesArray.length !== 0
          ? cue.rel_id <= releasesArray[releasesArray.length - 1] && cue.cue_status !== 'Pulled'
          : cue.rel_id === this.props.releaseFilter.value && cue.cue_status !== 'Pulled')
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // console.log(row)
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
        let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
        let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      // --------------------------------------------------------------------------------------------------
        let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split)
        let compString = '';
        let splitString = '';
        let pubString = '';
        let caeString = '';
        let proString = '';
        for(let c in composerArray){
          pubString += composerArray[c].publisher_name;
          pubString += c < composerArray.length - 1 ? ' / ' : '';
          compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + ' ' : ''}${composerArray[c].last}`;
          compString += c < composerArray.length - 1 ? ' / ' : '';
          splitString += composerArray[c].composer_split.toFixed(2)
          splitString += c < composerArray.length - 1 ? ' / ' : '';
          caeString += composerArray[c].cae;
          caeString += c < composerArray.length - 1 ? ' / ' : '';
          proString += composerArray[c].pro_name;
          proString += c < composerArray.length - 1 ? ' / ' : '';
        }
      let newRow = [
        // 1 Category
        `${this.props.selectedCategories.filter(cat =>
          cat.cat_id === row.cat_id).map(cat =>
            cat.cat_name)}`,
        // 2 Composer
        compString,
        // 3 Description
        descriptionString,
        // 4 Duration
        row.cue_duration,
        // 5 PRO
        proString,
        // 6 Publisher
        pubString,
        // 7 Composer Split
        splitString,
        // 8 Publisher Split
        splitString,
        // 9 Style
        this.props.selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)[0],
        // 10 Tempo
        this.props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // 11 DL Title
        row.cue_title,
        // 12 Original Title
        row.cue_title,
        // 13 Cue ID
        row.cue_id,
        // 14 Artist
        row.artist_name ? row.artist_name : '',
        // 15 Instru Avail
        row.instru_avail ? row.instru_avail : '',
        // 16 Rating
        row.cue_rating,
        // 17 Instruments
        instrumentsString,
        // 18 Release
        ''
        // this.props.batchesDropDown.filter(release => release.value === row.rel_id).map(rel => rel.label)[0]
      ]
     let progress = (progressCount/filteredLibrary.length)
     this.setState({xlsData: [...this.state.xlsData, newRow.join('\t')], progress})
   }, () => { // inProgress()
     this.props.updateDownload(this.state.progress)
   },
   () => { // done()
     this.props.updateDownload(1)
     this.props.downloadCompletedChecker();
     exportTools.generateDownload(this.state.xlsData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}GENERIC_IA_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`);
   })
  }
  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147 || this.props.selectedLibrary.libraryName !== 'independent-artists'
          ? exportTools.exportError('Please Select An Independent Artist Release')
          : this.props.inclusive || releaseFilter.label === 'All'
            ? exportTools.exportError('Please Unselect All/Inclusive.')
            : releaseFilter.label.includes('_')
            ? exportTools.exportError('Please Select A Release.')
            : this.genericIAExport())
      } className={
        this.props.inclusive || releaseFilter === 147 || this.props.selectedLibrary.libraryName !== 'independent-artists' ||
        (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
          ? 'strikethrough'
          : 'download-links'
        }>
        {`Generic IA Release Export ${
          this.props.inclusive || releaseFilter === 147 || this.props.selectedLibrary.libraryName !== 'independent-artists' ||
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenericIAExport));
