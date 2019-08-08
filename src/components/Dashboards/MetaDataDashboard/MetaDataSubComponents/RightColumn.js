import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
// ------------------------------------------------------------------------------------------------------------
import "react-datepicker/dist/react-datepicker.css";
import InfiniteScroll from "react-infinite-scroll-component";
// ------------------------------------------------------------------------------------------------------------
// these imports contain all the export/download functions:
import Batches from "./Batches.js";
import IndependentArtists from "./IndependentArtists.js";
import Releases from "./Releases.js";
import UsageReportTimeline from "../MetaDataExportFunctions/AdminFunctions/UsageReportTimeline";
// ------------------------------------------------------------------------------------------------------------
// import { asyncTracksFetch } from "../../../../actions/IndieArtistsActions/tracksActions";
import { handleFetchCuesFromRelease } from "../../../../actions/selectedReleasesActions";
import { initializeSelectedLibrary } from "../../../../actions/selectedLibraryActions";
import { initializeSelectedCategories } from "../../../../actions/selectedCategoriesActions";
import { initializeSelectedComposer } from "../../../../actions/selectedComposerActions";
import { initializeSelectedReleases } from "../../../../actions/selectedReleasesActions";
import { initializeSelectedStyles } from "../../../../actions/selectedStylesActions";
// ------------------------------------------------------------------------------------------------------------
const RightColumn = (props) => {
  let { batchesDropDown, batchOrRelease, clients, downloadCompletedChecker, endDate, inclusive,
    cueFetchIsLoading, monitoring, releaseFilter, searches, startDate, trackFetchIsLoading } = props;

  let cuesLoading = cueFetchIsLoading || trackFetchIsLoading;

  // console.log(35, cuesLoading)

  // (selectedLibrary.library.length === 0 || monitoring.length === 0)
  //   ? <div className='loading'>
  //     <Loader/>
  //     <br/>
  //     Lot's of Data Loading! Please Be Patient...
  //   </div>
  //   :

  return (
    <div className='dashboard-right-column'>
      <h2 className='dashboard-header'>Metadata Export Download Links:</h2>
      <div style={{overflowY: "hidden", height: "550px"}}>
        <InfiniteScroll
          height={600}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: "center"}}>
              <b></b>
            </p>
          }
        >
          { startDate.toString() !== endDate.toString()
            ? <UsageReportTimeline
              clients={clients}
              downloadCompletedChecker={downloadCompletedChecker}
              endDate={endDate}
              monitoring={monitoring}
              searches={searches}
              startDate={startDate}
            />

            : batchOrRelease === "Background Instrumental Batch"
              ? <Batches
                batchesDropDown={batchesDropDown}
                cuesLoading={cuesLoading}
                downloadCompletedChecker={downloadCompletedChecker}
                inclusive={inclusive}
                releaseFilter={releaseFilter}
              />
              : batchOrRelease === "Indie Artist Release"
                ? <IndependentArtists
                  batchesDropDown={batchesDropDown}
                  cuesLoading={cuesLoading}
                  downloadCompletedChecker={downloadCompletedChecker}
                  inclusive={inclusive}
                  releaseFilter={releaseFilter}
                />
                : batchOrRelease === "Background Instrumental Release"
                  ? <Releases
                    batchesDropDown={batchesDropDown}
                    cuesLoading={cuesLoading}
                    downloadCompletedChecker={downloadCompletedChecker}
                    inclusive={inclusive}
                    releaseFilter={releaseFilter}
                  />
                  : null
          }
        </InfiniteScroll>
      </div>
      <br/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categoriesIA: state.categoriesIA,
    composersIA: state.composersIA,
    downloadProgress: state.downloadProgress,
    cueFetchIsLoading: state.cueFetchIsLoading,
    releasesIA: state.releasesIA,
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    selectedStyles: state.selectedStyles,
    stylesIA: state.stylesIA,
    tracks: state.tracks,
    trackFetchIsLoading: state.trackFetchIsLoading
  };
};

const mapDispatchToProps = {
  handleFetchCuesFromRelease,
  initializeSelectedCategories,
  initializeSelectedComposer,
  initializeSelectedLibrary,
  initializeSelectedReleases,
  initializeSelectedStyles
};


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RightColumn));
