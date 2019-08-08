import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  GENERIC IA EXPORT FUNCTION
// ******************************************************************************************

//  seems finished, need to diffCheck

const GenericIAExport = (props) => {
  const { cuesLoading, inclusive, downloadCompletedChecker, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}GENERIC_IA_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const genericIAExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "Category", "Composer", "Description", "Duration", "PRO",
      "Publisher", "Composer Split", "Publisher Split", "Style", "Tempo", "DL Title",
      "Original Title", "Cue ID", "Artist", "Instru Avail", "Rating", "Instruments",
      "Release"
    ];
    setXlsData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      inclusive
        ? cue.rel_id <= releaseFilter.value
        : releasesArray.length !== 0
          ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
          : inclusive && releasesArray.length !== 0
            ? cue.rel_id <= releasesArray[releasesArray.length - 1]
            : cue.rel_id === releaseFilter.value);
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // console.log(row)
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(", ");
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(", ");
      // --------------------------------------------------------------------------------------------------
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);
      let compString = "";
      let splitString = "";
      let pubString = "";
      let proString = "";
      for(let c in composerArray){
        pubString += composerArray[c].publisher_name;
        pubString += c < composerArray.length - 1 ? " / " : "";
        compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + " " : ""}${composerArray[c].last}`;
        compString += c < composerArray.length - 1 ? " / " : "";
        splitString += composerArray[c].composer_split.toFixed(2);
        splitString += c < composerArray.length - 1 ? " / " : "";
        proString += composerArray[c].pro_name;
        proString += c < composerArray.length - 1 ? " / " : "";
      }
      let newRow = [
        // 1 Category
        `${selectedCategories.filter(cat =>
          cat.cat_id === row.cat_id).map(cat =>
          cat.cat_name)}`,
        // 2 Composer
        compString,
        // 3 Description
        descriptionString,
        // 4 Duration
        row.cue_duration,
        // 5 PRO
        proString,
        // 6 Publisher
        pubString,
        // 7 Composer Split
        splitString,
        // 8 Publisher Split
        splitString,
        // 9 Style
        selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)[0],
        // 10 Tempo
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // 11 DL Title
        row.cue_title,
        // 12 Original Title
        row.cue_title,
        // 13 Cue ID
        row.cue_id,
        // 14 Artist
        row.artist_name ? row.artist_name : "",
        // 15 Instru Avail
        row.instru_avail ? row.instru_avail : "",
        // 16 Rating
        row.cue_rating,
        // 17 Instruments
        instrumentsString,
        // 18 Release
        ""
        // batchesDropDown.filter(release => release.value === row.rel_id).map(rel => rel.label)[0]
      ];
      let progress = (progressCount/filteredLibrary.length);
      setRowData(newRow);
      setProgress(progress);
    }, () => { // inProgress()
      // updateDownload(progress)
    },
    () => { // done()
      updateDownload(1);
      downloadCompletedChecker();
    });
  };
  return (
    <a onClick={(() =>
      releaseFilter === 147 || selectedLibrary.libraryName !== "independent-artists"
        ? exportTools.exportError("Please Select An Independent Artist Release")
        : inclusive || releaseFilter.label === "All"
          ? exportTools.exportError("Please Unselect All/Inclusive.")
          : releaseFilter.label.includes("_")
            ? exportTools.exportError("Please Select A Release.")
            : genericIAExport())
    } className={
      cuesLoading || inclusive || releaseFilter === 147 || selectedLibrary.libraryName !== "independent-artists" ||
      (releaseFilter.label && (releaseFilter.label === "All" || releaseFilter.label.includes("_")))
        ? "strikethrough"
        : "download-links"
    }>
      {`Generic IA Release Export ${
        inclusive || releaseFilter === 147 || selectedLibrary.libraryName !== "independent-artists" ||
        (releaseFilter.label && (releaseFilter.label === "All" || releaseFilter.label.includes("_")))
          ? ""
          : releaseFilter.label
      }`
      }
    </a>
  );
};


const mapStateToProps = (state) => ({
  batchesBI: state.batchesBI,
  downloadProgress: state.downloadProgress,
  selectedCategories: state.selectedCategories,
  selectedComposers: state.selectedComposers,
  selectedLibrary: state.selectedLibrary,
  selectedStyles: state.selectedStyles,
  tempos: state.tempos
});

const mapDispatchToProps = {
  resetDownload,
  updateDownload
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GenericIAExport));
