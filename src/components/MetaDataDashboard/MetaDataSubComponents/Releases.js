import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import AdRevExport from '../MetaDataExportFunctions/ReleasesFunctions/ARE';
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


class Releases extends React.Component {
    constructor(props) {
      super(props)
    }
    render(){
      let batchesDropDown = this.props.batchesDropDown;
      let selectedCategories = this.props.selectedCategories;
      let downloadCompletedChecker = this.props.downloadCompletedChecker;
      let inclusive = this.props.inclusive;
      let releaseFilter = this.props.releaseFilter;
      let selectedComposers = this.props.selectedComposers;
      let selectedLibrary = this.props.selectedLibrary;
      let selectedStyles = this.props.selectedStyles;
      let styles = this.props.selectedStyles;
      let tempos = this.props.tempos;
      return(
        <div>
          <AdRevExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <AlterKExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <ATempoExport
            batchesDropDown={batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <BarakaBIExport
            batchesDropDown={this.props.batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <FilmTrackExport
            batchesDropDown={batchesDropDown}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedCategories={selectedCategories}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <GenericBIExport
            batchesBI={this.props.batchesBI}
            batchesDropDown={batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <ModoocomBIExport
            batchesDropDown={this.props.batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <MusicDirectorExport
            batchesDropDown={this.props.batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <NBCSoundMinerExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <PreludioExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <RenameExport
            downloadCompletedChecker={downloadCompletedChecker}
            releaseFilter={releaseFilter}
            inclusive={inclusive}
            selectedLibrary={selectedLibrary}
            selectedCategories={selectedCategories}
            selectedStyles={selectedStyles}
          />
          <br/>
          <SheerExport
            batchesDropDown={batchesDropDown}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedCategories={selectedCategories}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <SoundMinerExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <SourceAudioExport
            batchesBI={this.props.batchesBI}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <TouchBIExport
            batchesDropDown={this.props.batchesDropDown}
            selectedCategories={selectedCategories}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <ZinkoExport
            batchesBI={this.props.batchesBI}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedCategories={selectedCategories}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
          />
          <br/>
          <ZinkoSoundMinerExport
            batchesDropDown={batchesDropDown}
            downloadCompletedChecker={downloadCompletedChecker}
            inclusive={inclusive}
            releaseFilter={releaseFilter}
            selectedCategories={selectedCategories}
            selectedComposers={selectedComposers}
            selectedLibrary={selectedLibrary}
            selectedStyles={selectedStyles}
            tempos={tempos}
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
    )
  }
}

export default withRouter(connect()(Releases));
