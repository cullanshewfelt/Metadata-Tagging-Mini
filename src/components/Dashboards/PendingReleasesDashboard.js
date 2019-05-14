import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { toggleModal } from '../../actions/modalActions';
import Loader from '../SubComponents/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

import { initializeSelectedCategories } from '../../actions/selectedCategoriesActions';
import { initializeSelectedInstruments } from '../../actions/selectedInstrumentsActions';
import { initializeSelectedKeywords } from '../../actions/selectedKeywordsActions';
import { initializeSelectedStyles } from '../../actions/selectedStylesActions';

class PendingReleasesDashboard extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      hasMore: true,
      keywordSearchQuery: '',
      limitTo: 14,
      releaseFilter: 147,
      releasesDropDown: [],
      selectedOption: this.props.selectedLibrary.libraryName,
      titleSearchQuery: ''
    }
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
    this.handleTitleSearch = this.handleTitleSearch.bind(this);
  }

  handleDropdownChange = (releaseFilter) => {
    this.scrollToTop();
    this.setState({releaseFilter})
  }

  handleKeywordSearch = (value) => {
    this.scrollToTop();
    this.setState({keywordSearchQuery: value})
  }

  handleTitleSearch = (value) => {
    this.scrollToTop();
    this.setState({titleSearchQuery: value})
  }

  loadMore = () => {
    this.setState({limitTo: this.state.limitTo + 14})
  }

  scrollToTop = () => {
    const div = document.getElementsByClassName('scrollableDiv')[0];
    div ? div.scrollTop = 0 : null;
  }

  componentDidMount(){
      let { batchesBI, categoriesBI, categoriesIA, initializeSelectedCategories, initializeSelectedInstruments,
            initializeSelectedKeywords, initializeSelectedStyles, instrumentsBI, instrumentsIA, keywordsBI, keywordsIA,
            releasesIA, selectedLibrary, stylesBI, stylesIA
          } = this.props; // destructuring props

      switch(selectedLibrary.libraryName){
        case 'background-instrumentals':
          // we reset releaseFilter to it's original state to avoid cues being filtered
          // when we switch libraries
          this.setState({releasesDropDown: batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147})
          initializeSelectedCategories(categoriesBI);
          initializeSelectedInstruments(instrumentsBI);
          initializeSelectedKeywords(keywordsBI);
          initializeSelectedStyles(stylesBI);
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147})
          initializeSelectedCategories(categoriesIA);
          initializeSelectedInstruments(instrumentsIA);
          initializeSelectedKeywords(keywordsIA);
          initializeSelectedStyles(stylesIA);
          break;
        default:
          null
      }
    }

  componentDidUpdate(prevProps, prevState){
    let { batchesBI, categoriesBI, categoriesIA, initializeSelectedCategories, initializeSelectedInstruments,
          initializeSelectedKeywords, initializeSelectedStyles, instrumentsBI, instrumentsIA, keywordsBI, keywordsIA,
          releasesIA, selectedLibrary, stylesBI, stylesIA
        } = this.props; // destructuring props

    // when our component updates we check to see if the state.selectedOption
    // is the name of the selected library, and then we render the
    // releasesDropDown from that library accodringly
    if(this.state.selectedOption !== selectedLibrary.libraryName){
      switch(selectedLibrary.libraryName){
        case 'background-instrumentals':
          this.setState({releasesDropDown: batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147,})
          initializeSelectedCategories(categoriesBI);
          initializeSelectedInstruments(instrumentsBI);
          initializeSelectedKeywords(keywordsBI);
          initializeSelectedStyles(stylesBI);
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147,})
          initializeSelectedCategories(categoriesIA);
          initializeSelectedInstruments(instrumentsIA);
          initializeSelectedKeywords(keywordsIA);
          initializeSelectedStyles(stylesIA);
          break;
        default:
          null;
      }}
  }

  render(){
    let { hasMore, keywordSearchQuery, limitTo, releaseFilter,
          releasesDropDown, selectedOption, titleSearchQuery } = this.state;

    document.title = this.props.selectedLibrary.libraryName === 'background-instrumentals'
      ? 'DL Music | Library | '
      : this.props.selectedLibrary.libraryName === 'independent-artists'
      ? 'DL Music | Library | '
      : null;

    // -------------------------------------------------------------------------------------------------------------

    const dashboardHeader = () => {
      switch(selectedOption){
        case 'background-instrumentals':
          return `Background Instrumentals Dashboard`;
          break;
        case 'independent-artists':
          return `Independent Artists Dashboard`;
          break;
        default:
          return 'Releases: '
      }}
      // ---------------------------------------------------------------------------------------------------------------------------------

    const libraryHeader = () => {
      switch(selectedOption){
        case 'background-instrumentals':
          return `${releaseFilter.label || ''} Background Instrumentals Tracks`;
          break;
        case 'independent-artists':
          return `${releaseFilter.label || ''} Independent Artists Tracks`;
          break;
        default:
          return 'Releases: '
      }}
      // ---------------------------------------------------------------------------------------------------------------------------------

    // this first filter will pull all active tracks with the proper release_id, or All tracks if inclusive is selected
    let filteredLibrary = releaseFilter.label === 'All' ?
      this.props.selectedLibrary.library.filter(cue => cue.cue_status !== 'Pulled')
      : this.props.selectedLibrary.library.filter(cue =>
        releaseFilter.value ?
          cue.rel_id === releaseFilter.value
          && cue.cue_status !== 'Pulled'
        : cue.cue_status !== 'Pulled')

    // ---------------------------------------------------------------------------------------------------------------------------------

    filteredLibrary = filteredLibrary.filter(cue => // this filter checks the titleSearchQuery against cue_titles for matches
      cue.cue_title.toLowerCase().includes(titleSearchQuery.toLowerCase().trim()));

    // ---------------------------------------------------------------------------------------------------------------------------------
    // creates a set of the filtered library searchQuery in cue_desc, sounds like, since they might return the same song more than once
    let setLibrary = new Set( keywordSearchQuery !== '' // if there is a search query
      ? filteredLibrary.filter(cue => // this filter takes the users input & searches through the cue descriptions
          cue.cue_desc.toLowerCase().includes(keywordSearchQuery.toLowerCase().trim())
        ).concat(filteredLibrary.filter(cue => // this filter takes the users input & searches through the cue's sounds_like_composer_edit
            cue.sounds_like_composer_edit
              ? cue.sounds_like_composer_edit.toLowerCase().includes(keywordSearchQuery.toLowerCase().trim())
              : null
            )
          ).concat(filteredLibrary.filter(cue => // this filter takes the users input & searches through the cue's sounds_like_film_edit
              cue.sounds_like_film_edit
                ? cue.sounds_like_film_edit.toLowerCase().includes(keywordSearchQuery.toLowerCase().trim())
                : null
              )
            ).concat(filteredLibrary.filter(cue => // this filter takes the users input & searches through the cue's sounds_like_band_edit
                cue.sounds_like_band_edit
                  ? cue.sounds_like_band_edit.toLowerCase().includes(keywordSearchQuery.toLowerCase().trim())
                  : null
                )
              ).sort((x, y) => // this filter will make the higher rated tracks appear first
            x.cue_rating > y.cue_rating ? -1 : x.cue_rating < y.cue_rating ? 1 : 0
        ) // if there is no search query just return the full filtered library
      : filteredLibrary);
    // ---------------------------------------------------------------------------------------------------------------------------------
    let trackItems = [];
    // spread the setLibrary to an array
    [...setLibrary].slice(0, limitTo).map(cue =>
      trackItems.push(  // and push its data into a div for the infinite scoller
      <div
        onClick={this.props.handleOpenModal}
        key={cue.cue_id}
        id={cue.cue_id}
        className='cue-titles'
      >
        {cue.cue_title}
      </div>)
    )
    if([...setLibrary].length > 5){
      for(let x = 0; x < 10; x++){ // add some empty rows to force push data into margins
        trackItems.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
      }
    }
    return(
      <div>
        {<div className='column-wrapper'>
          <div className='dashboard-left-column'>
            <h2 className='dashboard-header'>{dashboardHeader()}</h2>
            <h3>Filter Options: </h3>
            <input
              autoFocus // auto focus this search bar, and also focus onClick
              className='search-bar'
              id='keywordSearchQuery'
              name="keywordSearchQuery"
              onChange={ e => this.handleKeywordSearch(e.target.value)}
              onClick={() => {document.getElementById('keywordSearchQuery') && document.getElementById('keywordSearchQuery').focus()}}
              placeholder="Search for keywords.."
              type="text"
              value={keywordSearchQuery}
            />
            <br/>
            <br/>
            <input // focuses onClick
              className='search-bar'
              id='titleSearchQuery'
              name="titleSearchQuery"
              onChange={ e => this.handleTitleSearch(e.target.value)}
              onClick={() => {document.getElementById('titleSearchQuery') && document.getElementById('titleSearchQuery').focus()}}
              placeholder="Search for a track title.."
              type="text"
              value={titleSearchQuery}
            />
            <br/>
            <br/>
            <Select
              value={releaseFilter}
              onChange={this.handleDropdownChange}
              options={releasesDropDown}
              className='release-dropdown'
              placeholder="Select A Release"
            />
            <br/>
            <br/>
            This app is designed to tag metadata of audio files.
            <br/>
            Songs <strong><u>WILL AUTOPLAY</u></strong> when clicked.
          </div>
          <div className='dashboard-right-column'>
            <h2 className='dashboard-header'>{libraryHeader()}</h2>
            {/* if the titleSearchQuery does find results, display them */
              [...setLibrary].length !== 0
                ?
                  <InfiniteScroll
                    id='scrollableDiv'
                    className='scrollableDiv'
                    dataLength={limitTo}
                    next={this.loadMore}
                    height={520}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                      <p style={{textAlign: 'center'}}>
                        <b>End Of Results</b>
                      </p>
                    }
                  >
                  {trackItems}
                </InfiniteScroll>
                : <div>Sorry, Your Search Returned No Matches. Please Try Again.</div>
            }
          </div>
        </div>
        }
      </div>
   )}
}

const mapStateToProps = (state) => {
 return {
   batchesBI: state.batchesBI,
   categoriesBI: state.categoriesBI,
   categoriesIA: state.categoriesIA,
   instrumentsBI: state.instrumentsBI,
   instrumentsIA: state.instrumentsIA,
   keywordsBI: state.keywordsBI,
   keywordsIA: state.keywordsIA,
   releasesIA: state.releasesIA,
   selectedCategories: state.selectedCategories,
   selectedComposers: state.selectedComposers,
   selectedLibrary: state.selectedLibrary,
   selectedStyles: state.selectedStyles,
   stylesBI: state.stylesBI,
   stylesIA: state.stylesIA
 };
}

const mapDispatchToProps = {
  initializeSelectedCategories,
  initializeSelectedInstruments,
  initializeSelectedKeywords,
  initializeSelectedStyles
}


export default connect(mapStateToProps, mapDispatchToProps)(PendingReleasesDashboard);
