import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


class RenameExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }

  // ******************************************************************************************
  //  RENAME EXPORT FUNCTION
  // ******************************************************************************************
  renameExport = () => {
    this.props.resetDownload()
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    //  '2 DLM FILENAME (Copy)', '3 DLM FILENAME (Copy).mp3',  // add these these rows if you ever need to use Adobe Audition instead of SoundForgePro 10
    let headersRow = [
       '1 DLMSONG TITLE', '2 DLM FILENAME (WAV)', '3 DLM FILENAME (MP3)',
       '4 NBC FILENAME (WAV)', '5 NBC FILENAME (MP3)', '6 PROTUNES/GMR', '7 MUSIC DIRECTOR', '8 ZINKO', '9 DLM CATEGORY',
       '10 DLM STYLE', '11 FOLDER', '12 RELEASE #', '13 TRACK ID#', '14 ISRC', '15 PNG MP3', '16 PNG WAV',
       '17 CUE RATING', '18 STYLE MD', '19 PROTUNES - UNDER 6 RATED TO REMOVE', '20 GROOVERS - UNDER 8 RATED TO REMOVE',
       '21 ACTIVE WAVs', '22 AVID MXF a1', '23 AVID MXF a2', '24 CUE_ID MXF a1', '25 CUE_ID MXF a2'
     ];

    this.setState({csvData: [headersRow.join('\t')]})
    let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
    let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
        this.props.inclusive
          ? cue.rel_id <= this.props.releaseFilter.value && (cue.cue_status !== 'Pulled' || 'Pending')
          : this.props.releaseFilter.label === 'All'
          ? (cue.cue_status !== 'Pulled' || 'Pending')
          : releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status !== 'Pulled' || 'Pending')
          : this.props.inclusive && releasesArray.length !== 0
          ? cue.rel_id <= releasesArray[releasesArray.length - 1] && (cue.cue_status !== 'Pulled' || 'Pending')
          : cue.rel_id === this.props.releaseFilter.value && (cue.cue_status !== 'Pulled' || 'Pending'))
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      let newRow = [
        // 1 DLMSONG TITLE
        row.cue_title,
        // X DLM FILENAME (Copy).wav             // add these these rows if you ever need to use Adobe Audition instead of SoundForgePro 10
        // `DLM - ${row.cue_title} (Copy).wav`,  // add these these rows if you ever need to use Adobe Audition instead of SoundForgePro 10
        // X DLM FILENAME (Copy).mp3             // add these these rows if you ever need to use Adobe Audition instead of SoundForgePro 10
        // `DLM - ${row.cue_title} (Copy).mp3`,  // add these these rows if you ever need to use Adobe Audition instead of SoundForgePro 10
        // 2 DLM FILENAME (WAV)
        `DLM - ${row.cue_title}.wav`,
        // 3 DLM FILENAME (MP3)
        `DLM - ${row.cue_title}.mp3`,
        // 4 NBC FILENAME (WAV)
        `DLM_${row.cue_title}.wav`,
        // 5 NBC FILENAME (MP3)
        `DLM_${row.cue_title}.mp3`,
        // 6 PROTUNES/GMR
        `DLM_${row.cue_title.replace(/\s/g, "_")}.wav`,
        // 7 MUSIC DIRECTOR
        `${row.cue_id}-${row.cue_title.toLowerCase().replace(/\s/g, '')}.wav`,
        // 8 ZINKO
        `DLM${row.style_id.toString().padStart(3, 0)}_${row.cue_id}_${row.cue_title.toLowerCase().replace(/\s/g, '')}.mp3`,
        // 9 DLM CATEGORY
        `${this.props.selectedCategories.filter(categories => categories.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
        // 10 DLM STYLE
        `${this.props.selectedStyles.filter(styles => styles.style_id === row.style_id).map(style => style.style_name)}`,
        // 11 FOLDER
        `${this.props.selectedCategories.filter(categories => categories.cat_id === row.cat_id).map(cat => cat.cat_name)}\\${this.props.selectedStyles.filter(styles => styles.style_id === row.style_id).map(style => style.style_name)}`,
        // 12 RELEASE #
        row.rel_id,
        // 13 TRACK ID#
        row.cue_id,
        // 14 ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // 15 PNG MP3
        `${row.cue_id}.mp3`,
        // 16 PNG WAV
        `${row.cue_id}.wav`,
        // 17 CUE RATING
        row.cue_rating,
        // 18 STYLE MD
        `DLM${row.style_id.toString().padStart(3, 0)}_${row.cue_id}-${row.cue_title.toLowerCase().replace(/\s/g, '')}.wav`,
        // 19 PROTUNES - UNDER 6 RATED TO REMOVE
        row.cue_rating < 6 ? `pppppppDLM - ${row.cue_title}.wav` : '',
        // 20 GROOVERS - UNDER 8 RATED TO REMOVE
        row.cue_rating < 8 ? `gggggggDLM - ${row.cue_title}.wav` : '',
        // 21 ACTIVE WAVs
        row.cue_status === 'Active' ? `aaaaaaaDLM - ${row.cue_title}.wav` : '',
        // 22 AVID MXF a1
        `DLM - ${row.cue_title}_a1.mfx`,
        // 23 AVID MXF a2
        `DLM - ${row.cue_title}_a2.mfx`,
        // 24 CUE_ID MXF a1
        `${row.cue_title}_a1.mfx`,
        // 25 CUE_ID MXF a2
        `${row.cue_title}_a2.mfx`
      ]
     let progress = (progressCount/filteredLibrary.length)
     this.setState({csvData: [...this.state.csvData, newRow.join('\t')], progress})
   }, () => { // inProgress()
     this.props.updateDownload(this.state.progress)
   },
   () => { // done()
     this.props.updateDownload(1)
     this.props.downloadCompletedChecker();
     exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}${this.props.inclusive ? 'INC_' : ''}RENAME_${moment().format('YYYY.MM.DD-HH_mm_ss')}.csv`);
   })
  }
  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        exportTools.batchChecker(releaseFilter)
          ? this.renameExport()
          : exportTools.exportError('Please Select A Batch Or Release To Export'))
      } className={
        releaseFilter === 147
        ? 'strikethrough'
        : 'download-links'
      }>
        {`Rename ${
          releaseFilter === 147
          ? ''
          : this.props.selectedLibrary.libraryName === 'independent-artists'
          ? 'Release '
          : (releaseFilter.value && typeof releaseFilter.value === 'string')
          ? 'Release '
          : 'Batch '
        }Export ${
          releaseFilter
          && releaseFilter.label
          ? releaseFilter.label
          : ''}
        ${this.props.inclusive
          ? 'INC'
          : ''}
        `}
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RenameExport));
