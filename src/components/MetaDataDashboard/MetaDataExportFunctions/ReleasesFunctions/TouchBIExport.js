import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


class TouchBIExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     xlsData: []
   }

  // ******************************************************************************************
  //  TOUCH BI EXPORT FUNCTION
  // ******************************************************************************************
  touchBIExport = () => {
    this.props.resetDownload()
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      'LIBRARY', 'LABEL', 'CD CODE', 'CD TITLE', 'ISRC',	'CD DESCRIPTION',	'TRACK NUMBER',	'TRACK TITLE',
      'TIME/DURATION',	'COMPOSER NAME & SURNAME 1',	'COPYRIGHT SOCIETY COMPOSER 1',
      'COMPOSER NAME & SURNAME 2',	'COPYRIGHT SOCIETY COMPOSER 2',	'COMPOSER NAME & SURNAME 3',
      'COPYRIGHT SOCIETY COMPOSER 3',	'COMPOSER NAME & SURNAME 4',	'COPYRIGHT SOCIETY COMPOSER 4',
      'COMPOSER NAME & SURNAME 5',	'COPYRIGHT SOCIETY COMPOSER 5',	'YEAR RELEASE',	'TEMPO',	'CATEGORY',
      'SUBCATEGORY',	'TRACK DESCRIPTION',	'INSTRUMENTATION',	'KEYWORDS'
     ];

    this.setState({xlsData: [headersRow.join('\t')]})
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
          : cue.rel_id === this.props.releaseFilter.value && cue.cue_status === 'Active'
        ).sort((e, f) => // this export demands we order things alphabetically by cue_title
            e.cue_title - f.cue_title).sort((c, d) => //  then by category name alphabetically....
              (this.props.selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name < this.props.selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
              ? -1
              : (this.props.selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name > this.props.selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
              ? 1
              : 0).sort((a, b) =>
              // and then style name alphabetically...
                (this.props.selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name < this.props.selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
                ? -1
                : (this.props.selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name > this.props.selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
                ? 1
                : 0)
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      let releaseParse = this.props.releaseFilter.label.split('R')[1];
      let genre = this.props.selectedCategories.filter(categories =>
            categories.cat_id === row.cat_id).map(cat =>
              cat.cat_name)[0];
      let subGenre = this.props.selectedStyles.filter(styles =>
             styles.style_id === row.style_id).map(style =>
               style.style_name)[0];
      // --------------------------------------------------------------------------------------------------
      let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

      let newRow = [
        // LIBRARY
        'DL Music - Background Instrumentals',
        // LABEL
        'DL Music - Background Instrumentals',
        // CD CODE
        `DLM-BI-${row.style_id.toString().padStart(3, 0)}-R${releaseParse.padStart(3, 0)}`,
        // CD TITLE
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // CD DESCRIPTION
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // TRACK NUMBER
        row.cue_id,
        // TRACK TITLE
        row.cue_title,
        // TIME/DURATION
        row.cue_duration,
        // COMPOSER NAME & SURNAME 1
        `${composerArray[0].first + ' '}${composerArray[0].middle ? composerArray[0].middle + ' ' : ''}${composerArray[0].last }${composerArray[0].suffix ? ' ' + composerArray[0].suffix : ''}`,
        // COPYRIGHT SOCIETY COMPOSER 1
        composerArray[0].pro_name,
        // COMPOSER NAME & SURNAME 2
        composerArray[1] ? `${composerArray[1].first + ' '}${composerArray[1].middle ? composerArray[1].middle + ' ' : ''}${composerArray[1].last }${composerArray[1].suffix ? ' ' + composerArray[1].suffix : ''}` : '',
        // COPYRIGHT SOCIETY COMPOSER 2
        composerArray[1] ? composerArray[1].pro_name : '',
        // COMPOSER NAME & SURNAME 3
        composerArray[2] ? `${composerArray[2].first + ' '}${composerArray[2].middle ? composerArray[2].middle + ' ' : ''}${composerArray[2].last }${composerArray[2].suffix ? ' ' + composerArray[2].suffix : ''}` : '',
        // COPYRIGHT SOCIETY COMPOSER 3
        composerArray[2] ? composerArray[2].pro_name : '',
        // COMPOSER NAME & SURNAME 4
        composerArray[3] ? `${composerArray[3].first + ' '}${composerArray[3].middle ? composerArray[3].middle + ' ' : ''}${composerArray[3].last }${composerArray[3].suffix ? ' ' + composerArray[3].suffix : ''}` : '',
        // COPYRIGHT SOCIETY COMPOSER 4
        composerArray[3] ? composerArray[3].pro_name : '',
        // COMPOSER NAME & SURNAME 5
        composerArray[4] ? `${composerArray[4].first + ' '}${composerArray[4].middle ? composerArray[4].middle + ' ' : ''}${composerArray[4].last }${composerArray[4].suffix ? ' ' + composerArray[4].suffix : ''}` : '',
        // COPYRIGHT SOCIETY COMPOSER 5
        composerArray[4] ? composerArray[4].pro_name : '',
        // YEAR RELEASE
        row.cue_reldate_h.substring(0, 4),
        // TEMPO
        this.props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // CATEGORY
        genre,
        // SUBCATEGORY
        subGenre,
        // TRACK DESCRIPTION
        descriptionString,
        // INSTRUMENTATION
        instrumentsString,
        // KEYWORDS
        descriptionString
      ]
      let progress = (progressCount/filteredLibrary.length)
      this.setState({xlsData: [...this.state.xlsData, newRow.join('\t')], progress})
   }, () => { // inProgress()
     this.props.updateDownload(this.state.progress)
   },
   () => { // done()
     this.props.updateDownload(1)
     this.props.downloadCompletedChecker();
     exportTools.generateDownload(this.state.xlsData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}TOUCH_BI_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`);
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
              ? exportTools.exportError('We Typically Only Send Touch Releases. Please Select A Release.')
              : this.props.selectedLibrary.libraryName === 'independent-artists'
              ? exportTools.exportError('Please Select a Release Or Use The Touch IA Export.')
              : this.touchBIExport())
      } className={
        this.props.inclusive || releaseFilter === 147 || this.props.selectedLibrary.libraryName !== 'background-instrumentals' ||
        (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
          ? 'strikethrough'
          : 'download-links'
      }>
        {`Touch BI Release Export ${
          this.props.inclusive || releaseFilter === 147 ||  this.props.selectedLibrary.libraryName !== 'background-instrumentals' ||
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TouchBIExport));
