import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class ProTunesExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }

  // ******************************************************************************************
  //  PROTUNES BATCH EXPORT FUNCTION
  // ******************************************************************************************
  // exports a batch of tracks with ratings only above 5, and splits them into 2 tiers:
  // tier 2 = rating 8 - 10
  // tier 1 = rating 6 - 7
  // ******************************************************************************************

  proTunesExport = () => {
    this.props.resetDownload();
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
       'provider filename', 'provider track id', 'title', 'version', 'primary track', 'catalog', 'instrumental',
       'vocals', 'genre', 'keywords', 'mood', 'description', 'era', 'sounds-like/influences', 'instruments',
       'bpm', 'lyrics', 'restrictions', 'original/cover', 'one-stop licensing', 'cd title / ref #',
       'release date', 'track no', 'iswc', 'isrc', 'tier', 'ARTIST',
       'COMPOSER 1 NAME', 'COMPOSER 1 PRO', 'COMPOSER 1 PRO NUMBER', 'COMPOSER 1 SPLIT',
       'COMPOSER 2 NAME', 'COMPOSER 2 PRO', 'COMPOSER 2 PRO NUMBER', 'COMPOSER 2 SPLIT',
       'COMPOSER 3 NAME', 'COMPOSER 3 PRO', 'COMPOSER 3 PRO NUMBER', 'COMPOSER 3 SPLIT',
       'COMPOSER 4 NAME', 'COMPOSER 4 PRO', 'COMPOSER 4 PRO NUMBER', 'COMPOSER 4 SPLIT',
       'COMPOSER 5 NAME', 'COMPOSER 5 PRO', 'COMPOSER 5 PRO NUMBER', 'COMPOSER 5 SPLIT',
       'COMPOSER 6 NAME', 'COMPOSER 6 PRO', 'COMPOSER 6 PRO NUMBER', 'COMPOSER 6 SPLIT',
       'PUBLISHER 1 NAME', 'PUBLISHER 1 PRO', 'PUBLISHER 1 PRO NUMBER', 'PUBLISHER 1 SPLIT',
       'PUBLISHER 2 NAME', 'PUBLISHER 2 PRO', 'PUBLISHER 2 PRO NUMBER', 'PUBLISHER 2 SPLIT',
       'PUBLISHER 3 NAME', 'PUBLISHER 3 PRO', 'PUBLISHER 3 PRO NUMBER', 'PUBLISHER 3 SPLIT',
       'PUBLISHER 4 NAME', 'PUBLISHER 4 PRO', 'PUBLISHER 4 PRO NUMBER', 'PUBLISHER 4 SPLIT',
       'PUBLISHER 5 NAME', 'PUBLISHER 5 PRO', 'PUBLISHER 5 PRO NUMBER', 'PUBLISHER 5 SPLIT',
       'PUBLISHER 6 NAME', 'PUBLISHER 6 PRO', 'PUBLISHER 6 PRO NUMBER', 'PUBLISHER 6 SPLIT'
   ];
    this.setState({csvData: [headersRow.join('\t')]})
    let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
        cue.rel_id === this.props.releaseFilter.value && (cue.cue_status !== 'Pulled' || 'Pending') && cue.cue_rating > 5
     )
     exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
       progressCount ++;
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      let genre = this.props.selectedCategories.filter(categories =>
         categories.cat_id === row.cat_id).map(cat =>
           cat.cat_name);

      let subGenre = this.props.selectedStyles.filter(styles =>
             styles.style_id === row.style_id).map(style =>
               style.style_name);
    // --------------------------------------------------------------------------------------------------

      let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split)
      let releaseParse = this.props.releaseFilter.label.split('R')[1];

      let newRow = [
        // provider filename
        `DLM_${row.cue_title.replace(/\s/g, '_')}.wav`,
        // provider track id
        row.cue_id,
        // title
        row.cue_title,
        // version
        '',
        // primary track
        this.props.selectedLibrary.library.filter(cues => row.cue_title.includes(cues.cue_title.split(/v\d{1,2}/)[0])).map(x => {
          return x.cue_id !== row.cue_id ?  x.cue_id : null})[0],
        // catalog
        'DL Music',
        // instrumental
        'Yes',
        // vocals
        '',
        // genre
        `${genre}, ${subGenre}`,
        // keywords
        descriptionString,
        // mood
        descriptionString,
        // description
        '',
        // era
        '',
        // sounds-like/influences
        row.sounds_like_band_edit || '',
        // instruments
        instrumentsString || '',
        // bpm
        '',
        // lyrics
        '',
        // restrictions
        '',
        // original/cover
        'Original',
        // one-stop licensing
        'Yes',
        // cd title / ref #
        `${genre}, ${subGenre} Vol. ${(/\_/).test(releaseParse) ?
                   releaseParse.split('_')[0] :
                   releaseParse}`,
        // release date
        row.cue_reldate_h.substring(0, 4),
        // track no
        row.cue_id,
        // iswc
        '',
        // isrc
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // tier // tier 2 = rating 8 - 10  // tier 1 = rating 6 - 7
        row.cue_rating > 7 ? 2 : 1 ,
        // ARTIST
        '',
        // 'COMPOSER 1 NAME'
        `${composerArray[0].first + ' '}${composerArray[0].middle ? composerArray[0].middle + ' ' : ''}${composerArray[0].last }${composerArray[0].suffix ? ' ' + composerArray[0].suffix : ''}`,
        // 'COMPOSER 1 PRO'
        composerArray[0].pro_name,
        // 'COMPOSER 1 PRO NUMBER'
        composerArray[0].cae,
        // 'COMPOSER 1 SPLIT'
        composerArray[0].composer_split,
        // 'COMPOSER 2 NAME'
        composerArray[1] ? `${composerArray[1].first + ' '}${composerArray[1].middle ? composerArray[1].middle + ' ' : ''}${composerArray[1].last }${composerArray[1].suffix ? ' ' + composerArray[1].suffix : ''}` : '',
        // 'COMPOSER 2 PRO'
        composerArray[1] ? composerArray[1].pro_name : '',
        // 'COMPOSER 2 PRO NUMBER'
        composerArray[1] ? composerArray[1].cae : '',
        // 'COMPOSER 2 SPLIT'
        composerArray[1] ? composerArray[1].composer_split : '',
        // 'COMPOSER 3 NAME'
        composerArray[2] ? `${composerArray[2].first + ' '}${composerArray[2].middle ? composerArray[2].middle + ' ' : ''}${composerArray[2].last }${composerArray[2].suffix ? ' ' + composerArray[2].suffix : ''}` : '',
        // 'COMPOSER 3 PRO'
        composerArray[2] ? composerArray[2].pro_name : '',
        // 'COMPOSER 3 PRO NUMBER'
        composerArray[2] ? composerArray[2].cae : '',
        // 'COMPOSER 3 SPLIT'
        composerArray[2] ? composerArray[2].composer_split : '',
        // 'COMPOSER 4 NAME'
        composerArray[3] ? `${composerArray[3].first + ' '}${composerArray[3].middle ? composerArray[3].middle + ' ' : ''}${composerArray[3].last }${composerArray[3].suffix ? ' ' + composerArray[3].suffix : ''}` : '',
        // 'COMPOSER 4 PRO'
        composerArray[3] ? composerArray[3].pro_name : '',
        // 'COMPOSER 4 PRO NUMBER'
        composerArray[3] ? composerArray[3].cae : '',
        // 'COMPOSER 4 SPLIT'
        composerArray[3] ? composerArray[3].composer_split : '',
        // 'COMPOSER 5 NAME'
        composerArray[4] ? `${composerArray[4].first + ' '}${composerArray[4].middle ? composerArray[4].middle + ' ' : ''}${composerArray[4].last }${composerArray[4].suffix ? ' ' + composerArray[4].suffix : ''}` : '',
        // 'COMPOSER 5 PRO'
        composerArray[4] ? composerArray[4].pro_name : '',
        // 'COMPOSER 5 PRO NUMBER'
        composerArray[4] ? composerArray[4].cae : '',
        // 'COMPOSER 5 SPLIT'
        composerArray[4] ? composerArray[4].composer_split : '',
        // 'COMPOSER 6 NAME'
        composerArray[5] ? `${composerArray[5].first + ' '}${composerArray[5].middle ? composerArray[5].middle + ' ' : ''}${composerArray[5].last }${composerArray[5].suffix ? ' ' + composerArray[5].suffix : ''}` : '',
        // 'COMPOSER 6 PRO'
        composerArray[5] ? composerArray[5].pro_name : '',
        // 'COMPOSER 6 PRO NUMBER'
        composerArray[5] ? composerArray[5].cae : '',
        // 'COMPOSER 6 SPLIT'
        composerArray[5] ? composerArray[5].composer_split : '',
        // 'PUBLISHER 1 NAME'
        composerArray[0].name_only,
        // 'PUBLISHER 1 PRO'
        composerArray[0].publisher_pro,
        // 'PUBLISHER 1 PRO NUMBER'
        composerArray[0].ipi,
        // 'PUBLISHER 1 SPLIT'
        composerArray[0].composer_split,
        // 'PUBLISHER 2 NAME'
        composerArray[1] ? composerArray[1].name_only : '',
        // 'PUBLISHER 2 PRO'
        composerArray[1] ? composerArray[1].publisher_pro : '',
        // 'PUBLISHER 2 PRO NUMBER'
        composerArray[1] ? composerArray[1].ipi : '',
        // 'PUBLISHER 2 SPLIT'
        composerArray[1] ? composerArray[1].composer_split : '',
        // 'PUBLISHER 3 NAME'
        composerArray[2] ? composerArray[2].name_only : '',
        // 'PUBLISHER 3 PRO'
        composerArray[2] ? composerArray[2].publisher_pro : '',
        // 'PUBLISHER 3 PRO NUMBER'
        composerArray[2] ? composerArray[2].ipi : '',
        // 'PUBLISHER 3 SPLIT'
        composerArray[2] ? composerArray[2].composer_split : '',
        // 'PUBLISHER 4 NAME'
        composerArray[3] ? composerArray[3].name_only : '',
        // 'PUBLISHER 4 PRO'
        composerArray[3] ? composerArray[3].publisher_pro : '',
        // 'PUBLISHER 4 PRO NUMBER'
        composerArray[3] ? composerArray[3].ipi : '',
        // 'PUBLISHER 4 SPLIT'
        composerArray[3] ? composerArray[3].composer_split : '',
        // 'PUBLISHER 5 NAME'
        composerArray[4] ? composerArray[4].name_only : '',
        // 'PUBLISHER 5 PRO'
        composerArray[4] ? composerArray[4].publisher_pro : '',
        // 'PUBLISHER 5 PRO NUMBER'
        composerArray[4] ? composerArray[4].ipi : '',
        // 'PUBLISHER 5 SPLIT'
        composerArray[4] ? composerArray[4].composer_split : '',
        // 'PUBLISHER 6 NAME'
        composerArray[5] ? composerArray[5].name_only : '',
        // 'PUBLISHER 6 PRO'
        composerArray[5] ? composerArray[5].publisher_pro : '',
        // 'PUBLISHER 6 PRO NUMBER'
        composerArray[5] ? composerArray[5].ipi : '',
        // 'PUBLISHER 6 SPLIT'
        composerArray[5] ? composerArray[5].composer_split : ''
       ]
       let progress = (progressCount/filteredLibrary.length)
       this.setState({csvData: [...this.state.csvData, newRow.join('\t')], progress})
     }, () => { // inProgress()
       this.props.updateDownload(this.state.progress)
     },
     () => { // done()
       this.props.updateDownload(1)
       this.props.downloadCompletedChecker();
       exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}PROTUNES_TIERED_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
     })
   }

  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147
          ? exportTools.exportError('Please Select A Batch To Export')
          : this.props.inclusive || releaseFilter.label === 'All'
            ? exportTools.exportError('We Typically Only Send ProTunes One Batch At A Time. Please Unselect Inclusive.')
          : releaseFilter.value.toString().includes('-')
          ? exportTools.exportError('We Typically Only Send ProTunes Batches. Please Select A Batch.')
          : this.proTunesExport())
        } className={
          this.props.inclusive
            ? 'strikethrough'
            : (releaseFilter.value
            && typeof releaseFilter.value !== 'string')
            && releaseFilter.label !== 'All'
            ? 'download-links'
            : 'strikethrough'
          }>
        {`ProTunes Batch Export ${
          (releaseFilter.value
          && typeof releaseFilter.value !== 'string')
          && releaseFilter.label !== 'All'
          ? releaseFilter.label
          : ''
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProTunesExport));
