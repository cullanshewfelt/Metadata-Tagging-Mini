import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  NBCU SOUNDMINER RELEASE EXPORT FUNCTION
// ******************************************************************************************

const NBCSoundMinerExport = (props) => {
  const { cuesLoading, inclusive, downloadCompletedChecker, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}NBC_SOUNDMINER_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.txt`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const nbcSoundMinerExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "Filename", "Manufacturer", "Library", "CDTitle", "TrackTitle", "Version", "Description", "Category", "SubCategory",
      "FeaturedInstrument", "Keywords", "Composer", "Publisher", "Designer", "BWDescription", "BWOriginator",
      "BWOriginatorRef", "BWTime", "BWDate", "Tempo", "ReleaseDate", "TrackYear", "ISRC"
    ];
    setXlsData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      releaseFilter.value !== 9999
        ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
        : null
    );
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
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
      for(let c in composerArray){
        pubString += `${composerArray[c].publisher_name}`;
        pubString += c < composerArray.length - 1 ? " / " : " ";
        compString += `${composerArray[c].last}${composerArray[c].suffix || ""}, ${composerArray[c].first} ${composerArray[c].middle || ""} (${composerArray[c].pro_name})`;
        compString += c < composerArray.length - 1 ? " / " : " ";
        splitString += `${composerArray[c].composer_split}`;
        splitString += c < composerArray.length - 1 ? "/" : "%";
      }

      let newRow = [
        // Filename
        `DLM - ${row.cue_title}.wav`,
        // Manufacturer
        "DL Music",
        // Library
        `${compString}${splitString}`,
        // CDTitle
        row.cat_id !==19 && row.style_id !== 147 ? `${selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}, ${selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)}` : "",
        // TrackTitle
        row.cue_title,
        // Version
        (/\sv[0-9]{1,2}/).test(row.cue_title)
          ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, "")
          : "",
        // Description
        pubString,
        // Category
        `${selectedCategories.filter(cat => cat.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
        // SubCategory
        `${selectedStyles.filter(style => style.style_id === row.style_id).map(style => style.style_name)}`,
        // FeaturedInstrument
        instrumentsString || "",
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
        "DL-Music.com",
        // BWOriginator Reference
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // BWTime
        row.cue_reldate_h.includes("T") ? row.cue_reldate_h.split("T")[1].split(".")[0] : row.cue_reldate_h.split(" ")[1].split(".")[0],
        // BWDate
        row.cue_reldate_h.split("T")[0],
        // Tempo
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // ReleaseDate
        row.cue_reldate_h.split("T")[0],
        // TrackYear
        row.cue_reldate_h.substring(0, 4),
        // ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`
      ];
      progressCount ++;

      let progress = (progressCount/filteredLibrary.length);

      setRowData(newRow);
      setProgress(progress);

      let mp3 = selectedLibrary.libraryName === "background-instrumentals"
        ? `DLM - ${newRow[4]}.mp3`
        : selectedLibrary.libraryName === "independent-artists"
          ? `IA - ${newRow[4]}.mp3`
          : "";

      let wav = selectedLibrary.libraryName === "background-instrumentals"
        ? `DLM - ${newRow[4]}.wav`
        : selectedLibrary.libraryName === "independent-artists"
          ? `IA - ${newRow[4]}.wav`
          : "";

      let copiedRow = [ ...newRow ];

      let copy = copiedRow;
      setRowData([ mp3, ...copy ]);
      setRowData([ wav, ...copy ]);

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
          ? exportTools.exportError("We Typically Only Send NBC Releases. Please Select A Release.")
          :  selectedLibrary.libraryName === "independent-artists"
            ? exportTools.exportError("We Don't Send Our Independent Artists Catalog To NBC")
            : inclusive || releaseFilter.label === "All"
              ? exportTools.exportError("We Typically Only Send NBC One Release At A Time. Please Unselect Inclusive.")
              : nbcSoundMinerExport())
    } className={
      inclusive || cuesLoading
        ? "strikethrough"
        : (releaseFilter.value
        && typeof releaseFilter.value === "string")
        && releaseFilter.label !== "All"
          ? "download-links"
          : "strikethrough"
    }>
      {`NBC SoundMiner Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NBCSoundMinerExport));
