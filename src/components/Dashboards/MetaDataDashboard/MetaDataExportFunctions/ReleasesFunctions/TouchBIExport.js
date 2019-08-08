import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  TOUCH BI RELEASE EXPORT FUNCTION
// ******************************************************************************************
//  seems finished need to diff check, refactor if necessary
// ******************************************************************************************

const TouchBIExport = (props) => {
  const { batchesDropDown, cuesLoading, inclusive, downloadCompletedChecker, downloadProgress, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}TOUCH_BI_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const touchBIExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "LIBRARY", "LABEL", "CD CODE", "CD TITLE", "ISRC",	"CD DESCRIPTION",	"TRACK NUMBER",	"TRACK TITLE",
      "TIME/DURATION",	"COMPOSER NAME & SURNAME 1",	"COPYRIGHT SOCIETY COMPOSER 1",
      "COMPOSER NAME & SURNAME 2",	"COPYRIGHT SOCIETY COMPOSER 2",	"COMPOSER NAME & SURNAME 3",
      "COPYRIGHT SOCIETY COMPOSER 3",	"COMPOSER NAME & SURNAME 4",	"COPYRIGHT SOCIETY COMPOSER 4",
      "COMPOSER NAME & SURNAME 5",	"COPYRIGHT SOCIETY COMPOSER 5",	"YEAR RELEASE",	"TEMPO",	"CATEGORY",
      "SUBCATEGORY",	"TRACK DESCRIPTION",	"INSTRUMENTATION",	"KEYWORDS"
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
            : cue.rel_id === releaseFilter.value
    ).sort((e, f) => // this export demands we order things alphabetically by cue_title
      e.cue_title - f.cue_title).sort((c, d) => //  then by category name alphabetically....
      (selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name < selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
        ? -1
        : (selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name > selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
          ? 1
          : 0).sort((a, b) =>
    // and then style name alphabetically...
      (selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name < selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
        ? -1
        : (selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name > selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
          ? 1
          : 0);
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(", ");
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(", ");
      let releaseParse = releaseFilter.label.split("R")[1];
      let genre = selectedCategories.filter(categories =>
        categories.cat_id === row.cat_id).map(cat =>
        cat.cat_name)[0];
      let subGenre = selectedStyles.filter(styles =>
        styles.style_id === row.style_id).map(style =>
        style.style_name)[0];
      // --------------------------------------------------------------------------------------------------
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);

      let newRow = [
        // LIBRARY
        "DL Music - Background Instrumentals",
        // LABEL
        "DL Music - Background Instrumentals",
        // CD CODE
        `DLM-BI-${row.style_id.toString().padStart(3, 0)}-R${releaseParse.padStart(3, 0)}`,
        // CD TITLE
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // ISRC
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // CD DESCRIPTION
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // TRACK NUMBER
        row.cue_id,
        // TRACK TITLE
        row.cue_title,
        // TIME/DURATION
        row.cue_duration,
        // COMPOSER NAME & SURNAME 1
        `${composerArray[0].first + " "}${composerArray[0].middle ? composerArray[0].middle + " " : ""}${composerArray[0].last }${composerArray[0].suffix ? " " + composerArray[0].suffix : ""}`,
        // COPYRIGHT SOCIETY COMPOSER 1
        composerArray[0].pro_name,
        // COMPOSER NAME & SURNAME 2
        composerArray[1] ? `${composerArray[1].first + " "}${composerArray[1].middle ? composerArray[1].middle + " " : ""}${composerArray[1].last }${composerArray[1].suffix ? " " + composerArray[1].suffix : ""}` : "",
        // COPYRIGHT SOCIETY COMPOSER 2
        composerArray[1] ? composerArray[1].pro_name : "",
        // COMPOSER NAME & SURNAME 3
        composerArray[2] ? `${composerArray[2].first + " "}${composerArray[2].middle ? composerArray[2].middle + " " : ""}${composerArray[2].last }${composerArray[2].suffix ? " " + composerArray[2].suffix : ""}` : "",
        // COPYRIGHT SOCIETY COMPOSER 3
        composerArray[2] ? composerArray[2].pro_name : "",
        // COMPOSER NAME & SURNAME 4
        composerArray[3] ? `${composerArray[3].first + " "}${composerArray[3].middle ? composerArray[3].middle + " " : ""}${composerArray[3].last }${composerArray[3].suffix ? " " + composerArray[3].suffix : ""}` : "",
        // COPYRIGHT SOCIETY COMPOSER 4
        composerArray[3] ? composerArray[3].pro_name : "",
        // COMPOSER NAME & SURNAME 5
        composerArray[4] ? `${composerArray[4].first + " "}${composerArray[4].middle ? composerArray[4].middle + " " : ""}${composerArray[4].last }${composerArray[4].suffix ? " " + composerArray[4].suffix : ""}` : "",
        // COPYRIGHT SOCIETY COMPOSER 5
        composerArray[4] ? composerArray[4].pro_name : "",
        // YEAR RELEASE
        row.cue_reldate_h.substring(0, 4),
        // TEMPO
        tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // CATEGORY
        genre,
        // SUBCATEGORY
        subGenre,
        // TRACK DESCRIPTION
        descriptionString,
        // INSTRUMENTATION
        instrumentsString,
        // KEYWORDS
        descriptionString
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
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : inclusive || releaseFilter.label === "All"
          ? exportTools.exportError("Please Unselect All/Inclusive.")
          : releaseFilter.label.includes("_")
            ? exportTools.exportError("We Typically Only Send Touch Releases. Please Select A Release.")
            : selectedLibrary.libraryName === "independent-artists"
              ? exportTools.exportError("Please Select a Release Or Use The Touch IA Export.")
              : touchBIExport())
    } className={
      cuesLoading || inclusive || releaseFilter === 147 || selectedLibrary.libraryName !== "background-instrumentals" ||
      (releaseFilter.label && (releaseFilter.label === "All" || releaseFilter.label.includes("_")))
        ? "strikethrough"
        : "download-links"
    }>
      {`Touch BI Release Export ${
        inclusive || releaseFilter === 147 ||  selectedLibrary.libraryName !== "background-instrumentals" ||
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TouchBIExport));
