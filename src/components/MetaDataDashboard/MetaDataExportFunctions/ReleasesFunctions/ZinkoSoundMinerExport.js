import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class ZinkoSoundMinerExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }
   // ******************************************************************************************
   //  ZINKO SOUNDMINER RELEASE EXPORT FUNCTION
   // ******************************************************************************************

   // export looks and seems to work fine,
   // needs to be diffChecked

   zinkoSoundMinerExport = () => {
     this.props.resetDownload();
     this.props.downloadCompletedChecker();
     let progressCount = 0;
     let headersRow = [
        'Filename', 'Manufacturer', 'Library', 'CDTitle', 'TrackTitle', 'Version', 'Description', 'Category', 'SubCategory',
        'FeaturedInstrument', 'Keywords', 'Composer', 'Publisher', 'Tempo', 'ReleaseDate', 'TrackYear'
      ];
      this.setState({csvData: [headersRow.join('\t')]})
      let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
      let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
          releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status === 'Active')
          : null
        )
      exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
        let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
        let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
        let genre = this.props.selectedCategories.filter(categories =>
           categories.cat_id === row.cat_id).map(cat =>
             cat.cat_name)[0];
        let subGenre = this.props.selectedStyles.filter(styles =>
               styles.style_id === row.style_id).map(style =>
                 style.style_name)[0];
      // --------------------------------------------------------------------------------------------------
        let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

        let compString = '';
        let splitString = '';
        let pubString = '';
        let proString = '('
        for(let c in composerArray){
          pubString += `${composerArray[c].publisher_name}`;
          pubString += c < composerArray.length - 1 ? ' / ' : ' ';
          compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + ' ' : ''}${composerArray[c].last}${composerArray[c].suffix ?  ' ' + composerArray[c].suffix  : ''}`;
          compString += c < composerArray.length - 1 ? ' / ' : ' ';
          proString +=  `${composerArray[c].pro_name}`;
          proString += c < composerArray.length - 1 ? ' / ' : ')'
        }
        let newRow = [
          // Filename
          `DLM${row.style_id.toString().padStart(3, 0)}_${row.cue_id}_${row.cue_title.toLowerCase().replace(/\s/gm, '')}.mp3`,
          // Manufacturer
          `DL Music`,
          // Library
          `DL Music`,
          // CDTitle
          `${genre}, ${subGenre}`,
          // TrackTitle
          row.cue_title,
          // Version
          (/\sv[0-9]{1,2}/).test(row.cue_title)
            ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, '')
            : "",
          // Description
          descriptionString,
          // Category
          genre,
          // SubCategory
          subGenre,
          // FeaturedInstrument
          instrumentsString.toUpperCase(),
          // Keywords
          descriptionString.toUpperCase(),
          // Composer
          `${compString}${proString}`,
          // Publisher
          pubString,
          // Tempo
          this.props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
          // ReleaseDate
          moment(row.cue_reldate_h).format('YYYY-MM-DD HH:mm:ss'),
          // TrackYear
          row.cue_reldate_h.substring(0, 4)
        ]
        progressCount ++;
        let progress = (progressCount/filteredLibrary.length)
        this.setState({csvData:
            [...this.state.csvData,
           `${newRow.join('\t')}`],
            progress
         })
      }, () => { // inProgress()
        this.props.updateDownload(this.state.progress)
      },
      () => { // done()
        this.props.updateDownload(1)
        this.props.downloadCompletedChecker();
        exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}ZINKO_SOUNDMINER_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
      })
    }
  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147
          ? exportTools.exportError()
          : !releaseFilter.value.toString().includes('-')
          ? exportTools.exportError('We Typically Only Send Zinko Releases. Please Select A Release.')
          :  this.props.selectedLibrary.libraryName === 'independent-artists'
          ? exportTools.exportError('We Don\'t Send Our Independent Artists Catalog To Zinko')
          : this.props.inclusive || releaseFilter.label === 'All'
            ? exportTools.exportError('We Typically Only Send Zinko One Release At A Time. Please Unselect Inclusive.')
            : this.zinkoSoundMinerExport())
      } className={
        this.props.inclusive
          ? 'strikethrough'
          : (releaseFilter.value
          && typeof releaseFilter.value === 'string')
          && releaseFilter.label !== 'All'
          ? 'download-links'
          : 'strikethrough'
        }>
        {`Zinko SoundMiner Release Export ${
          (releaseFilter.value
          && typeof releaseFilter.value === 'string')
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ZinkoSoundMinerExport));
