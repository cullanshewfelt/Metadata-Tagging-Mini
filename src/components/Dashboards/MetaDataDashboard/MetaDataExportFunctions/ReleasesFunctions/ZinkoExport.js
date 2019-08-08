import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  ZINKO METADATA RELEASE EXPORT FUNCTION
// ******************************************************************************************
// seems complete, needs to be diffChecked
// ******************************************************************************************

const ZinkoExport = (props) => {
  const { batchesBI, cuesLoading, inclusive, downloadCompletedChecker, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [csvData, setCsvData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}ZINKO_METADATA_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(csvData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && csvData.indexOf(newRowData.join("\t")) === -1) && setCsvData([...csvData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const zinkoExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "Category", "CD #",	"Composer",	"Description", "Duration", "Instrumentation", "PRO",
      "Publisher",	"Release",	"Composer Split",	"Publisher Split",	"Style",	"Tempo",
      "Song Title",	"Track #",	"Track ID",	"Cue Rating",	"ISRC",	"Sounds Like Band",
      "Sounds Like Film"
    ];
    setCsvData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      releasesArray.length !== 0
        ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status === "Active")
        : null
    );
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(", ");
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(", ");
      let genre = selectedCategories.filter(categories =>
        categories.cat_id === row.cat_id).map(cat =>
        cat.cat_name)[0];
      let subGenre = selectedStyles.filter(styles =>
        styles.style_id === row.style_id).map(style =>
        style.style_name)[0];
      // --------------------------------------------------------------------------------------------------
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);
      let compSplit = "";
      let pubSplit = "";
      let combinedPubSplit = 0;
      let compString = "";
      let pubString = "";
      let proString = "";
      let temp = [];
      for(let c in composerArray){
        let pubDoesntExist = temp.indexOf(composerArray[c].publisher_name) === -1;
        let currentSplit = composerArray[c].composer_split.toFixed(2);
        combinedPubSplit = pubDoesntExist
          ? currentSplit
          : parseFloat(combinedPubSplit) + parseFloat(currentSplit);
        pubString += (c > 0) &&  (pubDoesntExist)
          ? " / "
          : "";
        pubString += pubDoesntExist
          ? `${composerArray[c].publisher_name}`
          : "";
        pubSplit += (c > 0) &&  (pubDoesntExist)
          ? " / "
          : "";
        pubSplit = pubDoesntExist
          ? pubSplit + currentSplit
          : combinedPubSplit.toFixed(2);
        pubDoesntExist
          ? temp.push(composerArray[c].publisher_name)
          : null;
        compString += `${composerArray[c].first} ${composerArray[c].middle ? composerArray[c].middle + " " : ""}${composerArray[c].last}${composerArray[c].suffix ?  " " + composerArray[c].suffix  : ""}`;
        compString += c < composerArray.length - 1 ? " / " : " ";
        proString +=  `${composerArray[c].pro_name}`;
        proString += c < composerArray.length - 1 ? " / " : "";
        compSplit += currentSplit;
        compSplit += c < composerArray.length - 1 ? " / " : "";
      }

      // --------------------------------------------------------------------------------------------------
      let newRow = [
        // Category
        genre,
        // CD #
        `DLM${row.style_id.toString().padStart(3, 0)}`,
        // Composer
        compString.trim(),
        // Description
        descriptionString.toLowerCase(),
        // Duration
        row.cue_duration,
        // Instrumentation
        instrumentsString.toUpperCase(),
        // PRO
        proString,
        // Publisher
        pubString,
        // Release
        batchesBI.filter(rel => rel.rel_id === row.rel_id)[0].rel_num,
        // Composer Split
        compSplit,
        // Publisher Split
        pubSplit,
        // Style
        subGenre,
        // Tempo
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // Song Title
        row.cue_title,
        // Track #
        row.cue_id,
        // Track ID
        row.cue_id,
        // Cue Rating
        row.cue_rating,
        // ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // Sounds Like Band
        row.sounds_like_band_edit || "N/A",
        // Sounds Like Film
        row.sounds_like_film_edit || "N/A"
      ];
      progressCount ++;
      let progress = (progressCount/filteredLibrary.length);
      setRowData(newRow);
      setProgress(progress);
    }, () => { // inProgress()
    },
    () => { // done()
      updateDownload(1);
      downloadCompletedChecker();
    });
  };

  return (
    <a onClick={(() =>
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : !releaseFilter.value.toString().includes("-")
          ? exportTools.exportError("We Typically Only Send Zinko Releases. Please Select A Release.")
          :  selectedLibrary.libraryName === "independent-artists"
            ? exportTools.exportError("We Don't Send Our Independent Artists Catalog To Zinko")
            : inclusive || releaseFilter.label === "All"
              ? exportTools.exportError("We Typically Only Send Zinko One Release At A Time. Please Unselect Inclusive.")
              : zinkoExport())
    } className={
      inclusive || cuesLoading
        ? "strikethrough"
        : (releaseFilter.value
        && typeof releaseFilter.value === "string")
        && releaseFilter.label !== "All"
          ? "download-links"
          : "strikethrough"
    }>
      {`Zinko Release Export ${
        (releaseFilter.value
        && typeof releaseFilter.value === "string")
        && releaseFilter.label !== "All"
          ? releaseFilter.label
          : ""
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ZinkoExport));
