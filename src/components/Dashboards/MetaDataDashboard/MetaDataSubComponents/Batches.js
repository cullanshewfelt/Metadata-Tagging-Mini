import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

import BmatExport from "../MetaDataExportFunctions/BatchesFunctions/BmatExport";
import ProTunesExport from "../MetaDataExportFunctions/BatchesFunctions/ProTunesExport";
import RenameExport from "../MetaDataExportFunctions/BatchesFunctions/RenameExport";
import SoundMinerExport from "../MetaDataExportFunctions/BatchesFunctions/SoundMinerExport";
import SourceAudioExport from "../MetaDataExportFunctions/BatchesFunctions/SourceAudioExport";

const Batches = (props) => {

  let { batchesDropDown, cuesLoading, downloadCompletedChecker, inclusive, releaseFilter } = props;

  return(
    <div>
      <BmatExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ProTunesExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <RenameExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
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
    </div>
  );};

export default withRouter(connect()(Batches));
