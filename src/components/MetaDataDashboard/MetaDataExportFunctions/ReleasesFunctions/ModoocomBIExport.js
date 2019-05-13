import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


class ModoocomBIExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     xlsData: []
   }

  // ******************************************************************************************
  //  MODOOCOM BI EXPORT FUNCTION
  // ******************************************************************************************

  // seems finished, diffCheck


  modoocomBIExport = () => {
    this.props.resetDownload()
    this.props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      'Label',	'Number',	'Disc',	'Track',	'Track No. (Modoocom)',	'Title',	'Alternate Title',
      'Name',	'Type',	'Shares %',	'CAE',	'Society',	'Name',	'Type',	'Shares %',	'CAE',
      'Society',	'Name',	'Type',	'Shares %',	'CAE',	'Society',	'Name',	'Type',	'Shares %',
      'CAE',	'Society',	'Name',	'Type',	'Shares %',	'CAE',	'Society',	'Name',	'Type',	'Shares %',
      'CAE',	'Society',	'Duration',	'Description EN',	'Owners',	'ISRC',	'ISWC',	'Virtual Only',	'Rereleased'
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
        ).sort((a, b) => a.cat_id - b.cat_id)
        // this filtered library has an extra sort to sort by category

    let prevCatId = 0;
    let modoocomTrackNumber = 1;
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
      let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split).sort((c, d) => c.last < d.last ? -1 : c.last > d.last ? 1 : 0);
      let compString = '';
      let pubString = '';
      let temp = [];
      let publisherArray = [];
      let combinedPubSplit = 0;

      // this function works a little differently than other exports
      for(let c in composerArray){
        // checks to see if the current composer's publisher has already been accounted for for this track
        let pubDoesntExist = temp.indexOf(composerArray[c].name_only) === -1;
        let currentSplit = composerArray[c].composer_split.toFixed(2);
        // if publisher not accounted for set the combinedPub split to it's initial split
        combinedPubSplit = pubDoesntExist
          ? currentSplit  // else we find the publisher and add the splits up
          : parseFloat(publisherArray.filter(pub => pub.name_only === composerArray[c].name_only).map(x => x.publisher_split)) + parseFloat(currentSplit);
        pubString += (c > 0) && pubDoesntExist
          ? ';'
          : '';
        pubString += pubDoesntExist
          ? `${composerArray[c].name_only}`
          : '';
        compString += `${composerArray[c].last}${composerArray[c].suffix ?  ' ' + composerArray[c].suffix  : ''}, ${composerArray[c].first}${composerArray[c].middle ?  ' ' + composerArray[c].middle : ''}`;
        compString += c < composerArray.length - 1
          ? ' / '
          : ' ';
        pubDoesntExist // push this publisher's name into an array to keep track of which pubs have been accounted for
          ? temp.push(composerArray[c].name_only)
          : null;
        // create a new publisher object with the combined split data
        let pub = {publisher_pro: composerArray[c].publisher_pro, publisher_split: parseFloat(combinedPubSplit).toFixed(2), name_only: composerArray[c].name_only, ipi: composerArray[c].ipi}
        // filter through new publisher objects array for the current publisher
        let pubFilter = publisherArray.filter(pub => pub.name_only === composerArray[c].name_only);
        // if one is found, splice it out and replace it the new combined split data publisher object,
        // or else we haven't accounted for this publisher yet, so we will just push it into the publisherArray
        pubFilter.length > 0 ? publisherArray.splice(publisherArray.map(x => x.name_only).indexOf(composerArray[c].name_only), 1, pub) : publisherArray.push(pub);
      }
      // Modoocom has a very unique way of organizing their metadata, they sepearate releases into
      // categories and number the tracks alphabetically on each category starting from 1.
      // The logic is as follows: if we are still on the previous category, add + 1 to track count,
      // Or else start the track count over at 1
      modoocomTrackNumber = prevCatId !== row.cat_id ? 1 : modoocomTrackNumber + 1;
      prevCatId = prevCatId !== row.cat_id ? row.cat_id : prevCatId;
      // --------------------------------------------------------------------------------------------------

      let newRow = [
        // Label
        'DLM',
        // Number
        `${this.albumPrefixParse(row.cat_id)}${releaseParse}01`,
        // Disc
        `${genre} Vol. ${releaseParse}.1`,
        // Track
        row.cue_id,
        // Track No. (Modoocom)
        modoocomTrackNumber,
        // Title
        row.cue_title,
        // Alternate Title
        '',
        // Name
        `${composerArray[0].last}, ${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ''}${composerArray[0].suffix ?  ' ' + composerArray[0].suffix  : ''}`,
        // Type
        'Composer',
        // Shares %
        composerArray[0].composer_split,
        // CAE
        composerArray[0].cae,
        // Society
        composerArray[0].pro_name,
        // Name
        composerArray[1]
          ? `${composerArray[1].last}, ${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ''}${composerArray[1].suffix ?  ' ' + composerArray[1].suffix  : ''}`
          : '',
        // Type
        composerArray[1]
          ? 'Composer'
          : '',
        // Shares %
        composerArray[1]
          ? composerArray[1].composer_split
          : '',
        // CAE
        composerArray[1]
          ? composerArray[1].cae
          : '',
        // Society
        composerArray[1]
          ? composerArray[1].pro_name
          : '',
        // Name
        composerArray[2]
          ? `${composerArray[2].last}, ${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ''}${composerArray[2].suffix ?  ' ' + composerArray[2].suffix  : ''}`
          : '',
        // Type
        composerArray[2]
          ? 'Composer'
          : '',
        // Shares %
        composerArray[2]
          ? composerArray[2].composer_split
          : '',
        // CAE
        composerArray[2]
          ? composerArray[2].cae
          : '',
        // Society
        composerArray[2]
          ? composerArray[2].pro_name
          : '',
        // Name
        composerArray[3]
          ? `${composerArray[3].last}, ${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ''}${composerArray[3].suffix ?  ' ' + composerArray[3].suffix  : ''}`
          : '',
        // Type
        composerArray[3]
          ? 'Composer'
          : '',
        // Shares %
        composerArray[3]
          ? composerArray[3].composer_split
          : '',
        // CAE
        composerArray[3]
          ? composerArray[3].cae
          : '',
        // Society
        composerArray[3]
          ? composerArray[3].pro_name
          : '',
        // Name
        composerArray[4]
          ? `${composerArray[4].last}, ${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ''}${composerArray[4].suffix ?  ' ' + composerArray[4].suffix  : ''}`
          : '',
        // Type
        composerArray[4]
          ? 'Composer'
          : '',
        // Shares %
        composerArray[4]
          ? composerArray[4].composer_split
          : '',
        // CAE
        composerArray[4]
          ? composerArray[4].cae
          : '',
        // Society
        composerArray[4]
          ? composerArray[4].pro_name
          : '',
        // Name
        composerArray[5]
          ? `${composerArray[5].last}, ${composerArray[5].first}${composerArray[5].middle ? " " + composerArray[5].middle : ''}${composerArray[5].suffix ?  ' ' + composerArray[5].suffix  : ''}`
          : '',
        // Type
        composerArray[5]
          ? 'Composer'
          : '',
        // Shares %
        composerArray[5]
          ? composerArray[5].composer_split
          : '',
        // CAE
        composerArray[5]
          ? composerArray[5].cae
          : '',
        // Society
        composerArray[5]
          ? composerArray[5].pro_name
          : '',
        // Duration
        row.cue_duration,
        // Description EN
        descriptionString.toLowerCase(),
        // Owners
        'DL Music - Background Instrumentals',
        // ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // ISWC
        '',
        // Virtual Only
        '',
        // Rereleased
        ''
      ]
      let progress = (progressCount/filteredLibrary.length)
      this.setState({xlsData: [...this.state.xlsData, newRow.join('\t')], progress})
   }, () => { // inProgress()
     this.props.updateDownload(this.state.progress)
   },
   () => { // done()
     this.props.updateDownload(1)
     this.props.downloadCompletedChecker();
     exportTools.generateDownload(this.state.xlsData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}MODOOCOM_BI_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`);
   })
  }

  albumPrefixParse = (cat_id) => {
    switch(cat_id){
      case 1:
        return 'BMP';
        break;
      case 2:
        return 'DNC';
        break;
      case 3:
        return 'DRA';
        break;
      case 4:
        return 'ORC';
        break;
      case 5:
        return 'HIP';
        break;
      case 6:
        return 'HOL';
        break;
      case 7:
        return 'JAZ';
        break;
      case 8:
        return 'REG';
        break;
      case 9:
        return 'RET';
        break;
      case 10:
        return 'RBF';
        break;
      case 11:
        return 'SCR';
        break;
      case 12:
        return 'SPE';
        break;
      case 13:
        return 'VOX';
        break;
      case 14:
        return 'WLD';
        break;
      case 15:
        return 'WPP';
        break;
    }
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
          ? exportTools.exportError('We Typically Only Send Modoocom Releases. Please Select A Release.')
          : this.props.selectedLibrary.libraryName === 'independent-artists'
          ? exportTools.exportError('Please Use The Modoocom IA Export')
          : this.modoocomBIExport())
      } className={
        this.props.inclusive || releaseFilter === 147 ||
        (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
          ? 'strikethrough'
          : 'download-links'
      }>
        {`Modoocom Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModoocomBIExport));
