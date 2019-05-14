import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import ATempoExport from '../MetaDataExportFunctions/ReleasesFunctions/A-TempoExport';
import BarakaIAExport from '../MetaDataExportFunctions/IndependentArtistsFunctions/BarakaIAExport';
import GenericIAExport from '../MetaDataExportFunctions/ReleasesFunctions/GIE';
import ModoocomIAExport from '../MetaDataExportFunctions/IndependentArtistsFunctions/ModoocomIAExport';
import PreludioExport from '../MetaDataExportFunctions/ReleasesFunctions/PreludioExport';
import RenameExport from '../MetaDataExportFunctions/BatchesFunctions/RenameExport';
import SoundMinerExport from '../MetaDataExportFunctions/BatchesFunctions/SoundMinerExport';
import TouchIAExport from '../MetaDataExportFunctions/IndependentArtistsFunctions/TouchIAExport';

class IndependentArtists extends React.Component {
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
          <BarakaIAExport
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
          <GenericIAExport
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
          <ModoocomIAExport
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
          <TouchIAExport
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
          <br/>
          <br/>
      </div>
    )
  }
}

export default withRouter(connect()(IndependentArtists));
