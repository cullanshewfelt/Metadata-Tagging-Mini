import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

const SoundMinerExport = (props) => {
  const { cuesLoading, downloadCompletedChecker, inclusive, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, updateDownload, tempos
  } = props;

  const [csvData, setCsvData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}SOUNDMINER_EXPORT_${moment().format("YYYY.MM.DD-HH_mm_ss")}.txt`;
    progress === 1
      ? exportTools.generateDownload(csvData.join("\n"), downloadLink)
      : updateDownload(progress);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && csvData.indexOf(newRowData.join("\t")) === -1) && setCsvData([...csvData, newRowData.join("\t")]);
  }, [progress, newRowData, csvData]);

  // ******************************************************************************************
  //  SOUND MINER EXPORT FUNCTION
  // ******************************************************************************************
  const soundMinerExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let isBG =  selectedLibrary.libraryName === "background-instrumentals" ? true : false;
    let progressCount = 0;
    let headersRow = [
      "Filename", "Manufacturer", "Library", "CDTitle", "TrackTitle", "Version", "Description", "Category", "SubCategory",
      "FeaturedInstrument", "Keywords", "Composer", "Artist", "Publisher", "Designer", "BWDescription", "BWOriginator",
      "BWOriginatorRef", "BWTime", "BWDate", "Tempo", "ReleaseDate", "TrackYear"
    ];
    isBG ? headersRow.push("ISRC") : null;
    setCsvData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      inclusive && releasesArray.length !== 0
        ? cue.rel_id <= releasesArray[releasesArray.length - 1]
        : inclusive
          ? cue.rel_id <= releaseFilter.value
          : releasesArray.length !== 0
            ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0]
            : cue.rel_id === releaseFilter.value);
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      // --------------------------------------------------------------------------------------------------
      // these little functions parse data to Title Case formatting
      // and remove empty keywords/instruments and tailing commas
      // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(row.cue_desc).join(", ");
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(", ");
      let genre = selectedCategories.filter(categories =>
        categories.cat_id === row.cat_id).map(cat =>
        cat.cat_name);

      let subGenre = selectedStyles.filter(styles =>
        styles.style_id === row.style_id).map(style =>
        style.style_name);
      // --------------------------------------------------------------------------------------------------
      let composerArray = selectedComposers.filter(composer => composer.cue_id === row.cue_id).sort((a, b) => b.composer_split - a.composer_split);
      // console.log(59, composerArray)
      let compString = "";
      let splitString = "";
      let pubString = "";
      for(let c in composerArray){
        if(!isBG && /\(\w+\)/g.test(composerArray[c].publisher_name)){
          let pubSwitch = /\(\w+\)/g.exec(composerArray[c].publisher_name)[0];
          switch(pubSwitch.substring(1, pubSwitch.length - 1)){
          case "ASCAP":
            pubString += "Derek Luff Music, Inc. (ASCAP)";
            break;
          case "BMI":
            pubString += "Dewmarc Music (BMI)";
            break;
          case "SESAC":
            pubString += "Ridek Music (SESAC)";
            break;
          }
        } else {
          pubString += `${composerArray[c].publisher_name}`;
        }
        pubString += c < composerArray.length - 1 ? " / " : " ";
        compString += `${composerArray[c].last}${composerArray[c].suffix ? " " + composerArray[c].suffix : ""}, ${composerArray[c].first} ${composerArray[c].middle || ""} (${composerArray[c].pro_name})`;
        compString += c < composerArray.length - 1 ? " / " : " ";
        splitString += `${composerArray[c].composer_split}`;
        splitString += c < composerArray.length - 1 ? "/" : "%";
      }

      let newRow = [
        // Filename
        isBG
          ? `DLM - ${row.cue_title}.aif`
          : selectedLibrary.libraryName === "independent-artists"
            ? `IA - ${row.cue_title}.aif`
            : "" ,
        // Manufacturer
        isBG
          ? "DL Music"
          : "DL Music - Indie Artists",
        // Library
        isBG
          ? `${compString}${splitString}`
          : "DL Music - Indie Artists",
        // CDTitle
        row.cat_id !==19 && row.style_id !== 147
          ? `${genre}, ${subGenre}`
          : "",
        // TrackTitle
        row.cue_title,
        // Version
        isBG && (/\sv[0-9]{1,2}/).test(row.cue_title)
          ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, "")
          : selectedLibrary.libraryName === "independent-artists" && row.cue_title.includes("Instrumental")
            ? "Instrumental"
            : "",
        // Description
        isBG
          ? pubString
          : "To license this track contact DL Music at 323-878-0400, or info@dl-music.com",
        // Category
        `${genre}`,
        // SubCategory
        `${subGenre}`,
        // FeaturedInstrument
        instrumentsString || "",
        // Keywords
        descriptionString,
        // Composer
        `${compString}${splitString}`,
        // Artist
        isBG
          ? `${compString}${splitString}`
          : "DL Music - Indie Artists",
        // Publisher
        pubString,
        // DESIGNER
        isBG
          ? pubString
          : "DL Music - Indie Artists",
        // BWDescription
        isBG
          ? pubString
          : "To license this track contact DL Music at 323-878-0400, or info@dl-music.com",
        // BWOriginator
        "DL-Music.com",
        // BWOriginator Reference
        isBG
          ? `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`
          : "",
        // BWTime
        row.cue_reldate_h.includes("T")
          ? row.cue_reldate_h.split("T")[1].split(".")[0]
          : row.cue_reldate_h.split(" ")[1].split(".")[0],
        // BWDate
        row.cue_reldate_h.split("T")[0],
        // Tempo
        tempos.filter(tempo =>
          tempo.tempo_id === row.tempo_id)[0].tempo_name,
        // ReleaseDate
        row.cue_reldate_h.split("T")[0],
        // TrackYear
        row.cue_reldate_h.substring(0, 4)
      ];

      isBG // ISRC
        ? newRow.push(`US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`)
        : null;

      progressCount ++;

      let progress = (progressCount/filteredLibrary.length);

      setProgress(progress);
      setRowData(newRow);

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

      copiedRow.shift();

      let copy = copiedRow;
      setRowData([ mp3, ...copy ]);
      setRowData([ wav, ...copy ]);

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
      exportTools.batchChecker(releaseFilter)
        ? soundMinerExport()
        : selectedComposers === undefined || selectedComposers.length === 0
          ? alert("This can't be exported due to unfinished tagging")
          : exportTools.exportError())
    } className={
      releaseFilter === 147 || cuesLoading
        ? "strikethrough"
        : "download-links"
    }>
      {`SoundMiner ${
        releaseFilter === 147
          ? ""
          : selectedLibrary.libraryName === "independent-artists"
            ? "Release "
            : (releaseFilter.value && typeof releaseFilter.value === "string")
              ? "Release "
              : "Batch "
      }Export ${
        releaseFilter
        && releaseFilter.label
          ? releaseFilter.label
          : ""}
        ${inclusive
      ? "INC"
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SoundMinerExport));
