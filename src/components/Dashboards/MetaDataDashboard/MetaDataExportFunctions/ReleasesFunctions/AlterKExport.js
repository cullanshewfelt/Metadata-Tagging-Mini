import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import moment from "moment";
import { connect } from "react-redux";
import { resetDownload, updateDownload } from "../../../../../actions/ExportActions/exportActions";
const exportTools = require("../ExportTools.js");

// ******************************************************************************************
//  ALTER K RELEASES EXPORT FUNCTION
// ------------------------------------------------------------------------------------------
//  in progress
// ******************************************************************************************
const AlterKExport = (props) => {
  const { batchesBI, cuesLoading, downloadCompletedChecker, downloadProgress, inclusive, releaseFilter, resetDownload,
    selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
  } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_AlterK_${releaseFilter.label + "_"}${inclusive ? "INC_" : ""}UPDATE_METADATA_${moment().format("YYYY.MM.DD-HH_mm_ss")}.xls`;
    updateDownload(progress);
    progress === 1 && exportTools.generateDownload(xlsData.join("\n"), downloadLink);
  }, [progress]);

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join("\t")) === -1) && setXlsData([...xlsData, newRowData.join("\t")]);
  }, [newRowData, progress]);

  const alterKExport = () => {
    resetDownload();
    downloadCompletedChecker();
    let progressCount = 0;
    let headersRow = [
      "NOM DU CATALOGUE", "TITRE", "COMPO 1", "CATEG.", "REPRES.", "DEP % COMPO 1 POSSEDE", "DEP % COMPO 1 COLLECTE",
      "PHONO % COMPO 1 POSSEDE", "PHONO % COMPO 1 COLLECTE", "COMPO 2", "CATEG.", "REPRES.", "DEP % COMPO 2 POSSEDE", "DEP % COMPO 2 COLLECTE",
      "PHONO % COMPO 2 POSSEDE", "PHONO % COMPO 2 COLLECTE", "COMPO 3", "CATEG.", "REPRES.", "DEP % COMPO 3 POSSEDE", "DEP % COMPO 3 COLLECTE",
      "PHONO % COMPO 3 POSSEDE", "PHONO % COMPO 3 COLLECTE", "COMPO 4", "CATEG.", "REPRES.", "DEP % COMPO 4 POSSEDE", "DEP % COMPO 4 COLLECTE",
      "PHONO % COMPO 4 POSSEDE", "PHONO % COMPO 4 COLLECTE", "COMPO 5", "CATEG.", "REPRES.", "DEP % COMPO 5 POSSEDE", "DEP % COMPO 5 COLLECTE",
      "PHONO % COMPO 5 POSSEDE", "PHONO % COMPO 5 COLLECTE", "EDITEUR ORIGINAL 1", "CATEG.", "REPRES.", "DEP % ED.OR 1 POSSEDE",
      "DEP % ED.OR 1 COLLECTE", "PHONO % ED.OR 1 POSSEDE", "PHONO % ED.OR 1 COLLECTE", "EDITEUR ORIGINAL 2", "CATEG.", "REPRES.", "DEP % ED.OR 2 POSSEDE",
      "DEP % ED.OR 2 COLLECTE", "PHONO % ED.OR 2 POSSEDE", "PHONO % ED.OR 2 COLLECTE", "EDITEUR ORIGINAL 3", "CATEG.", "REPRES.", "DEP % ED.OR 3 POSSEDE",
      "DEP % ED.OR 3 COLLECTE", "PHONO % ED.OR 3 POSSEDE", "PHONO % ED.OR 3 COLLECTE", "SOUS EDITEUR", "CATEG.", "REPRES.", "DEP % SOUS EDITEUR POSSEDE",
      "DEP % SOUS EDITEUR COLLECTE", "PHONO % SOUS EDITEUR POSSEDE", "PHONO % SOUS EDITEUR COLLECTE", "TOTAL DEP POSSEDE", "TOTAL DEP COLLECTE", "TOTAL PHONO POSSEDE",
      "TOTAL PHONO COLLECTE", "VERIFICATION DES TOTAUX"
    ];
    setXlsData([headersRow.join("\t")]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes("-") ? releaseFilter.value.split("-") : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      releaseFilter.value !== 9999
        ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status === "Active"
        : null
    );
    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
      let composerArray = selectedComposers.filter(composer =>
        composer.cue_id === row.cue_id).sort((a, b) =>
        b.composer_split - a.composer_split);

      // --------------------------------------------------------------------------------------------------
      //  these functions seperate publishers and add their splits up
      let pubMergeArray = [];

      Array.prototype.inArray = function(comparer) {
        for(var i=0; i < pubMergeArray.length; i++) {
          if(comparer(pubMergeArray[i])) return true;
        }
        return false;
      };

      Array.prototype.pushIfNotExist = function(element, comparer) {
        if (!pubMergeArray.inArray(comparer)) {
          pubMergeArray.push(element);
        } else {
          pubMergeArray.filter(pub =>
            pub.publisher === element.publisher).map(x =>
            x.split += element.split
          );
        }
      };

      composerArray.forEach((composer, i) => {
        let newPub = {publisher: composer.publisher_name.split(" (")[0], split: composer.composer_split};
        pubMergeArray.pushIfNotExist(newPub, (c) => {
          return c.publisher === newPub.publisher;
        });
      });

      // --------------------------------------------------------------------------------------------------
      let newRow = [
        // 'NOM DU CATALOGUE'
        "DL Music",
        // 'TITRE'
        row.cue_title.toString(),
        // 'COMPO 1'
        `${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ""} ${composerArray[0].last}`,
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        "C",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        "O",
        // 'DEP % COMPO 1 POSSEDE'        // this is the same % in every box for you (per composer) - just fill their split in each of these columns
        parseFloat((composerArray[0].composer_split.toFixed(2)/2)).toLocaleString("fr"),
        // 'DEP % COMPO 1 COLLECTE'       // same as above
        parseFloat((composerArray[0].composer_split.toFixed(2)/2)).toLocaleString("fr"),
        // 'PHONO % COMPO 1 POSSEDE'      // same as above
        parseFloat((composerArray[0].composer_split.toFixed(2)/2)).toLocaleString("fr"),
        // 'PHONO % COMPO 1 COLLECTE'     // same as above
        parseFloat((composerArray[0].composer_split.toFixed(2)/2)).toLocaleString("fr"),
        // 'COMPO 2'
        composerArray[1]
          ? `${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ""} ${composerArray[1].last}`
          : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        composerArray[1]
          ? "C"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        composerArray[1]
          ? "O"
          : "",
        // 'DEP % COMPO 2 POSSEDE'
        composerArray[1] ? parseFloat((composerArray[1].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % COMPO 2 COLLECTE'
        composerArray[1] ? parseFloat((composerArray[1].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 2 POSSEDE'
        composerArray[1] ? parseFloat((composerArray[1].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 2 COLLECTE'
        composerArray[1] ? parseFloat((composerArray[1].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'COMPO 3'
        composerArray[2]
          ? `${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ""} ${composerArray[2].last}`
          : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        composerArray[2]
          ? "C"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        composerArray[2]
          ? "O"
          : "",
        // 'DEP % COMPO 3 POSSEDE'
        composerArray[2] ? parseFloat((composerArray[2].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % COMPO 3 COLLECTE'
        composerArray[2] ? parseFloat((composerArray[2].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 3 POSSEDE'
        composerArray[2] ? parseFloat((composerArray[2].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 3 COLLECTE'
        composerArray[2] ? parseFloat((composerArray[2].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'COMPO 4'
        composerArray[3]
          ? `${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ""} ${composerArray[3].last}`
          : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        composerArray[3]
          ? "C"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        composerArray[3]
          ? "O"
          : "",
        // 'DEP % COMPO 4 POSSEDE'
        composerArray[3] ? parseFloat((composerArray[3].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % COMPO 4 COLLECTE'
        composerArray[3] ? parseFloat((composerArray[3].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 4 POSSEDE'
        composerArray[3] ? parseFloat((composerArray[3].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 4 COLLECTE'
        composerArray[3] ? parseFloat((composerArray[3].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'COMPO 5'
        composerArray[4]
          ? `${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ""} ${composerArray[4].last}`
          : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        composerArray[4]
          ? "C"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        composerArray[4]
          ? "O"
          : "",
        // 'DEP % COMPO 5 POSSEDE'
        composerArray[4] ? parseFloat((composerArray[4].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % COMPO 5 COLLECTE'
        composerArray[4] ? parseFloat((composerArray[4].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 5 POSSEDE'
        composerArray[4] ? parseFloat((composerArray[4].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % COMPO 5 COLLECTE'
        composerArray[4] ? parseFloat((composerArray[4].composer_split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'EDITEUR ORIGINAL 1'
        pubMergeArray[0].publisher,
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        "E",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        "O",
        // 'DEP % ED.OR 1 POSSEDE'
        parseFloat((pubMergeArray[0].split.toFixed(2)/2)).toLocaleString("fr"),
        // 'DEP % ED.OR 1 COLLECTE'
        parseFloat((pubMergeArray[0].split.toFixed(2)/2)).toLocaleString("fr"),
        // 'PHONO % ED.OR 1 POSSEDE'
        parseFloat((pubMergeArray[0].split.toFixed(2)/2)).toLocaleString("fr"),
        // 'PHONO % ED.OR 1 COLLECTE'
        parseFloat((pubMergeArray[0].split.toFixed(2)/2)).toLocaleString("fr"),
        // 'EDITEUR ORIGINAL 2'
        pubMergeArray[1] ? pubMergeArray[1].publisher : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        pubMergeArray[1]
          ? "E"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        pubMergeArray[1]
          ? "O"
          : "",
        // 'DEP % ED.OR 2 POSSEDE'
        pubMergeArray[1] ? parseFloat((pubMergeArray[1].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % ED.OR 2 COLLECTE'
        pubMergeArray[1] ? parseFloat((pubMergeArray[1].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % ED.OR 2 POSSEDE'
        pubMergeArray[1] ? parseFloat((pubMergeArray[1].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % ED.OR 2 COLLECTE'
        pubMergeArray[1] ? parseFloat((pubMergeArray[1].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'EDITEUR ORIGINAL 3'
        pubMergeArray[2] ? pubMergeArray[2].publisher : "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        pubMergeArray[2]
          ? "E"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        pubMergeArray[2]
          ? "O"
          : "",
        // 'DEP % ED.OR 3 POSSEDE'
        pubMergeArray[2] ? parseFloat((pubMergeArray[2].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'DEP % ED.OR 3 COLLECTE'
        pubMergeArray[2] ? parseFloat((pubMergeArray[2].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % ED.OR 3 POSSEDE'
        pubMergeArray[2] ? parseFloat((pubMergeArray[2].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'PHONO % ED.OR 3 COLLECTE'
        pubMergeArray[2] ? parseFloat((pubMergeArray[2].split.toFixed(2)/2)).toLocaleString("fr") : "",
        // 'SOUS EDITEUR'
        "",
        // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
        composerArray[5]
          ? "E"
          : "",
        // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
        composerArray[5]
          ? "O"
          : "",
        // 'DEP % SOUS EDITEUR POSSEDE'
        "",
        // 'DEP % SOUS EDITEUR COLLECTE'
        "",
        // 'PHONO % SOUS EDITEUR POSSEDE'
        "",
        // 'PHONO % SOUS EDITEUR COLLECTE'
        "",
        // 'TOTAL DEP POSSEDE'
        `=F${progressCount + 2}+M${progressCount + 2}+T${progressCount + 2}+AA${progressCount + 2}+AH${progressCount + 2}+AO${progressCount + 2}+AV${progressCount + 2}+BC${progressCount + 2}+BJ${progressCount + 2}`,
        // 'TOTAL DEP COLLECTE'
        `=G${progressCount + 2}+N${progressCount + 2}+U${progressCount + 2}+AB${progressCount + 2}+AI${progressCount + 2}+AP${progressCount + 2}+AW${progressCount + 2}+BD${progressCount + 2}+BK${progressCount + 2}`,
        // 'TOTAL PHONO POSSEDE'
        `=H${progressCount + 2}+O${progressCount + 2}+V${progressCount + 2}+AC${progressCount + 2}+AJ${progressCount + 2}+AQ${progressCount + 2}+AX${progressCount + 2}+BE${progressCount + 2}+BL${progressCount + 2}`,
        // 'TOTAL PHONO COLLECTE'
        `=I${progressCount + 2}+P${progressCount + 2}+W${progressCount + 2}+AD${progressCount + 2}+AK${progressCount + 2}+AR${progressCount + 2}+AY${progressCount + 2}+BF${progressCount + 2}+BM${progressCount + 2}`,
        // 'VERIFICATION DES TOTAUX'
        `=IF(OR(BN${progressCount + 2}<>100;BO${progressCount + 2}<>100;BP${progressCount + 2}<>100;BQ${progressCount + 2}<>100);"ERREUR";"ok")`
      ];
      progressCount ++;
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
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        :  selectedLibrary.libraryName === "independent-artists"
          ? exportTools.exportError("We Don't Send Our Independent Artists Catalog To AlterK")
          : !releaseFilter.value.toString().includes("-")
            ? exportTools.exportError("We Typically Only Send AlterK Releases. Please Select A Release.")
            : inclusive || releaseFilter.label === "All"
              ? exportTools.exportError("We Typically Only Send AlterK One Release At A Time. Please Unselect Inclusive.")
              : alterKExport())}
    className={
      inclusive || cuesLoading
        ? "strikethrough"
        : (releaseFilter.value
           && typeof releaseFilter.value === "string")
           && releaseFilter.label !== "All"
          ? "download-links"
          : "strikethrough"
    }>
      {`Alter K Release Export ${
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


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AlterKExport));
