import React from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { handleToggleModal } from '../../../actions/modalActions';
import Loader from '../../SubComponents/Loader/Loader';
import InfiniteScroll from 'react-infinite-scroll-component';

import { handleFetchCuesFromRelease } from '../../../actions/selectedReleasesActions';
import { initializeSelectedCategories } from '../../../actions/selectedCategoriesActions';
import { initializeSelectedInstruments } from '../../../actions/selectedInstrumentsActions';
import { initializeSelectedKeywords } from '../../../actions/selectedKeywordsActions';
import { initializeSelectedMasterKeywords } from '../../../actions/selectedMasterKeysActions';
import { initializeSelectedStyles } from '../../../actions/selectedStylesActions';

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
    this.setState({releaseFilter: releaseFilter});
    this.props.handleFetchCuesFromRelease(releaseFilter.value);
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
            initializeSelectedKeywords, initializeSelectedMasterKeywords, initializeSelectedStyles, instrumentsBI, instrumentsIA,
            keywordsBI, keywordsIA, masterKeywordsBI, masterKeywordsIA, releasesIA, selectedLibrary, stylesBI, stylesIA
          } = this.props;

      switch(selectedLibrary.libraryName){
        case 'background-instrumentals':
          // we reset releaseFilter to it's original state to avoid cues being filtered
          // when we switch libraries
          this.setState({releasesDropDown: batchesBI.map(rel => {
            return { value: rel.rel_id, label: rel.rel_num }
          }), selectedOption: 'background-instrumentals'})
          initializeSelectedCategories(categoriesBI);
          initializeSelectedInstruments(instrumentsBI);
          initializeSelectedKeywords(keywordsBI);
          initializeSelectedMasterKeywords(masterKeywordsBI);
          initializeSelectedStyles(stylesBI);
          break;
        case 'independent-artists':
          this.setState({releasesDropDown: releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists'})
          initializeSelectedCategories(categoriesIA);
          initializeSelectedInstruments(instrumentsIA);
          initializeSelectedKeywords(keywordsIA);
          initializeSelectedMasterKeywords(masterKeywordsIA);
          initializeSelectedStyles(stylesIA);
          break;
        default:
          null
      }
    }

  componentDidUpdate(prevProps, prevState){
    let { batchesBI, categoriesBI, categoriesIA, initializeSelectedCategories, initializeSelectedInstruments,
          initializeSelectedKeywords, initializeSelectedMasterKeywords,
          initializeSelectedStyles, instrumentsBI, instrumentsIA, keywordsBI, keywordsIA,
          masterKeywordsBI, masterKeywordsIA, releasesIA, selectedLibrary, stylesBI, stylesIA
        } = this.props; // destructuring props

    // when our component updates we check to see if the state.selectedOption
    // is the name of the selected library, and then we render the
    // releasesDropDown from that library accodringly
    if(this.state.selectedOption !== selectedLibrary.libraryName){
      this.scrollToTop(); // scrolls to top when we switch libraries
      switch(selectedLibrary.libraryName){
        case 'background-instrumentals':
          this.setState({keywordSearchQuery: '', titleSearchQuery: '', limitTo: 14, releasesDropDown: batchesBI.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'background-instrumentals', releaseFilter: 147})
          initializeSelectedCategories(categoriesBI);
          initializeSelectedInstruments(instrumentsBI);
          initializeSelectedKeywords(keywordsBI);
          initializeSelectedMasterKeywords(masterKeywordsBI);
          initializeSelectedStyles(stylesBI);
          break;
        case 'independent-artists':
          this.setState({keywordSearchQuery: '', titleSearchQuery: '', limitTo: 14, releasesDropDown: releasesIA.map(rel => {
            return {value: rel.rel_id, label: rel.rel_num}
          }), selectedOption: 'independent-artists', releaseFilter: 147})
          initializeSelectedCategories(categoriesIA);
          initializeSelectedInstruments(instrumentsIA);
          initializeSelectedKeywords(keywordsIA);
          initializeSelectedMasterKeywords(masterKeywordsIA);
          initializeSelectedStyles(stylesIA);
          break;
        default:
          null;
      }
    }
  }

  render(){
    let { hasMore, keywordSearchQuery, limitTo, releaseFilter,
          releasesDropDown, selectedOption, titleSearchQuery } = this.state;

    let { cueFetchIsLoading, selectedKeywords, selectedLibrary, selectedMasterKeywords } = this.props;

    let keywordSearchArray = keywordSearchQuery.split(' ');
    let titleSearchArray = titleSearchQuery.split(' ');

    let isQuery = keywordSearchQuery !== '' || titleSearchQuery !== '';

    document.title = this.props.selectedLibrary.libraryName === 'background-instrumentals'
      ? 'DL Music | BI Tagging Portal | '
      : this.props.selectedLibrary.libraryName === "independent-artists"
      ? 'DL Music | IA Tagging Portal | '
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

    let filteredLibrary = selectedLibrary.library;

    let regexExclude = /(^|\s)?!{1}\w+($|\s)/; // removed global and multiline modifiers
    let titleExclusions = [];
    let titleMatches = [];

    // console.log(180, 'titleSearchQuery', titleSearchQuery)
    // console.log(181, 'titleSearchArray', titleSearchArray)

    titleSearchQuery.includes('!')
    ? titleSearchArray.forEach((query) => {
        // console.log(185, 'regexExclude.test(query)', regexExclude.test(query))
        query !== '' & query.length > 2 &&
          regexExclude.test(query) // if query contains ! (exclude)
          ? titleExclusions.push(query.trim().substring(1))
          : titleMatches.push(query.trim())
      })
    // this filter checks the titleSearchQuery against cue_titles for matches
    : filteredLibrary = this.props.selectedLibrary.library.filter(cue =>
        cue.cue_title.toLowerCase().includes(titleSearchQuery.toLowerCase().trim()));

    let titleFilteredLibrary = [];

    // console.log(197, 'titleMatches', titleMatches);
    // console.log(198, 'titleExclusions', titleExclusions);

    (titleMatches.length !== 0 || titleExclusions.length !== 0) // this filter takes titleMatches & searches through the key_id_arry
    &&  titleFilteredLibrary.push(filteredLibrary.filter(cue => {
          return titleMatches.every(match => { // as of now, will only return results if ALL keywords match
            return match !== undefined &&
            cue.cue_title.toLowerCase().trim().includes(match.toLowerCase().trim());
          })
        }).filter(cue => {
          return titleExclusions.every(match => { // follow logic above, filter library through EXCLUSIVE keywords
            return match !== undefined &&
            !cue.cue_title.toLowerCase().trim().includes(match.toLowerCase().trim());
          })
        }))

    // if titleFilter has matches, set filteredLibrary to them, otherwise just use filteredLibrary
    filteredLibrary = titleFilteredLibrary.length !== 0 ? titleFilteredLibrary.flat() : filteredLibrary;

    let keywordMatches = [];
    let excludedKeywords = [];

    keywordSearchArray.forEach((query) => {
      // setting condition of query.length > 2 so that it doesn't hide all the results immeadiately when the user begins typing something
      !query.includes('!') // if the query doesn't contain !
      ? query !== '' & query.length > 2  &&
        keywordMatches.push(selectedMasterKeywords.find(keywords => {
          return keywords.key_name.toLowerCase() === query.toLowerCase()
        }))
      : query !== '' & query.length > 2  && // else if the query contains a !
        excludedKeywords.push(selectedMasterKeywords.find(keywords => { // push into excludedKeywords
          return keywords.key_name.toLowerCase() === query.substring(1).toLowerCase() // substring to remove !
        }))
    })

    // console.log(234, 'keywordMatches', keywordMatches);
    // console.log(235, 'excludedKeywords', excludedKeywords);

    let tempLibrary = [];

    (keywordMatches.length !== 0 || excludedKeywords.length !== 0) // this filter takes keywordMatches & searches through the key_id_arry
    &&  tempLibrary.push(filteredLibrary.filter(cue => {
          return keywordMatches.every(match => { // as of now, will only return results if ALL keywords match
            return match !== undefined &&
            cue.key_id_arry.includes(`${match.key_id}`)})
        }).filter(cue => {
          // filter out EXCLUSIVE keywords
          return excludedKeywords.every(match => {
            return match !== undefined &&
            !cue.key_id_arry.includes(`${match.key_id}`)})
        }))

    // ---------------------------------------------------------------------------------------------------------------------------------
    // creates a set of the filtered library searchQuery in key_id_arry since they might return the same song more than once
    let setLibrary = new Set( (keywordMatches.length !== 0 || excludedKeywords.length !== 0) // if there is a search query
      ? [].concat(...tempLibrary).sort((x, y) => // this filter will make the higher rated tracks appear first
            x.cue_rating > y.cue_rating ? -1 : x.cue_rating < y.cue_rating ? 1 : 0
          ) // if there is no search query just return the full filtered library
      : filteredLibrary);
      let setLibraryArray = [...setLibrary];
    // ---------------------------------------------------------------------------------------------------------------------------------
    let trackItems = [];

    // spread the setLibrary to an array
    setLibraryArray.slice(0, limitTo).map(cue =>
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
    if(setLibraryArray.length > 10){
      for(let x = 0; x < 5; x++){ // add some empty rows to force push data into margins
        trackItems.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>)
      }
    }

    let ResultsMessage = () => (
      isQuery === true && releaseFilter !== 147
      ?  <div>Sorry, Your Search Returned No Matches. Please Try Again.</div>
      :  <div>Select A Release From The Left</div>
    )

    const cuesFound = setLibraryArray.length;
    const nonActive = setLibraryArray.filter(cues => cues.cue_status !== 'Active').length;
    const activeCuesFound = cuesFound - nonActive;

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
          </div>
          <div className='dashboard-right-column'>
            <h2 className='dashboard-header'>Cues Found:
              { (setLibraryArray.length === 0 && releaseFilter === 147)
                || (setLibraryArray.length === 0 && isQuery === true)
                || (cueFetchIsLoading === false && setLibraryArray.length !== 0)
                  ? ` ${cuesFound} (${activeCuesFound ? activeCuesFound + ' Active' : '-'})`
                  : ' Loading...'}
            </h2>
            {/* if the titleSearchQuery does find results, display them */
              cuesFound !== 0
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
                : (setLibraryArray.length === 0 && isQuery === false && releaseFilter !== 147)
                  || cueFetchIsLoading
                ? <Loader/>
                : <ResultsMessage/>
            }
          </div>
        </div>
        }
      </div>
   )}
}

