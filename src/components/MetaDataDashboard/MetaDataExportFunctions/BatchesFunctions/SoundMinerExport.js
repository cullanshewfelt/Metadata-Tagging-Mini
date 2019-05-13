import React from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


class SoundMinerExport extends React.Component {
   constructor(props) {
     super(props)
   }
   state = {
     progress: 0.00,
     csvData: []
   }

  // ******************************************************************************************
  //  SOUND MINER EXPORT FUNCTION
  // ******************************************************************************************

  soundMinerExport = () => {
    this.props.resetDownload();
    this.props.downloadCompletedChecker();
    let isBG =  this.props.selectedLibrary.libraryName === 'background-instrumentals' ? true : false;
    let progressCount = 0;
    let headersRow = [
       'Filename', 'Manufacturer', 'Library', 'CDTitle', 'TrackTitle', 'Version', 'Description', 'Category', 'SubCategory',
       'FeaturedInstrument', 'Keywords', 'Composer', 'Artist', 'Publisher', 'Designer', 'BWDescription', 'BWOriginator',
       'BWOriginatorRef', 'BWTime', 'BWDate', 'Tempo', 'ReleaseDate', 'TrackYear'
     ];
     isBG ? headersRow.push('ISRC') : null;
     this.setState({csvData: [headersRow.join('\t')]})
     let releasesArray = isNaN(this.props.releaseFilter.value) && this.props.releaseFilter.value.includes('-') ? this.props.releaseFilter.value.split('-') : [];
     let filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
       this.props.inclusive && releasesArray.length !== 0
         ? cue.rel_id <= releasesArray[releasesArray.length - 1] && cue.cue_status === 'Active'
         : this.props.inclusive
         ? cue.rel_id <= this.props.releaseFilter.value && cue.cue_status === 'Active'
         : this.props.releaseFilter.label === 'All'
         ? cue.cue_status === 'Active'
         : releasesArray.length !== 0
         ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status === 'Active'
         : cue.rel_id === this.props.releaseFilter.value && cue.cue_status === 'Active')
     exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
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
       let composerArray = this.props.selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);
       // console.log(59, composerArray)
       let compString = '';
       let splitString = '';
       let pubString = '';
       for(let c in composerArray){
         if(!isBG && /\(\w+\)/g.test(composerArray[c].publisher_name)){
           let pubSwitch = /\(\w+\)/g.exec(composerArray[c].publisher_name)[0];
           switch(pubSwitch.substring(1, pubSwitch.length - 1)){
             case 'ASCAP':
               pubString += 'Derek Luff Music, Inc. (ASCAP)';
               break;
             case 'BMI':
               pubString += 'Dewmarc Music (BMI)';
               break;
             case 'SESAC':
               pubString += 'Ridek Music (SESAC)';
               break;
           }
          } else {
            pubString += `${composerArray[c].publisher_name}`
          }
         pubString += c < composerArray.length - 1 ? ' / ' : ' ';
         compString += `${composerArray[c].last}${composerArray[c].suffix ? ' ' + composerArray[c].suffix : ''}, ${composerArray[c].first} ${composerArray[c].middle || ''} (${composerArray[c].pro_name})`;
         compString += c < composerArray.length - 1 ? ' / ' : ' ';
         splitString += `${composerArray[c].composer_split}`
         splitString += c < composerArray.length - 1 ? '/' : '%';
       }
       let wavRow = [
         // Filename
         isBG
            ? `DLM - ${row.cue_title}.aif`
            : this.props.selectedLibrary.libraryName === 'independent-artists'
            ? `IA - ${row.cue_title}.aif`
            : '' ,
         // Manufacturer
         isBG
           ? `DL Music`
           : 'DL Music - Indie Artists',
         // Library
         isBG
           ? `${compString}${splitString}`
           : 'DL Music - Indie Artists',
         // CDTitle
         row.cat_id !==19 && row.style_id !== 147
           ? `${genre}, ${subGenre}`
           : '',
         // TrackTitle
         row.cue_title,
         // Version
         isBG && (/\sv[0-9]{1,2}/).test(row.cue_title)
           ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, '')
           : this.props.selectedLibrary.libraryName === 'independent-artists' && row.cue_title.includes('Instrumental')
           ? 'Instrumental'
           : '',
         // Description
         isBG
          ? pubString
          : 'To license this track contact DL Music at 323-878-0400, or info@dl-music.com',
         // Category
         `${genre}`,
         // SubCategory
         `${subGenre}`,
         // FeaturedInstrument
         instrumentsString || '',
         // Keywords
         descriptionString,
         // Composer
         `${compString}${splitString}`,
         // Artist
         isBG
           ? `${compString}${splitString}`
           : 'DL Music - Indie Artists',
         // Publisher
         pubString,
         // DESIGNER
         isBG
          ? pubString
          : 'DL Music - Indie Artists',
         // BWDescription
         isBG
          ? pubString
          : 'To license this track contact DL Music at 323-878-0400, or info@dl-music.com',
         // BWOriginator
         'DL-Music.com',
         // BWOriginator Reference
         isBG
         ? `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`
         : '',
         // BWTime
         row.cue_reldate_h.includes('T')
          ? row.cue_reldate_h.split('T')[1].split('.')[0]
          : row.cue_reldate_h.split(' ')[1].split('.')[0],
         // BWDate
         row.cue_reldate_h.split('T')[0],
         // Tempo
         this.props.tempos.filter(tempo =>
           tempo.tempo_id === row.tempo_id)[0].tempo_name,
         // ReleaseDate
         row.cue_reldate_h.split('T')[0],
         // TrackYear
         row.cue_reldate_h.substring(0, 4)
       ]
       isBG // ISRC
         ? wavRow.push(`US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`)
         : null
       progressCount ++;
       let progress = (progressCount/filteredLibrary.length)
       this.setState({csvData:
           [...this.state.csvData,
          `${wavRow.join('\t')}`]
        })
        wavRow.shift()
        this.setState({csvData:
          [...this.state.csvData,
          [ this.props.selectedLibrary.libraryName === 'background-instrumentals'
              ? `DLM - ${row.cue_title}.mp3`
              : this.props.selectedLibrary.libraryName === 'independent-artists'
              ? `IA - ${row.cue_title}.mp3`
              : '' , ...wavRow].join('\t'),
          [ this.props.selectedLibrary.libraryName === 'background-instrumentals'
              ? `DLM - ${row.cue_title}.wav`
              : this.props.selectedLibrary.libraryName === 'independent-artists'
              ? `IA - ${row.cue_title}.wav`
              : '' , ...wavRow].join('\t') ],
          progress
        })
     }, () => { // inProgress()
       this.props.updateDownload(this.state.progress)
     },
     () => { // done()
       this.props.updateDownload(1)
       this.props.downloadCompletedChecker();
       exportTools.generateDownload(this.state.csvData.join('\n'), `DLM_${this.props.releaseFilter.label + "_"}SOUNDMINER_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
     })
   }

  render(){
    let releaseFilter = this.props.releaseFilter;
    let selectedComposers = this.props.selectedComposers;
    return (
      <a onClick={(() =>
        exportTools.batchChecker(releaseFilter)
          ? this.soundMinerExport()
          : selectedComposers === undefined || selectedComposers.length === 0
            ? alert('This can\'t be exported due to unfinished tagging')
            : exportTools.exportError())
          } className={
            releaseFilter === 147
            ? 'strikethrough'
            : 'download-links'
          }>
        {`SoundMiner ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SoundMinerExport));
