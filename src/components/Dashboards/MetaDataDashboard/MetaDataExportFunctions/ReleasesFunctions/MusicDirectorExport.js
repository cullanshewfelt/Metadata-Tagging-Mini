import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  MUSIC DIRECTOR BI EXPORT FUNCTION
// ******************************************************************************************
//  seems finished, diffCheck, refactor code
// ******************************************************************************************

const MusicDirectorExport = (props) => {
  const { cuesLoading, inclusive, downloadCompletedChecker, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}MUSIC_DIRECTOR_BI_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const musicDirectorExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let headersRow = [
      "xx CURRENT TRACK # xx",	"xx DLM FILENAME xx",	"xx MD FILENAME xx",	"xx MD FILENAME w FOLDER PREFIX xx",
      "CD Code",	"CD Title",	"CD Description",	"Tracktitel",	"Tracknumber",	"Index",	"Track Description",	"Duration",
      "Composer 1",	"Composer 2",	"Composer 3",	"Composer 4",	"Composer 5",	"COM:1:F First Name",	"COM:1:L Last Name",
      "COM:1:S Society",	"COM:1:C IPI",	"COM:1:P % Share",	"COM:2:F First Name",	"COM:2:L Last Name",
      "COM:2:S Society",	"COM:2:C IPI",	"COM:2:P % Share",	"COM:3:F First Name",	"COM:3:L Last Name",
      "COM:3:S Society",	"COM:3:C IPI",	"COM:3:P % Share",	"COM:4:F First Name",	"COM:4:L Last Name",
      "COM:4:S Society",	"COM:4:C IPI",	"COM:4:P % Share",	"COM:5:F First Name",	"COM:5:L Last Name",
      "COM:5:S Society",	"COM:5:C IPI",	"COM:5:P % Share",	"COM:6:F First Name",	"COM:6:L Last Name",
      "COM:6:S Society",	"COM:6:C IPI",	"COM:6:P % Share",	"Library",	"Publisher1",	"PUB:1:S Society",
      "PUB:1:C IPI",	"PUB:1:P %",	"Publisher2",	"PUB:2:S Society",	"PUB:2:C IPI",	"PUB:2:P %",
      "Publisher3",	"PUB:3:S Society",	"PUB:3:C IPI",	"PUB:3:P %",	"Publisher4",	"PUB:4:S Society",
      "PUB:4:C IPI",	"PUB:4:P %",	"Publisher5",	"PUB:5:S Society",	"PUB:5:C IPI",	"PUB:5:P %",
      "Publisher6",	"PUB:6:S Society",	"PUB:6:C IPI",	"PUB:6:P %",	"Releaseyear",	"MD Category 1",
      "MD Category 2",	"MD Category 3",	"MD Category 4",	"MD Category 5"
    ];
    setXlsData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      inclusive
        ? cue.rel_id <= releaseFilter.value && cue.cue_status === "Active"
        : releaseFilter.label === "All"
          ? cue.cue_status === "Active"
          : releasesArray.length !== 0
            ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status === "Active"
            : inclusive && releasesArray.length !== 0
              ? cue.rel_id <= releasesArray[releasesArray.length - 1] && cue.cue_status === "Active"
              : cue.rel_id === releaseFilter.value && cue.cue_status === "Active"
    ).sort((e, f) => // this export demands we order things in ascending order by cue_id
      e.cue_id - f.cue_id).sort((c, d) => //  then by category name alphabetically....
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
    // --------------------------------------------------------------------------------------------------
    // a couple variables that need to be stored outside our forloop for continuity across export
    let musicDirectorFolderPrefix = 0;
    let musicDirectorTrackNumber = 1;
    let preStyleId = 0;
    let preVol = 1;
    let progressCount = 0;
    let volNum = 1;
    // --------------------------------------------------------------------------------------------------
    // the async for loop:
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      volNum = preStyleId !== row.style_id ? 1 : volNum; // resets the volNum on new styles
      progressCount ++;
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(", ");
      let releaseParse = releaseFilter.label.split("R")[1];
      let genre = selectedCategories.filter(categories =>
        categories.cat_id === row.cat_id).map(cat =>
        cat.cat_name)[0];
      let subGenre = selectedStyles.filter(styles =>
        styles.style_id === row.style_id).map(style =>
        style.style_name)[0];
      // --------------------------------------------------------------------------------------------------
      // variables and functions that parse composer data
      let combinedPubSplit = 0;
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split).sort((c, d) => c.last < d.last ? -1 : c.last > d.last ? 1 : 0);
      let publisherArray = [];
      let temp = [];
      for(let c in composerArray){ // this function works a little differently than other exports
        // checks to see if the current composer's publisher has already been accounted for for this track
        let pubDoesntExist = temp.indexOf(composerArray[c].name_only) === -1;
        let currentSplit = composerArray[c].composer_split.toFixed(2);
        // if publisher not accounted for set the combinedPub split to it's initial split
        combinedPubSplit = pubDoesntExist
          ? currentSplit  // else we find the publisher and add the splits up
          : parseFloat(publisherArray.filter(pub => pub.name_only === composerArray[c].name_only).map(x => x.publisher_split)) + parseFloat(currentSplit);
        pubDoesntExist // push this publisher's name into an array to keep track of which pubs have been accounted for
          ? temp.push(composerArray[c].name_only)
          : null;
        // create a new publisher object with the combined split data
        let pub = {publisher_pro: composerArray[c].publisher_pro, publisher_split: parseFloat(combinedPubSplit).toFixed(2), name_only: composerArray[c].name_only, ipi: composerArray[c].ipi};
        // filter through new publisher objects array for the current publisher
        let pubFilter = publisherArray.filter(pub => pub.name_only === composerArray[c].name_only);
        // if one is found, splice it out and replace it the new combined split data publisher object,
        // or else we haven't accounted for this publisher yet, so we will just push it into the publisherArray
        pubFilter.length > 0 ? publisherArray.splice(publisherArray.map(x => x.name_only).indexOf(composerArray[c].name_only), 1, pub) : publisherArray.push(pub);
      }
      // --------------------------------------------------------------------------------------------------
      // Music Director has a very unique way of organizing their metadata, they sepearate releases into
      // categories and number the tracks alphabetically on each category starting from 1.
      // The logic is as follows: if we are still on the previous category, add + 1 to track count,
      // Or else start the track count over at 1
      volNum = musicDirectorTrackNumber === 99 ? volNum + 1 : volNum;
      musicDirectorTrackNumber = preStyleId !== row.style_id ? 1 : musicDirectorTrackNumber + 1;
      musicDirectorTrackNumber = volNum !== preVol ? 1 : musicDirectorTrackNumber;
      musicDirectorFolderPrefix = (preStyleId !== row.style_id) && (volNum !== preVol)
        ? musicDirectorFolderPrefix + 1
        : preStyleId !== row.style_id
          ? musicDirectorFolderPrefix + 1
          : volNum !== preVol
            ? musicDirectorFolderPrefix + 1
            : musicDirectorFolderPrefix;
      preStyleId = preStyleId !== row.style_id ? row.style_id : preStyleId;
      preVol = volNum !== preVol ? volNum : preVol;
      // --------------------------------------------------------------------------------------------------
      let newRow = [

        // xx CURRENT TRACK # xx
        musicDirectorTrackNumber,
        // xx DLM FILENAME xx
        `DLM - ${row.cue_title}.wav`,
        // xx MD FILENAME xx
        `${row.cue_id}-${row.cue_title.toLowerCase().replace(/\s/g, "")}.wav`,
        // xx MD FILENAME w FOLDER PREFIX xx
        `DL${musicDirectorFolderPrefix.toString().padStart(4, 0)}_${row.cue_id}-${row.cue_title.toLowerCase().replace(/\s/g, "")}.wav`,
        // CD Code
        `DLM${musicDirectorFolderPrefix.toString().padStart(4, 0)}`,
        // CD Title
        `${genre}, ${subGenre} Vol. ${releaseParse}.${volNum}`,
        // CD Description
        `${genre}, ${subGenre}`,
        // Tracktitel
        row.cue_title,
        // Tracknumber
        row.cue_id,
        // Index
        "",
        // Track Description
        descriptionString.toLowerCase(),
        // Duration
        row.cue_duration,
        // Composer 1
        `${composerArray[0].last}, ${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ""}${composerArray[0].suffix ?  " " + composerArray[0].suffix  : ""}`,
        // Composer 2
        composerArray[1]
          ? `${composerArray[1].last}, ${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ""}${composerArray[1].suffix ?  " " + composerArray[1].suffix  : ""}`
          : "",
        // Composer 3
        composerArray[2]
          ? `${composerArray[2].last}, ${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ""}${composerArray[2].suffix ?  " " + composerArray[2].suffix  : ""}`
          : "",
        // Composer 4
        composerArray[3]
          ? `${composerArray[3].last}, ${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ""}${composerArray[3].suffix ?  " " + composerArray[3].suffix  : ""}`
          : "",
        // Composer 5
        composerArray[4]
          ? `${composerArray[4].last}, ${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ""}${composerArray[4].suffix ?  " " + composerArray[4].suffix  : ""}`
          : "",
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
        // COM:6:F First Name
        composerArray[5] ? composerArray[5].first : "",
        // COM:6:L Last Name
        composerArray[5] ? composerArray[5].last : "",
        // COM:6:S Society
        composerArray[5] ? composerArray[5].pro_name : "",
        // COM:6:C IPI
        composerArray[5] ? composerArray[5].cae : "",
        // COM:6:P % Share
        composerArray[5] ? composerArray[5].composer_split : "",
        // Library
        "DL Music",
        // Publisher1
        publisherArray[0].name_only,
        // PUB:1:S Society
        publisherArray[0].publisher_pro,
        // PUB:1:C IPI
        publisherArray[0].ipi,
        // PUB:1:P %
        publisherArray[0].publisher_split,
        // Publisher2
        publisherArray[1] ? publisherArray[1].name_only : "",
        // PUB:2:S Society
        publisherArray[1] ? publisherArray[1].publisher_pro : "",
        // PUB:2:C IPI
        publisherArray[1] ? publisherArray[1].ipi : "",
        // PUB:2:P %
        publisherArray[1] ? publisherArray[1].publisher_split : "",
        // Publisher3
        publisherArray[2] ? publisherArray[2].name_only : "",
        // PUB:3:S Society
        publisherArray[2] ? publisherArray[2].publisher_pro : "",
        // PUB:3:C IPI
        publisherArray[2] ? publisherArray[2].ipi : "",
        // PUB:3:P %
        publisherArray[2] ? publisherArray[2].publisher_split : "",
        // Publisher4
        publisherArray[3] ? publisherArray[3].name_only : "",
        // PUB:4:S Society
        publisherArray[3] ? publisherArray[3].publisher_pro : "",
        // PUB:4:C IPI
        publisherArray[3] ? publisherArray[3].ipi : "",
        // PUB:4:P %
        publisherArray[3] ? publisherArray[3].publisher_split : "",
        // Publisher5
        publisherArray[4] ? publisherArray[4].name_only : "",
        // PUB:5:S Society
        publisherArray[4] ? publisherArray[4].publisher_pro : "",
        // PUB:5:C IPI
        publisherArray[4] ? publisherArray[4].ipi : "",
        // PUB:5:P %
        publisherArray[4] ? publisherArray[4].publisher_split : "",
        // Publisher6
        publisherArray[5] ? publisherArray[5].name_only : "",
        // PUB:6:S Society
        publisherArray[5] ? publisherArray[5].publisher_pro : "",
        // PUB:6:C IPI
        publisherArray[5] ? publisherArray[5].ipi : "",
        // PUB:6:P %
        publisherArray[5] ? publisherArray[5].publisher_split : "",
        // Releaseyear
        row.cue_reldate_h.substring(2, 4),
        // MD Category 1
        "",
        // MD Category 2
        "",
        // MD Category 3
        "",
        // MD Category 4
        "",
        // MD Category 5
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
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : inclusive || releaseFilter.label === "All"
          ? exportTools.exportError("Please Unselect All/Inclusive.")
          : releaseFilter.label.includes("_")
            ? exportTools.exportError("We Typically Only Send Music Director Releases. Please Select A Release.")
            : selectedLibrary.libraryName === "independent-artists"
              ? exportTools.exportError("Please Use The Music Director IA Export")
              : musicDirectorExport())
    } className={
      inclusive || releaseFilter === 147 || cuesLoading ||
      (releaseFilter.label && (releaseFilter.label === "All" || releaseFilter.label.includes("_")))
        ? "strikethrough"
        : "download-links"
    }>
      {`Music Director Release Export ${
        inclusive || releaseFilter === 147 ||
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MusicDirectorExport));
