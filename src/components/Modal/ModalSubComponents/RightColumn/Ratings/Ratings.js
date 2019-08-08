import React, { useEffect, useState } from "react";
import {connect} from "react-redux";
import { clearSearch, handleSearchFilter } from "../../../../../actions/modalActions";
import { handleSelectRating } from "../../../../../actions/ratingsActions";

const Ratings = (props) => {
  let { modal, ratings, handleSelectRating } = props;
  let { selectedCue } = modal; 
  let destructuredRatings = [...ratings];
  let selectedRatings = destructuredRatings.map(rating => {
    return rating.value === selectedCue.cue_rating
      ? {...rating, selected: true}
      : {...rating, selected: false};
  });

  let RenderRatings = () => (
    selectedRatings.map(rating => (
      <div
        id={rating.value}
        key={rating.value}
        className={rating.selected ? "modal-selected" : "modal-select"}
        onClick={() => handleSelectRating(rating)}>{rating.value}
      </div>
    )));

  return(
    <div>
      <RenderRatings/>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modal: state.modal,
    ratings: state.ratings
  };
};

const mapDispatchToProps = {
  handleSelectRating
};

export default connect(mapStateToProps, mapDispatchToProps)(Ratings);
