import React from "react";
import {connect} from "react-redux";
import { handleSelectStyle } from "../../../../../actions/selectedStylesActions";

const Styles = (props) => {
  let { modal, handleSelectStyle, selectedStyles } = props;
  let selectedCue = modal.selectedCue;
  // **********************************************************************************************************
  // STYLES FUNCTIONS
  // **********************************************************************************************************
  // filter styles to only show styles matching the selected category
  let catStyles = selectedStyles.filter(style => style.cat_id === selectedCue.cat_id);

  catStyles = catStyles.map(style => {
    return style.style_id === selectedCue.style_id
      ? { ...style, selected: true }
      : { ...style, selected: false };
  });

  // -------------------------------------------------------------------------------------------------------------
  const RenderStyles = () => {
    if(selectedCue.cat_id !== 19){ // checks to see if the category is selected or not
      // and we return the div with className with corresponding SASS.
      let stylesDivs = catStyles.map(style =>
        <div key={`${style.style_name} - ${style.style_id}`}
          className={style.selected ? "modal-selected" : "modal-select"}
          id={style.style_id}
          onClick={() => handleSelectStyle(style)}>
          {style.style_name}
        </div>
      );
      // add some empty rows to force push data into margins
      for(let x = 0; x < 5; x++){
        stylesDivs.push(<div className='blank-divs' key={`blank-${x}`}>Blank</div>);
      }
      return stylesDivs;
    } else { // if there is no category for the selected cue, display an error message
      return (
        <div>Please Select A Category First</div>
      );
    }
  };
  // -------------------------------------------------------------------------------------------------------------
  return(
    <RenderStyles/>
  );
};

const mapStateToProps = (state) => ({
  modal: state.modal,
  selectedStyles: state.selectedStyles,
  styleLink: state.styleLink
});

const mapDispatchToProps = {
  handleSelectStyle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Styles);
