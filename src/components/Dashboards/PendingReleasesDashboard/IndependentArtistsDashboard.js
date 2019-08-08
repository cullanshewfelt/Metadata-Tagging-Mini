import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { handleToggleModal } from '../../../actions/modalActions';
import Loader from '../../SubComponents/Loader/Loader';

class PendingReleasesDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      limitTo: 10,
      releaseFilter: 147,
      releasesDropDown: [],
      searchQuery: '',
      selectedOption: this.props.selectedLibrary.libraryName
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleDropdownChange = (releaseFilter) => {
    this.setState({releaseFilter})
  }

  loadMore = () => {
    this.setState({limitTo: this.state.limitTo + 10})
  }

  handleSearchChange = (value) => {
    this.setState({searchQuery: value})
  }

  componentDidMount(){
      document.title = 'DL Music | BI Tagging Portal | '
      switch(this.props.selectedLibrary.libraryName){
        case 'background-instrumentals':
          // we reset releaseFilter to it's original state to avoid cues being filtered
          // when we switch libraries
          this.setState({releasesDropDown: this.props.batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147})
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: this.props.releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147})
          break;
        default:
          null
      }
    }

  componentDidUpdate(prevProps, prevState){
    // when our component updates we check to see if the state.selectedOption
    // is the name of the selected library, and then we render the
    // releasesDropDown from that library accodringly
    if(this.state.selectedOption !== this.props.selectedLibrary.libraryName){
      switch(this.props.selectedLibrary.libraryName){
        case 'background-instrumentals':
          this.setState({releasesDropDown: this.props.batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147,})
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: this.props.releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147,})
          break;
        default:
          null;
      }}
  }

  render(){
    const releaseFilter  = this.state.releaseFilter;
    const dashboardHeader = () => {
      switch(this.state.selectedOption){
        case 'background-instrumentals':
          return `Background Instrumentals Dashboard`;
          break;
        case 'independent-artists':
          return `Independent Artists Dashboard`;
          break;
        default:
          return 'Releases: '
      }}

    const libraryHeader = () => {
      switch(this.state.selectedOption){
        case 'background-instrumentals':
          return `${this.state.releaseFilter.label || ''} Background Instrumentals Tracks`;
          break;
        case 'independent-artists':
          return `${this.state.releaseFilter.label || ''} Independent Artists Tracks`;
          break;
        default:
          return 'Releases: '
      }}

    let filteredLibrary = this.state.releaseFilter.label === 'All' ?
      this.props.selectedLibrary.library.filter(cue => cue.cue_status !== 'Pulled')
      : this.props.selectedLibrary.library.filter(cue =>
        this.state.releaseFilter.value ?
          cue.rel_id === this.state.releaseFilter.value
          && cue.cue_status !== 'Pulled'
        : cue.cue_status !== 'Pulled')

    const LoadButton = () => (
      <button className='load-more' onClick={() => {this.loadMore()}}>
        Load More
      </button>
    )
    console.log(112, this.props)
    // const SelectLoader = () => (
    //   this.props.selectedComposers.length !== 0 ? 'Select a Menu To Begin I AM IN PendingReleasesDashboard': <Loader/>
    // )
    console.log(116, this.state)
    filteredLibrary = filteredLibrary.filter(cue => cue.cue_title.toLowerCase().includes(this.state.searchQuery.toLowerCase().trim()));
    // console.log(118, filteredLibrary)
    return(
      <div>
        {<div className='column-wrapper'>
          <div className='dashboard-left-column'>
            <h2>{dashboardHeader()}</h2>
            <h3>Filter Options: </h3>
            <input
              type="text"
              className='search-bar'
              name="searchQuery"
              value={this.state.searchQuery}
              onChange={ e => this.handleSearchChange(e.target.value)}
              placeholder="Search for a track title.."
            />
            <br/>
            <br/>
            <Select
              value={releaseFilter}
              onChange={this.handleDropdownChange}
              options={this.state.releasesDropDown}
              className='release-dropdown'
              placeholder="Select A Release"
            />
            <br/>
          </div>
          <div className='dashboard-right-column'>
            <h2>{libraryHeader()}</h2>
            {/* if the searchQuery does find results, display them */
              filteredLibrary.length !== 0 ? filteredLibrary.filter(cue => cue.cue_title.toLowerCase().includes(this.state.searchQuery.toLowerCase().trim())).slice(0, this.state.limitTo).map(cue =>
                <div
                  onClick={this.props.handleOpenModal}
                  key={cue.cue_id}
                  id={cue.cue_id}
                  className='cue-titles'
                >
                  {cue.cue_title}
                </div>)
                /* else the searchQuery finds no matches in the filteredLibrary and we return an error */
              : <div>Sorry, Your Search Returned No Matches. Please Try Again.</div>
            }
            {/*
              use react-inifite-scroller instead of a LoadButton ????
            */}
            {this.state.limitTo < filteredLibrary.length ? <LoadButton/> : null}
          </div>
        </div>
        }
      </div>
   )}
}

const mapStateToProps = (state) => {
 return {
   batchesBI: state.batchesBI,
   releasesIA: state.releasesIA,
   selectedComposers: state.selectedComposers,
   selectedLibrary: state.selectedLibrary
 };
}


export default connect(mapStateToProps)(PendingReleasesDashboard);