const mapStateToProps = (state) => ({
   batchesBI: state.batchesBI,
   categoriesBI: state.categoriesBI,
   categoriesIA: state.categoriesIA,
   cueFetchIsLoading: state.cueFetchIsLoading,
   instrumentsBI: state.instrumentsBI,
   instrumentsIA: state.instrumentsIA,
   keywordsBI: state.keywordsBI,
   keywordsIA: state.keywordsIA,
   masterKeywordsBI: state.masterKeywordsBI,
   masterKeywordsIA: state.masterKeywordsIA,
   releasesIA: state.releasesIA,
   selectedCategories: state.selectedCategories,
   selectedComposers: state.selectedComposers,
   selectedKeywords: state.selectedKeywords,
   selectedLibrary: state.selectedLibrary,
   selectedMasterKeywords: state.selectedMasterKeywords,
   selectedStyles: state.selectedStyles,
   stylesBI: state.stylesBI,
   stylesIA: state.stylesIA
})

const mapDispatchToProps = {
  handleFetchCuesFromRelease,
  initializeSelectedCategories,
  initializeSelectedInstruments,
  initializeSelectedKeywords,
  initializeSelectedMasterKeywords,
  initializeSelectedStyles
}


export default connect(mapStateToProps, mapDispatchToProps)(PendingReleasesDashboard);
