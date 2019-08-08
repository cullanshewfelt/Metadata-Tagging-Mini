import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import ATempoExport from "../MetaDataExportFunctions/ReleasesFunctions/A-TempoExport";
import BarakaIAExport from "../MetaDataExportFunctions/IndependentArtistsFunctions/BarakaIAExport";
import GenericIAExport from "../MetaDataExportFunctions/ReleasesFunctions/GenericIAExport";
import ModoocomIAExport from "../MetaDataExportFunctions/IndependentArtistsFunctions/ModoocomIAExport";
import PreludioExport from "../MetaDataExportFunctions/ReleasesFunctions/PreludioExport";
import RenameExport from "../MetaDataExportFunctions/BatchesFunctions/RenameExport";
import SoundMinerExport from "../MetaDataExportFunctions/BatchesFunctions/SoundMinerExport";
import SourceAudioExport from "../MetaDataExportFunctions/BatchesFunctions/SourceAudioExport";
import TouchIAExport from "../MetaDataExportFunctions/IndependentArtistsFunctions/TouchIAExport";

const IndependentArtists = (props) => {
  let { batchesBI, batchesDropDown, cuesLoading, downloadCompletedChecker, inclusive, releaseFilter } = props;
  return (
    <div>
      <ATempoExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <BarakaIAExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <GenericIAExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ModoocomIAExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <PreludioExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <RenameExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        releaseFilter={releaseFilter}
        inclusive={inclusive}
      />
      <br/>
      <SoundMinerExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <SourceAudioExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <TouchIAExport
        cuesLoading={cuesLoading}
        batchesDropDown={batchesDropDown}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <br/>
      <br/>
    </div>
  );};


export default withRouter(connect()(IndependentArtists));
