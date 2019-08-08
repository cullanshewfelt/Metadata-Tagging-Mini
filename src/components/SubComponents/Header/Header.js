import React from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { initializeSelectedLibrary } from "../../../actions/selectedLibraryActions";
import Logo from "./images/DLM.png";

const Header = (props) => {
  let { initializeSelectedLibrary } = props;

  const handleChooseLibrary = (event) => {
    // the logic behind whether the user requested the BI or IA library
    switch(event.target.id){
    case "background-instrumentals":
      initializeSelectedLibrary([], event.target.id);
      break;
    case "independent-artists":
      initializeSelectedLibrary([], event.target.id);
      break;
    default:
      null;
    }
  };
  const NavBar = () => (
    <div>
      <h3 className='header__subtitle navlink-header'>
        <NavLink id='independent-artists' to='/independent-artists' activeClassName="selected" onClick={(e) => {handleChooseLibrary(e);}}>Independent Artists</NavLink> |
        <NavLink id='exports' to='/exports' activeClassName="selected">Export Metadata </NavLink> |
        <NavLink id='upload-audio' to='/upload-audio' activeClassName="selected">Upload Audio</NavLink> |
        <NavLink id='upload-metadata' to='/upload-metadata' activeClassName="selected">Upload Metadata</NavLink> |
      </h3>
    </div>
  );

  return(
    <div className='header'>
      <div className='container'>
        <h1 className='header__title'>
          <NavLink to ='/' onClick={(e) => {handleChooseLibrary(e);}}>
            <img src={Logo} height='100' alt='DL MUSIC'/>
          </NavLink>
        </h1>
        <NavBar/>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  selectedLibrary: state.selectedLibrary
});

const mapDispatchToProps = {
  initializeSelectedLibrary
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
