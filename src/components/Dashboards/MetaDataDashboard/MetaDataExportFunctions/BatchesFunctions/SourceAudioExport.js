import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

const SourceAudioExport = (props) => {
  const { cuesLoading, downloadCompletedChecker, inclusive, releaseFilter, resetDownload,
          selectedCategories, selectedComposers, selectedLibrary, selectedStyles, updateDownload, tempos
        } = props;

  const [csvData, setCsvData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}${inclusive ? 'INC_' : ''}Source_Audio_${moment().format('YYYY.MM.DD-HH_mm_ss')}.csv`;
    progress === 1
      ? exportTools.generateDownload(csvData.join('\n'), downloadLink)
      : updateDownload(progress)
  }, [progress])

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && csvData.indexOf(newRowData.join('\t')) === -1) && setCsvData([...csvData, newRowData.join('\t')]);
  }, [progress, newRowData, csvData])

  // ******************************************************************************************
  // Source Audio EXPORT FUNCTION
  // ------------------------------------------------------------------------------------------
  // ******************************************************************************************

  const sourceAudioExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = ['xx MAIN VERSION TITLE xx', 'Sourceaudio Id', 'Catalog', 'Label', 'Title', 'Filename', 'Master ID',
      'Album', 'Album Code', 'Album Description', 'Album Genre', 'Track Number', 'Artist', 'Composer', 'Publisher', 'Genres',
      'Tempos', 'Cue Types', 'Bpm', 'Release Date', 'Description', 'Mood', 'Style', 'Style Of', 'Lyrics', 'Has Vocal',
      'Explicit', 'Isrc', 'Iswc', 'Publisher 1 Company', 'Publisher 1 Pro Affiliation', 'Publisher 1 CAE/IPI',
      'Publisher 1 Ownership Share', 'Publisher 1 Role', 'Publisher 1 Collection Share Percentage',
      'Publisher 1 Collection Share Territory', 'Writer 1 First Name', 'Writer 1 Last Name', 'Writer 1 Company',
      'Writer 1 Pro Affiliation', 'Writer 1 CAE/IPI', 'Writer 1 Ownership Share', 'Writer 1 Publisher', 'Writer 1 Role',
      'Publisher 2 Company', 'Publisher 2 Pro Affiliation', 'Publisher 2 CAE/IPI',
      'Publisher 2 Ownership Share', 'Publisher 2 Role', 'Publisher 2 Collection Share Percentage',
      'Publisher 2 Collection Share Territory', 'Writer 2 First Name', 'Writer 2 Last Name', 'Writer 2 Company',
      'Writer 2 Pro Affiliation', 'Writer 2 CAE/IPI', 'Writer 2 Ownership Share', 'Writer 2 Publisher', 'Writer 2 Role',
      'Publisher 3 Company', 'Publisher 3 Pro Affiliation', 'Publisher 3 CAE/IPI', 'Publisher 3 Ownership Share',
      'Publisher 3 Role', 'Publisher 3 Collection Share Percentage', 'Publisher 3 Collection Share Territory',
      'Writer 3 First Name', 'Writer 3 Last Name', 'Writer 3 Company', 'Writer 3 Pro Affiliation', 'Writer 3 CAE/IPI',
      'Writer 3 Ownership Share', 'Writer 3 Publisher', 'Writer 3 Role', 'Publisher 4 Company', 'Publisher 4 Pro Affiliation',
      'Publisher 4 CAE/IPI', 'Publisher 4 Ownership Share', 'Publisher 4 Role', 'Publisher 4 Collection Share Percentage',
      'Publisher 4 Collection Share Territory', 'Writer 4 First Name', 'Writer 4 Last Name', 'Writer 4 Company',
      'Writer 4 Pro Affiliation', 'Writer 4 CAE/IPI', 'Writer 4 Ownership Share', 'Writer 4 Publisher', 'Writer 4 Role',
      'Publisher 5 Company', 'Publisher 5 Pro Affiliation', 'Publisher 5 CAE/IPI', 'Publisher 5 Ownership Share',
      'Publisher 5 Role', 'Publisher 5 Collection Share Percentage', 'Publisher 5 Collection Share Territory',
      'Writer 5 First Name', 'Writer 5 Last Name', 'Writer 5 Company', 'Writer 5 Pro Affiliation', 'Writer 5 CAE/IPI',
      'Writer 5 Ownership Share', 'Writer 5 Publisher', 'Writer 5 Role', 'Instrumentation', 'Pro', 'Release'
     ];
     setCsvData([headersRow.join('\t')])
     let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes('-') ? releaseFilter.value.split('-') : [];
     let filteredLibrary = selectedLibrary.library.filter(cue =>
       inclusive && releasesArray.length !== 0
         ? cue.rel_id <= releasesArray[releasesArray.length - 1]
         : inclusive
         ? cue.rel_id <= releaseFilter.value
         : releasesArray.length !== 0
         ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
         : cue.rel_id === releaseFilter.value)
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      // --------------------------------------------------------------------------------------------------
      //  this switch statement parses the genre
      let parsedGenre = '';

      if(row.cat_id === 1 || row.cat_id === 3 || row.cat_id === 4 || row.cat_id === 14 || row.cat_id === 15){
        switch(row.cat_id){
          // BUMPERS - TRANSITIONS  ***************************************************************
          case 1:
            parsedGenre = `Stingers (${selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)})`;
            parsedGenre = parsedGenre.replace('(Orchestral Dramatic)', '(Orchestral)');
            break;
          // DRAMA  ***************************************************************
          case 3:
            parsedGenre = `Drama (${selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)})`;
            parsedGenre = parsedGenre.replace('(Percussive Dramatic)', '(Percussive)');
            break;
          // DRAMA ORCHESTRAL  ***************************************************************
          case 4:
            parsedGenre = `Orchestral (${selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)})`;
            break;
          // WORLD MUSIC  ***************************************************************
          case 14:
            parsedGenre = `World Music (${selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)})`;
            parsedGenre = parsedGenre.replace('(Contemporary World)', '(Contemporary)');
            parsedGenre = parsedGenre.replace('(Dramatic World)', '(Dramatic)');
            break;
          // WORLD POP  ***************************************************************
          case 15:
            parsedGenre = `World Pop (${selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)})`;
            break;
        }
      } else {
        switch(parseInt(row.style_id)){
          // SCORE TOOLS ***************************************************************
          case 71:
            parsedGenre = "Stings and Hits";
            break;
          case 105:
            parsedGenre = "Carefree Mixdowns";
            break;
          case 110:
            parsedGenre = "Dramatic Mixdowns";
            break;
          case 111:
            parsedGenre = "Driving Mixdowns";
            break;
          case 72:
            parsedGenre = "Drones - Textures";
            break;
          case 73:
            parsedGenre = "Jazz Mixdowns";
            break;
          case 74:
            parsedGenre = "Musical FX";
            break;
          case 75:
            parsedGenre = "Bittersweet Mixdowns";
            break;
          case 120:
            parsedGenre = "Drums and Bass";
            break;
          case 70:
            parsedGenre = "Rock - Pop Mixdowns";
            break;
          case 76:
            parsedGenre = "Techno - Electronica Mixdowns";
            break;
          case 126:
            parsedGenre = "Urban Mixdowns";
            break;
           // DANCE  ***************************************************************
          case 16:
            parsedGenre = "Dance (Ambient - Down Tempo)";
            break;
          case 17:
            parsedGenre = "Dance (Breaks)";
            break;
          case 18:
            parsedGenre = "Dance (Dance Pop)";
            break;
          case 19:
            parsedGenre = "Dance (Disco)";
            break;
          case 20:
            parsedGenre = "Dance (Electronica)";
            break;
          case 21:
            parsedGenre = "Dance (House)";
            break;
          case 22:
            parsedGenre = "Dance (EDM)";
            break;
          case 23:
            parsedGenre = "Dance (Retro)";
            break;
           // HIP HOP - RBB ***************************************************************
          case 45:
            parsedGenre = "Hip Hop";
            break;
          case 46:
            parsedGenre = "Hip Hop";
            break;
          case 47:
            parsedGenre = "Hip Hop (Old School)";
            break;
          case 48:
            parsedGenre = "RnB";
            break;
          case 49:
            parsedGenre = "Trip-Hop";
            break;
          // HOLIDAY ***************************************************************
          case 50:
            parsedGenre = "Holiday (Contemporary)";
            break;
          case 146:
            parsedGenre = "Holiday (Traditional)";
            break;
          case 51:
            parsedGenre = "Holiday (Contemporary)";
            break;
          case 52:
            parsedGenre = "Holiday (Traditional)";
            break;
          case 53:
            parsedGenre = "Holiday (Traditional)";
            break;
          case 127:
            parsedGenre = "Holiday (World)";
            break;
          /// JAZZ ***************************************************************
          case 54:
            parsedGenre = "Jazz (Big Band)";
            break;
          case 55:
            parsedGenre = "Jazz (Rock)";
            break;
          case 56:
            parsedGenre = "Jazz (Small Ensemble)";
            break;
          case 57:
            parsedGenre = "Jazz (Smooth)";
            break;
          case 58:
            parsedGenre = "Jazz (Solo Instruments)";
            break;
          // RETRO TV ***************************************************************
          case 60:
            parsedGenre = "Retro TV (Stingers)";
            break;
          case 109:
            parsedGenre = "Retro TV (Dramatic)";
            break;
          case 116:
            parsedGenre = "Retro TV (Lighthearted)";
            break;
          case 119:
            parsedGenre = "Retro TV (Mystery - Suspense)";
            break;
          case 61:
            parsedGenre = "Retro TV (Rhythmic Beds)";
            break;
          case 124:
            parsedGenre = "Retro TV (Thematic)";
            break;
          // ROCK BLUES FUNK ***************************************************************
          case 62:
            parsedGenre = "Rock (50's and 60's)";
            break;
          case 63:
            parsedGenre = "Rock (70's)";
            break;
          case 64:
            parsedGenre = "Rock (80's)";
            break;
          case 65:
            parsedGenre = "Blues";
            break;
          case 66:
            parsedGenre = "Rock (Industrial)";
            break;
          case 67:
            parsedGenre = "Funk";
            break;
          case 68:
            parsedGenre = "Rock (Heavy Rock)";
            break;
          case 69:
            parsedGenre = "Rock (Pop Rock)";
            break;
          // VOCAL TRAX  ***************************************************************
          case 84:
            parsedGenre = "Vocal Tracks (Dance - Urban)";
            break;
          case 85:
            parsedGenre = "Vocal Tracks (Rock - Blues)";
            break;
          case 128:
            parsedGenre = "Vocal Tracks (World)";
            break;
          default:
            parsedGenre = selectedStyles.filter(styles =>
              styles.style_id === row.style_id).map(style =>
                style.style_name)[0]
        }
    }
      // --------------------------------------------------------------------------------------------------
      // creates composer/publisher/splits data
      // --------------------------------------------------------------------------------------------------
      let compString = '';
      let proString = '';
      let pubString = '';
      let splitString = '';
      let pubSplit = '';
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

      let releaseDateParse = row.cue_reldate_h.split('T')[0].split('-');
      releaseDateParse.push(releaseDateParse.shift())
      for(let c in composerArray){
        compString += `${composerArray[c].first}${composerArray[c].middle ? ' ' + composerArray[c].middle  : ''} ${composerArray[c].last}${composerArray[c].suffix ? ' ' + composerArray[c].suffix : ''}`;
        compString += c < composerArray.length - 1 ? ' / ' : '';

        pubString += (c > 0) && (pubString !== composerArray[c].name_only) ? ' / ' : '';
        pubString += (composerArray[c].pro_name ===  'ASCAP' || 'BMI' || 'SESAC') && (pubString.split('/')[0].trim() !== composerArray[c].name_only) ? `${composerArray[c].name_only}` : '';
      }
      // --------------------------------------------------------------------------------------------------
      let newRow = [
          // xx MAIN VERSION TITLE xx
          row.cue_title,
          // Sourceaudio Id
          '',
          // Catalog
          'DL Music',
          // Label
          'DL Music',
          // Title
          row.cue_title,
          // Filename
          `DLM - ${row.cue_title}.mp3`,
          // Master ID
          `=INDEX(b:b,MATCH(A${progressCount + 2},e:e,0))`,
          // Album
          `${selectedCategories.filter(category =>
             category.cat_id === row.cat_id).map(cat =>
               cat.cat_name)}, ${selectedStyles.filter(styles =>
                 styles.style_id === row.style_id).map(style =>
                   style.style_name)} Vol. ${releaseFilter.label}`,
          // Album Code
          `DLM-BI-${row.style_id.toString().padStart(3, 0)}-${releaseFilter.label}`,
          // Album Description
          parsedGenre,
          // Album Genre
          parsedGenre,
          // Track Number
          row.cue_id,
          // Artist
          compString,
          // Composer
          compString,
          // Publisher
          pubString,
          // Genres
          parsedGenre,
          // Tempos
          tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
          // Cue Types
          'Songs',
          // Bpm
          '',
          // Release Date
          releaseDateParse.join('/'),
          // Description
          descriptionString,
          // Mood
          '',
          // Style
          '',
          // Style Of
          '',
          // Lyrics
          '',
          // Has Vocal
          row.cat_id === 13 ? 'Yes' : 'No',
          // Explicit
          '',
          // Isrc
          `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
          // Iswc
          '',
          // Publisher 1 Company
          composerArray[0].name_only,
          // Publisher 1 Pro Affiliation
          composerArray[0].publisher_pro,
          // Publisher 1 CAE/IPI
          composerArray[0].ipi,
          // Publisher 1 Ownership Share
          composerArray[0].composer_split,
          // Publisher 1 Role
          'Original Publisher',
          // Publisher 1 Collection Share Percentage
          '',
          // Publisher 1 Collection Share Territory
          '',
          // Writer 1 First Name
          composerArray[0].first,
          // Writer 1 Last Name
          composerArray[0].last,
          // Writer 1 Company
          '',
          // Writer 1 Pro Affiliation
          composerArray[0].pro_name,
          // Writer 1 CAE/IPI
          composerArray[0].cae,
          // Writer 1 Ownership Share
          composerArray[0].composer_split,
          // Writer 1 Publisher
          '',
          // Writer 1 Role
          'Composer, Writer',
          // Publisher 2 Company
          composerArray[1] ? composerArray[1].name_only : '',
          // Publisher 2 Pro Affiliation
          composerArray[1] ? composerArray[1].publisher_pro : '',
          // Publisher 2 CAE/IPI
          composerArray[1] ? composerArray[1].ipi : '',
          // Publisher 2 Ownership Share
          composerArray[1] ? composerArray[1].composer_split : '',
          // Publisher 2 Role
          composerArray[1] ? 'Original Publisher' : '',
          // Publisher 2 Collection Share Percentage
          composerArray[1] ? '' : '',
          // Publisher 2 Collection Share Territory
          composerArray[1] ? '' : '',
          // Writer 2 First Name
          composerArray[1] ? composerArray[1].first : '',
          // Writer 2 Last Name
          composerArray[1] ? composerArray[1].last : '',
          // Writer 2 Company
          composerArray[1] ? '' : '',
          // Writer 2 Pro Affiliation
          composerArray[1] ? composerArray[1].pro_name : '',
          // Writer 2 CAE/IPI
          composerArray[1] ? composerArray[1].cae : '',
          // Writer 2 Ownership Share
          composerArray[1] ? composerArray[1].composer_split : '',
          // Writer 2 Publisher
          composerArray[1] ? '' : '',
          // Writer 2 Role
          composerArray[1] ? 'Composer, Writer' : '',
          // Publisher 3 Company
          composerArray[2] ? composerArray[2].name_only : '',
          // Publisher 3 Pro Affiliation
          composerArray[2] ? composerArray[2].publisher_pro : '',
          // Publisher 3 CAE/IPI
          composerArray[2] ? composerArray[2].ipi : '',
          // Publisher 3 Ownership Share
          composerArray[2] ? composerArray[2].composer_split : '',
          // Publisher 3 Role
          composerArray[2] ? 'Original Publisher' : '',
          // Publisher 3 Collection Share Percentage
          composerArray[2] ? '' : '',
          // Publisher 3 Collection Share Territory
          composerArray[2] ? '' : '',
          // Writer 3 First Name
          composerArray[2] ? composerArray[2].first : '',
          // Writer 3 Last Name
          composerArray[2] ? composerArray[2].last : '',
          // Writer 3 Company
          composerArray[2] ? '' : '',
          // Writer 3 Pro Affiliation
          composerArray[2] ? composerArray[2].pro_name : '',
          // Writer 3 CAE/IPI
          composerArray[2] ? composerArray[2].cae : '',
          // Writer 3 Ownership Share
          composerArray[2] ? composerArray[2].composer_split : '',
          // Writer 3 Publisher
          composerArray[2] ? '' : '',
          // Writer 3 Role
          composerArray[2] ? 'Composer, Writer' : '',
          // Publisher 4 Company
          composerArray[3] ? composerArray[3].name_only : '',
          // Publisher 4 Pro Affiliation
          composerArray[3] ? composerArray[3].publisher_pro : '',
          // Publisher 4 CAE/IPI
          composerArray[3] ? composerArray[3].ipi : '',
          // Publisher 4 Ownership Share
          composerArray[3] ? composerArray[3].composer_split : '',
          // Publisher 4 Role
          composerArray[3] ? 'Original Publisher' : '',
          // Publisher 4 Collection Share Percentage
          composerArray[3] ? '' : '',
          // Publisher 4 Collection Share Territory
          composerArray[3] ? '' : '',
          // Writer 4 First Name
          composerArray[3] ? composerArray[3].first : '',
          // Writer 4 Last Name
          composerArray[3] ? composerArray[3].last : '',
          // Writer 4 Company
          composerArray[3] ? '' : '',
          // Writer 4 Pro Affiliation
          composerArray[3] ? composerArray[3].pro_name : '',
          // Writer 4 CAE/IPI
          composerArray[3] ? composerArray[3].cae : '',
          // Writer 4 Ownership Share
          composerArray[3] ? composerArray[3].composer_split : '',
          // Writer 4 Publisher
          composerArray[3] ? '' : '',
          // Writer 4 Role
          composerArray[3] ? 'Composer, Writer' : '',
          // Publisher 5 Company
          composerArray[4] ? composerArray[4].name_only : '',
          // Publisher 5 Pro Affiliation
          composerArray[4] ? composerArray[4].publisher_pro : '',
          // Publisher 5 CAE/IPI
          composerArray[4] ? composerArray[4].ipi : '',
          // Publisher 5 Ownership Share
          composerArray[4] ? composerArray[4].composer_split : '',
          // Publisher 5 Role
          composerArray[4] ? 'Original Publisher' : '',
          // Publisher 5 Collection Share Percentage
          composerArray[4] ? '' : '',
          // Publisher 5 Collection Share Territory
          composerArray[4] ? '' : '',
          // Writer 5 First Name
          composerArray[4] ? composerArray[4].first : '',
          // Writer 5 Last Name
          composerArray[4] ? composerArray[4].last : '',
          // Writer 5 Company
          composerArray[4] ? '' : '',
          // Writer 5 Pro Affiliation
          composerArray[4] ? composerArray[4].pro_name : '',
          // Writer 5 CAE/IPI
          composerArray[4] ? composerArray[4].cae : '',
          // Writer 5 Ownership Share
          composerArray[4] ? composerArray[4].composer_split : '',
          // Writer 5 Publisher
          composerArray[4] ? '' : '',
          // Writer 5 Role
          composerArray[4] ? 'Composer, Writer' : '',
          // Instrumentation
          instrumentsString || '',
          // Pro
          '',
          // Release
          releaseFilter.label
     ];
       progressCount ++;
       let progress = (progressCount/filteredLibrary.length)
       setRowData(newRow);
       setProgress(progress);
     }, () => { // inProgress()
       // updateDownload(progress)
     }, () => { // done()
       updateDownload(1)
       downloadCompletedChecker();
     })
  }
  return (
    <a onClick={(() =>
        releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : sourceAudioExport())
    } className={
      releaseFilter === 147 || cuesLoading
        ? 'strikethrough'
        : 'download-links'
      }>
      {`SourceAudio ${
        releaseFilter === 147
        ? ''
        : (releaseFilter.value && typeof releaseFilter.value === 'string')
        ? 'Release '
        : 'Batch '
      }Export ${
         releaseFilter === 147
        ? ''
        : releaseFilter.label
      }
      ${inclusive
        ? 'INC'
        : ''
      }`
      }
    </a>
  );
}

const mapStateToProps = (state) => ({
  batchesBI: state.batchesBI,
  downloadProgress: state.downloadProgress,
  selectedCategories: state.selectedCategories,
  selectedComposers: state.selectedComposers,
  selectedLibrary: state.selectedLibrary,
  selectedStyles: state.selectedStyles,
  tempos: state.tempos
})

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SourceAudioExport));
