import React from 'react';
import { connect } from 'react-redux';
import {NavLink} from 'react-router-dom';
import Loader from './Loader';
import { initializeSelectedLibrary } from '../../actions/selectedLibraryActions';
import { initializeSelectedComposer } from '../../actions/selectedComposerActions';

const Header = (props) => {
  let { composersIA, initializeSelectedComposer, initializeSelectedLibrary, tracks } = props;
  const handleChooseLibrary = (event) => {
    // this function handles all of our 'selected' functions, basically the logic
    // behind whether the user requested BI or AI tracks
    switch(event.target.id){
      case 'independent-artists':
        initializeSelectedLibrary(tracks, event.target.id);
        initializeSelectedComposer(composersIA)
        break;
      default:
        initializeSelectedLibrary(tracks, event.target.id);
        initializeSelectedComposer(composersIA)
        break;
    }
  }
  const NavBar = () => (
    <div>
      <h2 className='header__subtitle navlink-header'>
        <NavLink id='independent-artists' to='/independent-artists' activeClassName="selected" onClick={(e) => {handleChooseLibrary(e)}}>Independent Artists</NavLink> |
        <NavLink id='exports' to='/exports' activeClassName="selected">Export Metadata </NavLink> |
      </h2>
    </div>
  )
  return(
    <div className='header'>
      <div className='container'>
        <h1 className='header__title'><NavLink to ='/' onClick={(e) => {handleChooseLibrary(e)}}>DL Music Admin Portal</NavLink></h1>
        {/* conditionally render NavBar once selectedComposers finishes loading from our API,
        because it data structure in our state with the most data in it */}
        { props.selectedComposers.length === 0 && props.selectedLibrary.library.length === 0
          ? <Loader/> : <NavBar/>}
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    composersIA: state.composersIA,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    tracks: state.tracks
  }
}

const mapDispatchToProps = {
  initializeSelectedLibrary,
  initializeSelectedComposer
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
