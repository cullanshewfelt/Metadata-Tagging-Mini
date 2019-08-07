import React, {useState} from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');


const BmatExport = (props) => {
   const [progress, setProgress] = useState(0.00);
   const [csvData, setData] = useState([])

  // ******************************************************************************************
  // BMAT EXPORT FUNCTION
  // ------------------------------------------------------------------------------------------
  // ******************************************************************************************
  const bmatExport = () => {
    props.resetDownload();
    props.downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = ['TrackFilepath',
      'TrackDisplayTitle', 'Library', 'SubLibrary', 'InternalID', 'CatNo', 'CDTitle', 'TrackNo', 'TrackSubNo', 'TrackTitle',
      'TrackAlternateTitle', 'Mixout', 'Version', 'Length', 'GEN:1:Genre', 'GEN:1:SubGenre', 'GEN:2:Genre', 'GEN:2:SubGenre',
      'GEN:3:Genre', 'GEN:3:SubGenre', 'BPM', 'Tempo', 'Mood', 'Keywords', 'Instrumentation', 'TrackDescription',
      'CDDescription', 'ReleaseDate', 'Lyrics',
      'COM:1:NamesBeforeKeyName', 'COM:1:KeyName', 'COM:1:Society', 'COM:1:IPI', 'COM:1:PerformanceShare',
      'COM:2:NamesBeforeKeyName', 'COM:2:KeyName', 'COM:2:Society', 'COM:2:IPI', 'COM:2:PerformanceShare',
      'COM:3:NamesBeforeKeyName', 'COM:3:KeyName', 'COM:3:Society', 'COM:3:IPI', 'COM:3:PerformanceShare',
      'COM:4:NamesBeforeKeyName', 'COM:4:KeyName', 'COM:4:Society', 'COM:4:IPI', 'COM:4:PerformanceShare',
      'COM:5:NamesBeforeKeyName', 'COM:5:KeyName', 'COM:5:Society', 'COM:5:IPI', 'COM:5:PerformanceShare',
      'ARR:1:NamesBeforeKeyName', 'ARR:1:KeyName', 'ARR:1:Society', 'ARR:1:IPI', 'ARR:1:PerformanceShare',
      'ARR:2:NamesBeforeKeyName', 'ARR:2:KeyName', 'ARR:2:Society', 'ARR:2:IPI', 'ARR:2:PerformanceShare',
      'PUB:1:KeyName', 'PUB:1:Society', 'PUB:1:IPI', 'PUB:1:PerformanceShare',
      'PUB:2:KeyName', 'PUB:2:Society', 'PUB:2:IPI', 'PUB:2:PerformanceShare',
      'PUB:3:KeyName', 'PUB:3:Society', 'PUB:3:IPI', 'PUB:3:PerformanceShare',
      'SUB:1:KeyName', 'SUB:1:Society', 'SUB:1:IPI', 'SUB:1:PerformanceShare',
      'CODE:ISRC', 'CODE:ISWC', 'CODE:PRSTuneCode', 'CODE:GEMA', 'CODE:SACEM', 'CODE:SUISA', 'CODE:UPC',
      'CODE:BUMASTEMRA', 'CODE:SABAM', 'CODE:APRA', 'CODE:SGAE', 'CODE:EAN', 'CODE:ASCAP', 'CODE:BMI',
      'CODE:IMRO', 'CODE:JASRAC', 'CODE:KODA', 'CODE:KOMCA', 'CODE:NORM', 'CODE:SAMRO', 'CODE:SESAC',
      'CODE:SIAE',	'CODE:SOCAN',	'CODE:STIM',	'CODE:TONO',	'CODE:TEOSTO',
      'ATT:Artistname',	'ATT:AlbumArtistname',	'ATT:AlbumDiscs',	'ATT:AlbumDiscNumber'
     ];
     setData([headersRow.join('\t')])
    let filteredLibrary = props.selectedLibrary.library.filter(cue =>
      cue.rel_id === props.releaseFilter.value && cue.cue_status !== 'Pulled'
    )
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      let composerArray = props.selectedComposers.filter(composer => composer.cue_id === row.cue_id);
      // --------------------------------------------------------------------------------------------------
      let newRow = [
          // TrackFilepath
          `${props.categories.filter(categories =>
             categories.cat_id === row.cat_id).map(cat =>
               cat.cat_name)}/${props.styles.filter(styles =>
                 styles.style_id === row.style_id).map(style =>
                   style.style_name)}/DLM - ${row.cue_title}.mp3`,
          // TrackDisplayTitle
          row.cue_title,
          // Library
          'DL Music',
          // SubLibrary
          'Background Instrumentals',
          // InternalID
          row.cue_id,
          // CatNo
          `DLMBI${row.style_id.toString().padStart(3, 0)}${props.batchesBI.filter(batch => batch.rel_id === row.rel_id).map(rel => rel.rel_num)[0].split('_')[0]}`,
          // CDTitle
          `${props.categories.filter(categories =>
             categories.cat_id === row.cat_id).map(cat =>
               cat.cat_name)}, ${props.styles.filter(styles =>
                 styles.style_id === row.style_id).map(style =>
                   style.style_name)} Vol. ${props.batchesBI.filter(batch => batch.rel_id === row.rel_id).map(rel => rel.rel_num)[0].split('_')[0].substring(1)}`,
          // TrackNo
          '',
          // TrackSubNo
          '',
          // TrackTitle
          row.cue_title,
          // TrackAlternateTitle
          '',
          // thisOneIsGonnaBeHard
          '',
          // Mixout
          '',
          // Version
          /\(([^)]+)\)/g.test(row.cue_title) ? /\(([^)]+)\)/g.exec(row.cue_title)[1] : '',
          // Length
          row.cue_duration_sec,
          // GEN:1:Genre
          `${props.categories.filter(categories =>
             categories.cat_id === row.cat_id).map(cat =>
               cat.cat_name)}`,
          // GEN:1:SubGenre
          `${props.styles.filter(styles =>
            styles.style_id === row.style_id).map(style =>
              style.style_name)}`,
          // GEN:2:Genre
          '',
          // GEN:2:SubGenre
          '',
          // GEN:3:Genre
          '',
          // GEN:3:SubGenre
          '',
          // BPM
          '',
          // Tempo
          props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
          // Mood
          '',
          // Keywords
          row.cue_desc.split(',').map(keyword =>
            keyword.trim().split(' ').length > 1
            ? keyword.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : keyword.trim().charAt(0).toUpperCase() + keyword.trim().slice(1)
          ).join(';'),
          // Instrumentation
          row.cue_instrus_edit
          ? row.cue_instrus_edit.split(',').map(inst =>
            inst.trim().split(' ').length > 1
            ? inst.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')
            : inst.trim().charAt(0).toUpperCase() + inst.trim().slice(1).toLowerCase()
          ).join(';')
          : '',
          // TrackDescription
          row.cue_desc.split(',').map(keyword =>
            keyword.trim().split(' ').length > 1
            ? keyword.trim().split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
            : keyword.trim().charAt(0).toUpperCase() + keyword.trim().slice(1)
          ).join(', '),
          // CDDescription
          `${props.categories.filter(categories =>
             categories.cat_id === row.cat_id).map(cat =>
               cat.cat_name)}, ${props.styles.filter(styles =>
                 styles.style_id === row.style_id).map(style =>
                   style.style_name)} Vol. ${props.batchesBI.filter(batch => batch.rel_id === row.rel_id).map(rel => rel.rel_num)[0].split('_')[0]}`,
          // ReleaseDate
          row.cue_reldate_h.split('T')[0],
          // Lyrics
          '',
          // COM:1:NamesBeforeKeyName
          composerArray[0] ? `${composerArray[0].first} ${composerArray[0].middle || ''}` : '',
          // COM:1:KeyName
          composerArray[0] ? composerArray[0].last : '',
          // COM:1:Society
          composerArray[0] ? composerArray[0].pro_name : '',
          // COM:1:IPI
          composerArray[0] ? composerArray[0].cae : '',
          // COM:1:PerformanceShare
          composerArray[0] ? composerArray[0].composer_split : '',
          // COM:2:NamesBeforeKeyName,
          composerArray[1] ? `${composerArray[1].first} ${composerArray[1].middle || ''}` : '',
          // COM:2:KeyName,
          composerArray[1] ? composerArray[1].last : '',
          // COM:2:Society,
          composerArray[1] ? composerArray[1].pro_name : '',
          // COM:2:IPI,
          composerArray[1] ? composerArray[1].cae : '',
          // COM:2:PerformanceShare,
          composerArray[1] ? composerArray[1].composer_split : '',
          // COM:3:NamesBeforeKeyName,
          composerArray[2] ? `${composerArray[2].first} ${composerArray[2].middle || ''}` : '',
          // COM:3:KeyName,
          composerArray[2] ? composerArray[2].last : '',
          // COM:3:Society,
          composerArray[2] ? composerArray[2].pro_name : '',
          // COM:3:IPI,
          composerArray[2] ? composerArray[2].cae : '',
          // COM:3:PerformanceShare,
          composerArray[2] ? composerArray[2].composer_split : '',
          // COM:4:NamesBeforeKeyName,
          composerArray[3] ? `${composerArray[3].first} ${composerArray[3].middle || ''}` : '',
          // COM:4:KeyName,
          composerArray[3] ? composerArray[3].last : '',
          // COM:4:Society,
          composerArray[3] ? composerArray[3].pro_name : '',
          // COM:4:IPI,
          composerArray[3] ? composerArray[3].cae : '',
          // COM:4:PerformanceShare,
          composerArray[3] ? composerArray[3].composer_split : '',
          // COM:5:NamesBeforeKeyName,
          composerArray[4] ? `${composerArray[4].first} ${composerArray[4].middle || ''}` : '',
          // COM:5:KeyName,
          composerArray[4] ? composerArray[4].last : '',
          // COM:5:Society,
          composerArray[4] ? composerArray[4].pro_name : '',
          // COM:5:IPI,
          composerArray[4] ? composerArray[4].cae : '',
          // COM:5:PerformanceShare,
          composerArray[4] ? composerArray[4].composer_split : '',
          // ARR:1:NamesBeforeKeyName
          '',
          // ARR:1:KeyName
          '',
          // ARR:1:Society
          '',
          // ARR:1:IPI
          '',
          // ARR:1:PerformanceShare
          '',
          // ARR:2:NamesBeforeKeyName,
          '',
          // ARR:2:KeyName,
          '',
          // ARR:2:Society,
          '',
          // ARR:2:IPI,
          '',
          // ARR:2:PerformanceShare,
          '',
          // PUB:1:KeyName,
          composerArray[0] ? composerArray[0].name_only : '',
          // PUB:1:Society,
          composerArray[0] ? composerArray[0].composer_split : '',
          // PUB:1:IPI,
          composerArray[0] ? composerArray[0].cae : '',
          // PUB:1:PerformanceShare,
          composerArray[0] ? composerArray[0].publisher_pro : '',
          // PUB:2:KeyName,
          composerArray[1] ? composerArray[1].name_only : '',
          // PUB:2:Society,
          composerArray[1] ? composerArray[1].composer_split : '',
          // PUB:2:IPI,
          composerArray[1] ? composerArray[1].cae : '',
          // PUB:2:PerformanceShare,
          composerArray[1] ? composerArray[1].publisher_pro : '',
          // PUB:3:KeyName,
          composerArray[2] ? composerArray[2].name_only : '',
          // PUB:3:Society,
          composerArray[2] ? composerArray[2].composer_split : '',
          // PUB:3:IPI,
          composerArray[2] ? composerArray[2].cae : '',
          // PUB:3:PerformanceShare,
          composerArray[2] ? composerArray[2].publisher_pro : '',
          // SUB:1:KeyName,
          '',
          // SUB:1:Society,
          '',
          // SUB:1:IPI,
          '',
          // SUB:1:PerformanceShare,
          '',
          // 'CODE:ISRC',
          `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
          // 'CODE:ISWC',
          '',
          // 'CODE:PRSTuneCode',
          '',
          // 'CODE:GEMA',
          '',
          // 'CODE:SACEM',
          '',
          // 'CODE:SUISA',
          '',
          // 'CODE:UPC',
          '',
          // 'CODE:BUMASTEMRA',
          '',
          // 'CODE:SABAM',
          '',
          // 'CODE:APRA',
          '',
          // 'CODE:SGAE',
          '',
          // 'CODE:EAN',
          '',
          // 'CODE:ASCAP',
          '',
          // 'CODE:BMI',
          '',
          // 'CODE:IMRO',
          '',
          // 'CODE:JASRAC',
          '',
          // 'CODE:KODA',
          '',
          // 'CODE:KOMCA',
          '',
          // 'CODE:NORM',
          '',
          // 'CODE:SAMRO',
          '',
          // 'CODE:SESAC',
          '',
          // 'CODE:SIAE',
          '',
          // 'CODE:SOCAN',
          '',
          // 'CODE:STIM',
          '',
          // 'CODE:TONO',
          '',
          // 'CODE:TEOSTO',
          '',
          // 'ATT:Artistname',
          '',
          // 'ATT:AlbumArtistname',
          '',
          // 'ATT:AlbumDiscs',
          '',
          // 'ATT:AlbumDiscNumber',
          ''
      ];
      let percentage = (progressCount/filteredLibrary.length)
      console.log(percentage)
      setData([headersRow.join('\t')])
      setProgress(percentage)
    }, () => { // inProgress()
      console.log(progress)
      props.updateDownload(progress)
    },
    () => { // done()
      props.updateDownload(1)
      props.downloadCompletedChecker();
      exportTools.generateDownload(csvData.join('\n'), `DLM_${props.releaseFilter.label + "_"}BMAT_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
    })
  }
  return (
    <a onClick={(() =>
      exportTools.batchChecker(props.releaseFilter)
        ? bmatExport()
        : exportTools.exportError())
    } className='download-links'>
      {`BMAT Batch Export ${props.releaseFilter && props.releaseFilter.label
      ? props.releaseFilter.label
      : ''}
      ${props.inclusive
        ? 'INC'
        : ''
      }`
      }
    </a>
  )
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BmatExport));
