import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

class NBCSoundMinerExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }
   // ******************************************************************************************
   //  NBCU SOUNDMINER RELEASE EXPORT FUNCTION
   // ******************************************************************************************
   nbcSoundMinerExport = () => {
     this.props.resetDownload();
     this.props.downloadCompletedChecker();
     let progressCount = 0;
     let headersRow = [
        'Filename', 'Manufacturer', 'Library', 'CDTitle', 'TrackTitle', 'Version', 'Description', 'Category', 'SubCategory',
        'FeaturedInstrument', 'Keywords', 'Composer', 'Publisher', 'Designer', 'BWDescription', 'BWOriginator',
        'BWOriginatorRef', 'BWTime', 'BWDate', 'Tempo', 'ReleaseDate', 'TrackYear', 'ISRC'
      ];
      this.setState({csvData: [headersRow.join('\t')]})
      let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
      let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
          this.props.releaseFilter.value !== 9999
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status === 'Active'|| 'Instrumental_Active')
          : null
        )
      exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
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
        for(let c in composerArray){
          pubString += `${composerArray[c].publisher_name}`;
          pubString += c < composerArray.length - 1 ? ' / ' : ' ';
          compString += `${composerArray[c].last}${composerArray[c].suffix || ''}, ${composerArray[c].first} ${composerArray[c].middle || ''} (${composerArray[c].pro_name})`;
          compString += c < composerArray.length - 1 ? ' / ' : ' ';
          splitString += `${composerArray[c].composer_split}`
          splitString += c < composerArray.length - 1 ? '/' : '%';
        }

        let wavRow = [
          // Filename
          `DLM - ${row.cue_title}.wav`,
          // Manufacturer
          `DL Music`,
          // Library
          `${compString}${splitString}`,
          // CDTitle
          row.cat_id !==19 && row.style_id !== 147 ? `${this.props.selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}, ${this.props.selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)}` : '',
          // TrackTitle
          row.cue_title,
          // Version
          (/\sv[0-9]{1,2}/).test(row.cue_title) 
            ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, '')
            : "",
          // Description
          pubString,
          // Category
          `${this.props.selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
          // SubCategory
          `${this.props.selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)}`,
          // FeaturedInstrument
          instrumentsString || '',
          // Keywords
          descriptionString,
          // Composer
          `${compString}${splitString}`,
          // Publisher
          pubString,
          // DESIGNER
          pubString,
          // BWDescription
          pubString,
          // BWOriginator
          'DL-Music.com',
          // BWOriginator Reference
          `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
          // BWTime
          row.cue_reldate_h.includes('T') ? row.cue_reldate_h.split('T')[1].split('.')[0] : row.cue_reldate_h.split(' ')[1].split('.')[0],
          // BWDate
          row.cue_reldate_h.split('T')[0],
          // Tempo
          this.props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
          // ReleaseDate
          row.cue_reldate_h.split('T')[0],
          // TrackYear
          row.cue_reldate_h.substring(0, 4),
          // ISRC
          `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`
        ]
        progressCount ++;
        let progress = (progressCount/filteredLibrary.length)
        this.setState({csvData:
            [...this.state.csvData,
           `${wavRow.join('\t')}`]
         })
         wavRow.shift()
         this.setState({csvData:
           [...this.state.csvData,
           [`DLM - ${row.cue_title}.aif`, ...wavRow].join('\t'),
           [`DLM - ${row.cue_title}.mp3`, ...wavRow].join('\t') ],
           progress
         })
      }, () => { // inProgress()
        this.props.updateDownload(this.state.progress)
      },
      () => { // done()
        this.props.updateDownload(1)
        this.props.downloadCompletedChecker();
        exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}NBC_SOUNDMINER_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
      })
    }
  render(){
    let releaseFilter = this.props.releaseFilter;
    return (
      <a onClick={(() =>
        releaseFilter === 147
          ? exportTools.exportError()
          : !releaseFilter.value.toString().includes('-')
          ? exportTools.exportError('We Typically Only Send NBC Releases. Please Select A Release.')
          :  this.props.selectedLibrary.libraryName === 'independent-artists'
          ? exportTools.exportError('We Don\'t Send Our Independent Artists Catalog To NBC')
          : this.props.inclusive || releaseFilter.label === 'All'
            ? exportTools.exportError('We Typically Only Send NBC One Release At A Time. Please Unselect Inclusive.')
            : this.nbcSoundMinerExport())
      } className={
        this.props.inclusive
          ? 'strikethrough'
          : (releaseFilter.value
          && typeof releaseFilter.value === 'string')
          && releaseFilter.label !== 'All'
          ? 'download-links'
          : 'strikethrough'
        }>
        {`NBC SoundMiner Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NBCSoundMinerExport));
