import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";

import BmatExport from '../MetaDataExportFunctions/BatchesFunctions/BmatExport';
import ProTunesExport from '../MetaDataExportFunctions/BatchesFunctions/ProTunesExport';
import RenameExport from '../MetaDataExportFunctions/BatchesFunctions/RenameExport';
import SoundMinerExport from '../MetaDataExportFunctions/BatchesFunctions/SoundMinerExport';
import SourceAudioExport from '../MetaDataExportFunctions/BatchesFunctions/SourceAudioExport';


class Batches extends React.Component {
    constructor(props) {
      super(props)
    }
    render(){
      return(
        <div>
          <BmatExport
            batchesDropDown={this.props.batchesDropDown}
            selectedCategories={this.props.selectedCategories}
            downloadCompletedChecker={this.props.downloadCompletedChecker}
            inclusive={this.props.inclusive}
            releaseFilter={this.props.releaseFilter}
            selectedComposers={this.props.selectedComposers}
            selectedLibrary={this.props.selectedLibrary}
            selectedStyles={this.props.selectedStyles}
            tempos={this.props.tempos}
          />
          <br/>
          <ProTunesExport
            batchesBI={this.props.batchesBI}
            selectedCategories={this.props.selectedCategories}
            downloadCompletedChecker={this.props.downloadCompletedChecker}
            inclusive={this.props.inclusive}
            releaseFilter={this.props.releaseFilter}
            selectedComposers={this.props.selectedComposers}
            selectedLibrary={this.props.selectedLibrary}
            selectedStyles={this.props.selectedStyles}
            tempos={this.props.tempos}
          />
          <br/>
          <RenameExport
            downloadCompletedChecker={this.props.downloadCompletedChecker}
            releaseFilter={this.props.releaseFilter}
            inclusive={this.props.inclusive}
            selectedLibrary={this.props.selectedLibrary}
            selectedCategories={this.props.selectedCategories}
            selectedStyles={this.props.selectedStyles}
          />
          <br/>
          <SoundMinerExport
            batchesBI={this.props.batchesBI}
            selectedCategories={this.props.selectedCategories}
            downloadCompletedChecker={this.props.downloadCompletedChecker}
            inclusive={this.props.inclusive}
            releaseFilter={this.props.releaseFilter}
            selectedComposers={this.props.selectedComposers}
            selectedLibrary={this.props.selectedLibrary}
            selectedStyles={this.props.selectedStyles}
            tempos={this.props.tempos}
          />
          <br/>
          <SourceAudioExport
            batchesBI={this.props.batchesBI}
            selectedCategories={this.props.selectedCategories}
            downloadCompletedChecker={this.props.downloadCompletedChecker}
            inclusive={this.props.inclusive}
            releaseFilter={this.props.releaseFilter}
            selectedComposers={this.props.selectedComposers}
            selectedLibrary={this.props.selectedLibrary}
            selectedStyles={this.props.selectedStyles}
            tempos={this.props.tempos}
          />
      </div>
    )
  }
}

export default withRouter(connect()(Batches));
