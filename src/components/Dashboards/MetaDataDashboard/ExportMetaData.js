import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import moment from "moment";
// ------------------------------------------------------------------------------------------------------------
import LeftColumn from "./MetaDataSubComponents/LeftColumn";
import RightColumn from "./MetaDataSubComponents/RightColumn";
// ------------------------------------------------------------------------------------------------------------
import { asyncTracksFetch } from "../../../actions/IndieArtistsActions/tracksActions";
import { initializeSelectedLibrary } from "../../../actions/selectedLibraryActions";
import { initializeSelectedCategories } from "../../../actions/selectedCategoriesActions";
import { initializeSelectedComposer } from "../../../actions/selectedComposerActions";
import { initializeSelectedReleases } from "../../../actions/selectedReleasesActions";
import { initializeSelectedStyles } from "../../../actions/selectedStylesActions";
import { resetDownload, updateDownload } from "../../../actions/ExportActions/exportActions";
// ------------------------------------------------------------------------------------------------------------
// loads some JSON data that I felt was unnecessary to store in SQL / Redux
let releasesDropDownJSON = require("./MetaDataExportFunctions/dropdownJsonData/releasesDropDown.json");
// ------------------------------------------------------------------------------------------------------------
const ExportDashboard = (props) => {
  let { categoriesIA, initializeSelectedCategories, initializeSelectedLibrary,
    initializeSelectedStyles, releasesIA, searches, stylesIA } = props;
  // ------------------------------------------------------------------------------------------------------------
  const [batchesDropDown, setBatchesDropDown] = useState([]);
  const [batchOrRelease, setBatchOrRelease] = useState("Indie Artist Release");
  // const [clients, setClients] = useState(props.clients);
  const [downloadFinished, setDownloadFinished] = useState(true);
  // const [downloadProgress, setDownloadProgress] = useState(props.downloadProgress);
  const [endDate, setEndDate] = useState(moment().toDate());
  const [inclusive, setInclusive] = useState(false);
  // const [monitoring, setMonitoring] = useState(props.monitoring);
  const [releaseFilter, setReleaseFilter] = useState(147);
  const [releasesDropDown, setReleasesDropDown] = useState(releasesDropDownJSON);
  const [selectedOption, setSelectedOption] = useState("independent-artists");
  const [startDate, setStartDate] = useState(moment().toDate());
  // ------------------------------------------------------------------------------------------------------------
  document.title = "DL Music | Export Portal | ";

  const downloadCompletedChecker =  () => { setDownloadFinished(!downloadFinished); };

  useEffect(() => {
    setBatchesDropDown(releasesIA.map(rel => {
      return { value: rel.rel_id, label: rel.rel_num };
    }));
  }, [releasesIA]);

  useEffect(() => {
    initializeSelectedCategories(categoriesIA);
  }, [categoriesIA]);

  useEffect(() => {
    initializeSelectedStyles(stylesIA);
  }, [stylesIA]);

  useEffect(() => {
    initializeSelectedLibrary([], "independent-artists");
  }, []);

  return(
    <div className='dashboard'>
      <div className='column-wrapper'>
        <LeftColumn
          batchesDropDown={batchesDropDown}
          batchOrRelease={batchOrRelease}
          endDate={endDate}
          inclusive={inclusive}
          releaseFilter={releaseFilter}
          releasesDropDown={releasesDropDown}
          selectedOption={selectedOption}
          setBatchesDropDown={setBatchesDropDown}
          setBatchOrRelease={setBatchOrRelease}
          setEndDate={setEndDate}
          setInclusive={setInclusive}
          setReleaseFilter={setReleaseFilter}
          setReleasesDropDown={setReleasesDropDown}
          setSelectedOption={setSelectedOption}
          setStartDate={setStartDate}
          startDate={startDate}
        />
        <RightColumn
          batchesDropDown={batchesDropDown}
          batchOrRelease={batchOrRelease}
          // clients={clients}
          downloadCompletedChecker={downloadCompletedChecker}
          endDate={endDate}
          inclusive={inclusive}
          // monitoring={monitoring}
          releaseFilter={releaseFilter}
          searches={searches}
          startDate={startDate}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesIA: state.categoriesIA,
    clients: state.clients,
    composersIA: state.composersIA,
    downloadProgress: state.downloadProgress,
    monitoring: state.monitoring,
    releasesIA: state.releasesIA,
    searches: state.searches,
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    selectedStyles: state.selectedStyles,
    stylesIA: state.stylesIA,
    tempos: state.tempos,
    tracks: state.tracks,
  };
};

const mapDispatchToProps = {
  asyncTracksFetch,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedLibrary,
  initializeSelectedReleases,
  initializeSelectedStyles,
  resetDownload,
  updateDownload
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExportDashboard));
