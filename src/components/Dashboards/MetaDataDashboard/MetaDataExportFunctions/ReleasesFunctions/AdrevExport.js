import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

// ******************************************************************************************
//  ADREV EXPORT FUNCTION
// ******************************************************************************************

// working needs to be diff checked

const AdRevExport = (props) => {
  const { batchesBI, cuesLoading, downloadCompletedChecker, downloadProgress, inclusive, releaseFilter, resetDownload,
          selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
        } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}ADREV_BI_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`;
    updateDownload(progress)
    progress === 1 && exportTools.generateDownload(xlsData.join('\n'), downloadLink);
  }, [progress])

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join('\t')) === -1) && setXlsData([...xlsData, newRowData.join('\t')])
  }, [newRowData, progress])

  const adRevExport = () => {
    resetDownload()
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
       'Category', 'CD #', 'Composer', 'CAE', 'PRO', 'Description', 'Duration', 'Instrumentation',
       'Publisher', 'Release', 'Composer Split', 'Publisher Split', 'Style', 'Tempo',
       'Song Title', 'Track #', 'Track ID', 'Cue Rating', 'ISRC', 'Sounds Like Band',
       'Sounds Like Film'
     ];

    setXlsData([headersRow.join('\t')]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes('-') ? releaseFilter.value.split('-') : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
        inclusive
          ? cue.rel_id <= releaseFilter.value
          : releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
          : inclusive && releasesArray.length !== 0
          ? cue.rel_id <= releasesArray[releasesArray.length - 1]
          : cue.rel_id === releaseFilter.value)
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
        let descriptionString = exportTools.parseData(row.cue_desc).join(', ');
        let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      // --------------------------------------------------------------------------------------------------
        let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

        let compString = '';
        let splitString = '';
        let pubString = '';
        let caeString = '';
        let proString = '';
        for(let c in composerArray){
          pubString += composerArray[c].name_only;
          pubString += c < composerArray.length - 1 ? ' / ' : '';
          compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + ' ' : ''}${composerArray[c].last}`;
          compString += c < composerArray.length - 1 ? ' / ' : '';
          splitString += composerArray[c].composer_split
          splitString += c < composerArray.length - 1 ? ' / ' : '';
          caeString += composerArray[c].cae;
          caeString += c < composerArray.length - 1 ? ' / ' : '';
          proString += composerArray[c].pro_name;
          proString += c < composerArray.length - 1 ? ' / ' : '';
        }
      let newRow = [
        // 1 Category
        `${selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
        // 2 CD #
        `DLM${row.style_id.toString().padStart(3, 0)}`,
        // 3 Composer
        compString,
        // 4 CAE
        caeString,
        // 5 PRO
        proString,
        // 6 Description
        descriptionString,
        // 7 Duration
        row.cue_duration,
        // 8 Instrumentation
        instrumentsString,
        // 9 Publisher
        pubString,
        // 10 Release
        batchesBI.filter(release => release.rel_id === row.rel_id).map(rel => rel.rel_num)[0],
        // 11 Composer Split
        splitString,
        // 12 Publisher Split
        splitString,
        // 13 Style
        selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)[0],
        // 14 Tempo
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // 15 Song Title
        row.cue_title,
        // 16 Track #
        row.cue_id,
        // 17 Track ID
        row.cue_id,
        // 18 Cue Rating
        row.cue_rating,
        // 19 ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // 20 Sounds Like Band
        row.sounds_like_band_edit || 'N/A',
        // 21 Sounds Like Film
        row.sounds_like_film_edit || 'N/A'
      ]
      let progress = (progressCount/filteredLibrary.length)
      setRowData(newRow);
      setProgress(progress);
   }, () => { // inProgress()
   },
   () => { // done()
     updateDownload(1)
     downloadCompletedChecker();
   })
  }
  return (
    <a onClick={(() =>
      releaseFilter === 147 || selectedLibrary.libraryName === 'independent-artists' || cuesLoading
        ? exportTools.exportError()
        : inclusive || releaseFilter.label === 'All'
          ? exportTools.exportError('We Typically Only Send AdRev One Release At A Time. Please Unselect Inclusive.')
          : adRevExport())
    } className={
      cuesLoading || inclusive || releaseFilter === 147 || selectedLibrary.libraryName === 'independent-artists' ||
      (releaseFilter.label && (releaseFilter.label === 'All' || releaseFilter.label.includes('_')))
        ? 'strikethrough'
        : 'download-links'
      }>
      {`AdRev BI Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AdRevExport));
