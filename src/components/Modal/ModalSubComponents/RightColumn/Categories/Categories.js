import React, { useEffect } from "react";
import {connect} from "react-redux";
import { handleSelectCategory } from "../../../../../actions/selectedCategoriesActions";

const Categories = (props) => {
  // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************
  const { catLink, modal, selectedCategories, handleSelectCategory } = props;
  const selectedCue = modal.selectedCue;

  const allCategories = selectedCategories.map(category => {
    return category.cat_id === selectedCue.cat_id
      ? { ...category, selected: true }
      : { ...category, selected: false };
  });

  const RenderCategories = () => {
    return allCategories.map(category =>
      <div
        key={`${category.cat_name} - ${category.cat_id}`}
        className={category.selected ? "modal-selected" : "modal-select"}
        id={category.cat_id}
        onClick={() => handleSelectCategory(category)}>
        {category.cat_name}
      </div>
    );
  };

  return (
    <RenderCategories/>
  );
};

const mapStateToProps = (state) => {
  return {
    catLink: state.catLink,
    modal: state.modal,
    selectedCategories: state.selectedCategories
  };
};

const mapDispatchToProps = {
  handleSelectCategory
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
