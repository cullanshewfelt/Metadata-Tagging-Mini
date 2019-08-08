import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import AdRevExport from '../MetaDataExportFunctions/ReleasesFunctions/AdRevExport';
import AlterKExport from '../MetaDataExportFunctions/ReleasesFunctions/AlterKExport';
import ATempoExport from '../MetaDataExportFunctions/ReleasesFunctions/A-TempoExport';
import BarakaBIExport from '../MetaDataExportFunctions/ReleasesFunctions/BarakaBIExport';
import FilmTrackExport from '../MetaDataExportFunctions/ReleasesFunctions/FilmTrackExport';
import GenericBIExport from '../MetaDataExportFunctions/ReleasesFunctions/GenericBIExport';
import ModoocomBIExport from '../MetaDataExportFunctions/ReleasesFunctions/ModoocomBIExport';
import MusicDirectorExport from '../MetaDataExportFunctions/ReleasesFunctions/MusicDirectorExport';
import NBCSoundMinerExport from '../MetaDataExportFunctions/ReleasesFunctions/NBCSoundMinerExport';
import PreludioExport from '../MetaDataExportFunctions/ReleasesFunctions/PreludioExport';
import RenameExport from '../MetaDataExportFunctions/BatchesFunctions/RenameExport';
import SheerExport from '../MetaDataExportFunctions/ReleasesFunctions/SheerExport';
import SoundMinerExport from '../MetaDataExportFunctions/BatchesFunctions/SoundMinerExport';
import SourceAudioExport from '../MetaDataExportFunctions/BatchesFunctions/SourceAudioExport';
import TouchBIExport from '../MetaDataExportFunctions/ReleasesFunctions/TouchBIExport';
import ZinkoExport from '../MetaDataExportFunctions/ReleasesFunctions/ZinkoExport';
import ZinkoSoundMinerExport from '../MetaDataExportFunctions/ReleasesFunctions/ZinkoSoundMinerExport';


const Releases = (props) => {
  let { batchesBI, batchesDropDown, cuesLoading, downloadCompletedChecker, inclusive, releaseFilter } = props;
  return(
    <div>
      <AdRevExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <AlterKExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ATempoExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <BarakaBIExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <FilmTrackExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <GenericBIExport
        cuesLoading={cuesLoading}
        batchesDropDown={batchesDropDown}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ModoocomBIExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <MusicDirectorExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <NBCSoundMinerExport
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
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <SheerExport
        batchesDropDown={batchesDropDown}
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
      <br/>
      <TouchBIExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ZinkoExport
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <ZinkoSoundMinerExport
        batchesDropDown={batchesDropDown}
        cuesLoading={cuesLoading}
        downloadCompletedChecker={downloadCompletedChecker}
        inclusive={inclusive}
        releaseFilter={releaseFilter}
      />
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
  </div>
)}

const mapStateToProps = (state) => {
  return {
    selectedCategories: state.selectedCategories,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedStyles: state.selectedStyles,
    tempos: state.tempos,
  };
}

export default withRouter(connect(mapStateToProps)(Releases));
