import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
// BARAKA IA EXPORT
// ******************************************************************************************

const BarakaIAExport = (props) => {
  const { cuesLoading, inclusive, downloadCompletedChecker, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}BARAKA_IA_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  // ------------------------------------------------------------------------------------------

  const barakaIAExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "Library",	"Cat No",	"CD Title",	"Track Title",	"Track Display Title",	"Track No",
      "Mixout",	"Version",	"Length",	"Bitrate",	"Frequency", "Genre/Category",	"BPM",
      "Tempo",	"Keywords",	"Instrumentation",	"Track Description",	"Composer(s)",
      "CD Description",	"Publisher(s)",	"Release Date",	"Filename",	"COM:1:F First Name",
      "COM:1:L Last Name",	"COM:1:S Society",	"COM:1:C IPI",	"COM:1:P % Share",
      "COM:2:F First Name",	"COM:2:L Last Name",	"COM:2:S Society",	"COM:2:C IPI",
      "COM:2:P % Share",	"COM:3:F First Name",	"COM:3:L Last Name",	"COM:3:S Society",
      "COM:3:C IPI",	"COM:3:P % Share",	"COM:4:F First Name",	"COM:4:L Last Name",
      "COM:4:S Society",	"COM:4:C IPI",	"COM:4:P % Share",	"COM:5:F First Name",
      "COM:5:L Last Name",	"COM:5:S Society",	"COM:5:C IPI",	"COM:5:P % Share",
      "ARR:1:F First Name",	"ARR:1:L Last Name",	"ARR:1:S Society",
      "ARR:1:C IPI",	"ARR:1:P % Share",	"PUB:1:N Name",	"PUB:1:S Society",
      "PUB:1:C IPI",	"PUB:1:P % Share",	"PUB:2:N Name",	"PUB:2:S Society",
      "PUB:2:C IPI",	"PUB:2:P % Share",	"PUB:3:N Name",	"PUB:3:S Society",
      "PUB:3:C IPI",	"PUB:3:P % Share",	"PUB:4:N Name",	"PUB:4:S Society",
      "PUB:4:C IPI",	"PUB:4:P % Share",	"PUB:5:N Name",	"PUB:5:S Society",
      "PUB:5:C IPI",	"PUB:5:P % Share",	"PUB:6:N Name",	"PUB:6:S Society",
      "PUB:6:C IPI",	"PUB:6:P % Share",	"SUB:P % Share",	"REG:I Registration Include",
      "REG:C Registration Cat No.",	"REG:L Local Work",	"ATT: ISRC",	"ATT: G:SMCat",
      "ATT: G:SMSubCat",	"Alternate Title",	"ATT: ISWC"
    ];
    setXlsData([headersRow.join("\t")]);
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      cue.rel_id === releaseFilter.value);
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
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
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split).sort((c, d) => c.last < d.last ? -1 : c.last > d.last ? 1 : 0);
      let compString = "";
      let pubString = "";
      let temp = [];
      let publisherArray = [];
      let combinedPubSplit = 0;
      for(let c in composerArray){
        let pubDoesntExist = temp.indexOf(composerArray[c].publisher_name) === -1;
        let currentSplit = composerArray[c].composer_split.toFixed(2);
        combinedPubSplit = pubDoesntExist
          ? currentSplit
          : parseFloat(publisherArray.filter(pub => pub.publisher_name === composerArray[c].publisher_name).map(x => x.publisher_split)) + parseFloat(currentSplit);
        pubString += (c > 0) && pubDoesntExist
          ? ";"
          : "";
        pubString += pubDoesntExist
          ? `${composerArray[c].publisher_name}`
          : "";
        compString += `${composerArray[c].last}${composerArray[c].suffix ?  " " + composerArray[c].suffix  : ""}, ${composerArray[c].first}${composerArray[c].middle ?  " " + composerArray[c].middle : ""}`;
        compString += c < composerArray.length - 1
          ? " / "
          : " ";
        pubDoesntExist
          ? temp.push(composerArray[c].publisher_name)
          : null;
        let pub = {publisher_pro: composerArray[c].publisher_pro, publisher_split: parseFloat(combinedPubSplit).toFixed(2), publisher_name: composerArray[c].publisher_name, ipi: composerArray[c].ipi};
        let pubFilter = publisherArray.filter(pub => pub.publisher_name === composerArray[c].publisher_name);
        pubFilter.length > 0 ? publisherArray.splice(publisherArray.map(x => x.publisher_name).indexOf(composerArray[c].publisher_name), 1, pub) : publisherArray.push(pub);
      }
      // --------------------------------------------------------------------------------------------------

      let newRow = [
        // Library
        "DL Music - Indie Artists",
        // Cat No
        `IA${row.style_id.toString().padStart(3, 0)}`,
        // CD Title
        `${genre}, ${subGenre}`,
        // Track Title
        row.cue_title,
        // Track Display Title
        row.cue_title,
        // Track No
        row.cue_id,
        // Mixout
        "",
        // Version
        row.cue_title.includes("Instrumental")
          ? "Instrumental"
          : "",
        // Length
        row.cue_duration,
        // Bitrate
        "16bit",
        // Frequency
        "48khz",
        // Genre/Category
        `${genre}, ${subGenre}`,
        // BPM
        "",
        // Tempo
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // Keywords
        descriptionString.toLowerCase(),
        // Instrumentation
        instrumentsString.toUpperCase(),
        // Track Description
        descriptionString.toLowerCase(),
        // Composer(s)
        compString.trim(),
        // CD Description
        `${genre}, ${subGenre}`,
        // Publisher(s)
        pubString,
        // Release Date
        moment(row.cue_reldate_h).format("YYYY-MM-DD HH:mm:ss"),
        // Filename
        row.cue_title,
        // COM:1:F First Name
        composerArray[0].first,
        // COM:1:L Last Name
        composerArray[0].last,
        // COM:1:S Society
        composerArray[0].pro_name,
        // COM:1:C IPI
        composerArray[0].cae,
        // COM:1:P % Share
        composerArray[0].composer_split,
        // COM:2:F First Name
        composerArray[1] ? composerArray[1].first : "",
        // COM:2:L Last Name
        composerArray[1] ? composerArray[1].last : "",
        // COM:2:S Society
        composerArray[1] ? composerArray[1].pro_name : "",
        // COM:2:C IPI
        composerArray[1] ? composerArray[1].cae : "",
        // COM:2:P % Share
        composerArray[1] ? composerArray[1].composer_split : "",
        // COM:3:F First Name
        composerArray[2] ? composerArray[2].first : "",
        // COM:3:L Last Name
        composerArray[2] ? composerArray[2].last : "",
        // COM:3:S Society
        composerArray[2] ? composerArray[2].pro_name : "",
        // COM:3:C IPI
        composerArray[2] ? composerArray[2].cae : "",
        // COM:3:P % Share
        composerArray[2] ? composerArray[2].composer_split : "",
        // COM:4:F First Name
        composerArray[3] ? composerArray[3].first : "",
        // COM:4:L Last Name
        composerArray[3] ? composerArray[3].last : "",
        // COM:4:S Society
        composerArray[3] ? composerArray[3].pro_name : "",
        // COM:4:C IPI
        composerArray[3] ? composerArray[3].cae : "",
        // COM:4:P % Share
        composerArray[3] ? composerArray[3].composer_split : "",
        // COM:5:F First Name
        composerArray[4] ? composerArray[4].first : "",
        // COM:5:L Last Name
        composerArray[4] ? composerArray[4].last : "",
        // COM:5:S Society
        composerArray[4] ? composerArray[4].pro_name : "",
        // COM:5:C IPI
        composerArray[4] ? composerArray[4].cae : "",
        // COM:5:P % Share
        composerArray[4] ? composerArray[4].composer_split : "",
        // ARR:1:F First Name
        "",
        // ARR:1:L Last Name
        "",
        // ARR:1:S Society
        "",
        // ARR:1:C IPI
        "",
        // ARR:1:P % Share
        "",
        // PUB:1:N Name
        publisherArray[0].publisher_name,
        // PUB:1:S Society
        publisherArray[0].publisher_pro,
        // PUB:1:C IPI
        publisherArray[0].ipi,
        // PUB:1:P % Share
        publisherArray[0].publisher_split,
        // PUB:2:N Name
        publisherArray[1] ? publisherArray[1].publisher_name : "",
        // PUB:2:S Society
        publisherArray[1] ? publisherArray[1].publisher_pro : "",
        // PUB:2:C IPI
        publisherArray[1] ? publisherArray[1].ipi : "",
        // PUB:2:P % Share
        publisherArray[1] ? publisherArray[1].publisher_split : "",
        // PUB:3:N Name
        publisherArray[2] ? publisherArray[2].publisher_name : "",
        // PUB:3:S Society
        publisherArray[2] ? publisherArray[2].publisher_pro : "",
        // PUB:3:C IPI
        publisherArray[2] ? publisherArray[2].ipi : "",
        // PUB:3:P % Share
        publisherArray[2] ? publisherArray[2].publisher_split : "",
        // PUB:4:N Name
        publisherArray[3] ? publisherArray[3].publisher_name : "",
        // PUB:4:S Society
        publisherArray[3] ? publisherArray[3].publisher_pro : "",
        // PUB:4:C IPI
        publisherArray[3] ? publisherArray[3].ipi : "",
        // PUB:4:P % Share
        publisherArray[3] ? publisherArray[3].publisher_split : "",
        // PUB:5:N Name
        publisherArray[4] ? publisherArray[4].publisher_name : "",
        // PUB:5:S Society
        publisherArray[4] ? publisherArray[4].publisher_pro : "",
        // PUB:5:C IPI
        publisherArray[4] ? publisherArray[4].ipi : "",
        // PUB:5:P % Share
        publisherArray[4] ? publisherArray[4].publisher_split : "",
        // SUB:P % Share
        "",
        // REG:I Registration Include
        "",
        // REG:C Registration Cat No.
        "",
        // REG:L Local Work
        "",
        // ATT: ISRC
        "",
        // ATT: G:SMCat
        "",
        // ATT: G:SMSubCat
        "",
        // Alternate Title
        "",
        // ATT: ISWC
        ""
      ];
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
      releaseFilter === 147 || selectedLibrary.libraryName !== "independent-artists" || cuesLoading
        ? exportTools.exportError("Please Select An Independent Artist Release")
        : inclusive || releaseFilter.label === "All"
          ? exportTools.exportError("Please Unselect All/Inclusive.")
          : releaseFilter.label.includes("_")
            ? exportTools.exportError("We Typically Only Send Baraka Releases. Please Select A Release.")
            : barakaIAExport())
    } className={
      inclusive || releaseFilter === 147 || selectedLibrary.libraryName !== "independent-artists" || cuesLoading ||
      (releaseFilter.label && (releaseFilter.label === "All" || releaseFilter.label.includes("_")))
        ? "strikethrough"
        : "download-links"
    }>
      {`Baraka IA Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BarakaIAExport));
