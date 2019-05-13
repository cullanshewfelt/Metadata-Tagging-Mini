(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(118);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(119);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(120);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(13);
/* harmony import */ var _LeftColumn__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(377);
/* harmony import */ var _RightColumn__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(378);
/* harmony import */ var _TextBox__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(379);
/* harmony import */ var _actions_modalActions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(62);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_instrumentsActions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(69);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_keywordsActions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(70);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_temposActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_cuesActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(68);


















var ModalContent =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(ModalContent, _React$Component);

  function ModalContent(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1___default()(this, ModalContent);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4___default()(ModalContent).call(this, props));

    _this.copyFromV1 = function () {
      var modal = _this.props.modal;
      var selectedCue = _this.props.modal.selectedCue;
      var allCues = _this.props.cues;
      var allMasters = _this.props.BImasterIDs; // our regex expression checks to see if 'v#' exists in the title of the track

      var regex = /v\d{1,2}/g;

      if (regex.test(selectedCue.cue_title)) {
        // if there are multiple versions of the track
        // find all of the versions of that track
        allMasters.filter(function (x) {
          return x.cue_id === selectedCue.cue_id;
        }).map(function (y) {
          // in the cues array, find the corresponding master id
          allCues.filter(function (cue) {
            return cue.cue_id === y.master_cue_id;
          }).map(function (masterTrack) {
            // using object destructuring, set the metadata of the current (v>1) updated cue
            // to the master track (v1) metadata of that cue, overriding (or rather keeping)
            // it's unique identifying values (name, id, duration)
            var updatedCue = _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_0___default()({}, masterTrack, {
              cue_id: selectedCue.cue_id,
              cue_title: selectedCue.cue_title,
              cue_duration: selectedCue.cue_duration,
              cue_duration_sec: selectedCue.cue_duration_sec,
              cue_status: selectedCue.cue_status
            });

            _this.props.updateData(_this.props.modal, updatedCue);

            _this.props.updateCues(updatedCue, _this.props.cues);
          });
        });
      }
    };

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2___default()(ModalContent, [{
    key: "render",
    // **********************************************************************************************************
    // RENDER JSX
    // **********************************************************************************************************
    value: function render() {
      var _this2 = this;

      // console.log(59, this.props)
      var modal = this.props.modal;
      var selectedCue = this.props.modal.selectedCue; // regex checks to see if v# appears anywhere in the track title

      var regex = /v\d{1,2}/g;
      var copyV1Button = regex.test(selectedCue.cue_title) ? react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        onClick: this.copyFromV1
      }, "Copy From V1") : null;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", null, copyV1Button, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("button", {
        className: "save-button",
        onClick: function onClick() {
          _this2.props.handleSave();
        }
      }, "Save"), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "title",
        id: modal.selectedCueId
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("strong", null, "You Are Editing Metadata For The Cue: "), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("br", null), modal.selectedCue.cue_title), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("div", {
        className: "column-wrapper"
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_LeftColumn__WEBPACK_IMPORTED_MODULE_8__["default"], null), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_RightColumn__WEBPACK_IMPORTED_MODULE_9__["default"], null)));
    }
  }]);

  return ModalContent;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    cues: state.cues,
    BImasterIDs: state.BImasterIDs,
    modal: state.modal,
    selectedLibrary: state.selectedLibrary
  };
};

var mapDispatchToProps = {
  save: _actions_modalActions__WEBPACK_IMPORTED_MODULE_11__["save"],
  updateCues: _actions_BackgroundInstrumentalsActions_cuesActions__WEBPACK_IMPORTED_MODULE_15__["updateCues"],
  updateData: _actions_modalActions__WEBPACK_IMPORTED_MODULE_11__["updateData"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_7__["connect"])(mapStateToProps, mapDispatchToProps)(ModalContent));

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(118);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(119);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62);








 // this is a stateless functional component

var LeftColumn =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(LeftColumn, _React$Component);

  function LeftColumn(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, LeftColumn);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(LeftColumn).call(this, props));

    _this.handleShowCategories = function () {
      _this.props.showCategories(_this.props.modal);
    };

    _this.handleShowStyles = function () {
      _this.props.showStyles(_this.props.modal);

      if (document.getElementById('search-filter')) {
        document.getElementById('search-filter').value = '';
      }
    };

    _this.handleShowInstruments = function () {
      _this.props.showInstruments(_this.props.modal);

      if (document.getElementById('search-filter')) {
        document.getElementById('search-filter').value = '';
      }
    };

    _this.handleShowKeywords = function () {
      _this.props.showKeywords(_this.props.modal);

      if (document.getElementById('search-filter')) {
        document.getElementById('search-filter').value = '';
      }
    };

    _this.handleShowTempos = function () {
      _this.props.showTempos(_this.props.modal);
    };

    _this.handleShowRating = function () {
      _this.props.showRatings(_this.props.modal);
    };

    _this.handleShowTextBox = function () {
      _this.props.showTextBox(_this.props.modal, event.target.getAttribute('texttype'));
    };

    return _this;
  } // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(LeftColumn, [{
    key: "render",
    value: function render() {
      var modal = this.props.modal;
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "modal-left-column"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Cue ID:"), " ", modal.selectedCue ? modal.selectedCue.cue_id : null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Duration:"), " ", modal.selectedCue.cue_duration, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Catalog Name:"), " Background Instrumentals", react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Status:"), " ", modal.selectedCue ? modal.selectedCue.cue_status : null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowCategories
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Category:"), " ", this.props.categories ? this.props.categories.filter(function (category) {
        return category.cat_id === modal.selectedCue.cat_id;
      }).map(function (obj) {
        return obj.cat_name;
      }) : null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowStyles
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Style: "), " ", this.props.styles ? this.props.styles.filter(function (style) {
        return style.style_id === modal.selectedCue.style_id;
      }).map(function (obj) {
        return obj.style_name;
      }) : null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Composer(s): "), " ", modal.selectedComposer.length === 1 ? modal.selectedComposer.map(function (composer, i) {
        return "".concat(composer.composer_name, " (").concat(composer.pro_name, ") ").concat(composer.composer_split, "%");
      }) : modal.selectedComposer.map(function (composer, i) {
        return "".concat(composer.composer_name, " (").concat(composer.pro_name, ") ").concat(composer.composer_split, "%  ").concat(String.fromCodePoint(183), " ");
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Publisher(s): "), " ", modal.selectedComposer.length === 1 ? modal.selectedComposer.map(function (composer, i) {
        return "".concat(composer.publisher_name, " 100%");
      }) : modal.selectedComposer.map(function (composer, i) {
        return "".concat(composer.publisher_name, " ").concat(100 / modal.selectedComposer.length, "% ").concat(String.fromCodePoint(183), "  ");
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowInstruments
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Instruments: "), " ", modal.selectedCue.cue_instrus), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowKeywords
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Keywords: "), " ", modal.selectedCue.cue_desc), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowTempos
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Tempo: "), " ", this.props.tempos.filter(function (tempo) {
        return tempo.tempo_id === modal.selectedCue.tempo_id;
      }).map(function (obj) {
        return obj.tempo_name;
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowRating
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Rating: "), " ", modal.selectedCue.cue_rating), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowTextBox,
        texttype: "sounds_like_band_edit"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", {
        texttype: "sounds_like_band_edit"
      }, "Sounds Like Band: "), " ", modal.selectedCue.sounds_like_band_edit), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowTextBox,
        texttype: "sounds_like_film_edit"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", {
        texttype: "sounds_like_film_edit"
      }, "Sounds Like Film/TV: "), " ", modal.selectedCue.sounds_like_film_edit), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "select",
        onClick: this.handleShowTextBox,
        texttype: "sounds_like_composer_edit"
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", {
        texttype: "sounds_like_composer_edit"
      }, "Sounds Like Composer: "), " ", modal.selectedCue.sounds_like_composer_edit));
    }
  }]);

  return LeftColumn;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    categories: state.categories,
    composersBI: state.composersBI,
    cues: state.cues,
    instrumentsBI: state.instrumentsBI,
    keywordsBI: state.keywordsBI,
    modal: state.modal,
    ratings: state.ratings,
    styles: state.styles,
    tempos: state.tempos
  };
};

var mapDispatchToProps = {
  showCategories: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showCategories"],
  showInstruments: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showInstruments"],
  showKeywords: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showKeywords"],
  showRatings: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showRatings"],
  showStyles: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showStyles"],
  showTempos: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showTempos"],
  showTextBox: _actions_modalActions__WEBPACK_IMPORTED_MODULE_7__["showTextBox"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, mapDispatchToProps)(LeftColumn));

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(118);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(119);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(120);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _TextBox__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(379);
/* harmony import */ var _actions_modalActions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(62);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_categoriesActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(66);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_instrumentsActions__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(69);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_keywordsActions__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(70);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_ratingsActions__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(211);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_stylesActions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(73);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_temposActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(74);
/* harmony import */ var _actions_BackgroundInstrumentalsActions_cuesActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(68);















 // this is a stateless functional component

var RightColumn =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(RightColumn, _React$Component);

  function RightColumn(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, RightColumn);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(RightColumn).call(this, props));

    _this.renderCategories = function () {
      var allCategories = _this.props.categories;
      var selectedCue = _this.props.modal.selectedCue; // if there is a category set for the cue...

      if (selectedCue.cat_id !== 19) {
        allCategories.forEach(function (category) {
          category.cat_id === selectedCue.cat_id ? category.selected = true : null;
        }); // checks to see if the category is selected or not
        // and we return the div with className with corresponding SASS.

        return allCategories.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.cat_name, " - ").concat(obj.cat_id),
            className: "selected",
            id: obj.cat_id,
            onClick: function onClick() {
              return _this.setCategory(obj);
            }
          }, obj.cat_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.cat_name, " - ").concat(obj.cat_id),
            className: "select",
            id: obj.cat_id,
            onClick: function onClick() {
              return _this.setCategory(obj);
            }
          }, obj.cat_name);
        });
      } else {
        // if there is no category just render the normal divs
        return allCategories.map(function (obj) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.cat_name, " - ").concat(obj.cat_id),
            className: "select",
            id: obj.cat_id,
            onClick: function onClick() {
              return _this.setCategory(obj);
            }
          }, obj.cat_name);
        });
      }
    };

    _this.setCategory = function (newCategory) {
      var allCategories = _this.props.categories;
      var updatedCue = _this.props.modal.selectedCue; // if the selected cue has a tempo

      if (updatedCue.cat_id !== 19) {
        if (updatedCue.cat_id !== newCategory.cat_id) {
          updatedCue.cat_id = newCategory.cat_id; // change the selected value of the tempo that was selected to true

          for (var cat in allCategories) {
            if (allCategories[cat].cat_id === newCategory.cat_id) {
              allCategories[cat].selected = true;
            } else {
              // this makes sure only one tempo can be selected at a time
              allCategories[cat].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectCategory(allCategories);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          // if newCategory is already the cat_id, then they are clicking it again to remove it
          updatedCue.cat_id = 19;

          for (var x in allCategories) {
            if (allCategories[x].cat_id === newCategory.cat_id) {
              allCategories[x].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectCategory(allCategories);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } // else if the selected cue has no tempo, add it

      } else {
        updatedCue.cat_id = newCategory.cat_id;

        for (var _x in allCategories) {
          if (allCategories[_x].cat_id === newCategory.cat_id) {
            allCategories[_x].selected = true;
          }
        }

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.selectCategory(allCategories);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderStyles = function () {
      var allStyles = _this.props.styles.filter(function (style) {
        return (// this function checks to see if the searchFilterQuery appears at all
          // in any of the style names, and returns a filtered array
          style.style_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1
        );
      });

      var selectedCue = _this.props.modal.selectedCue; // if there is a category set for the cue...

      if (selectedCue.style_id !== 147) {
        allStyles.forEach(function (style) {
          style.style_id === selectedCue.style_id ? style.selected = true : null;
        }); // checks to see if the category is selected or not
        // and we return the div with className with corresponding SASS.

        return allStyles.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.style_name, " - ").concat(obj.style_id),
            className: "selected",
            id: obj.style_id,
            onClick: function onClick() {
              return _this.setStyle(obj);
            }
          }, obj.style_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.style_name, " - ").concat(obj.style_id),
            className: "select",
            id: obj.style_id,
            onClick: function onClick() {
              return _this.setStyle(obj);
            }
          }, obj.style_name);
        });
      } else {
        // if there is no category just render the normal divs
        var _allStyles = _this.props.styles.filter(function (style) {
          return style.style_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1;
        });

        return _allStyles.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.style_name, " - ").concat(obj.style_id),
            className: "selected",
            id: obj.style_id,
            onClick: function onClick() {
              return _this.setStyle(obj);
            }
          }, obj.style_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.style_name, " - ").concat(obj.style_id),
            className: "select",
            id: obj.style_id,
            onClick: function onClick() {
              return _this.setStyle(obj);
            }
          }, obj.style_name);
        });
      }
    };

    _this.setStyle = function (newStyle) {
      var allStyles = _this.props.styles;
      var updatedCue = _this.props.modal.selectedCue; // if the selected cue has a tempo

      if (updatedCue.style_id !== 147) {
        if (updatedCue.style_id !== newStyle.style_id) {
          updatedCue.style_id = newStyle.style_id; // change the selected value of the tempo that was selected to true

          for (var cat in allStyles) {
            if (allStyles[cat].style_id === newStyle.style_id) {
              allStyles[cat].selected = true;
            } else {
              // this makes sure only one tempo can be selected at a time
              allStyles[cat].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectStyle(allStyles);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          // if newStyle is already the style_id, then they are clicking it again to remove it
          updatedCue.style_id = 147;

          for (var x in allStyles) {
            if (allStyles[x].style_id === newStyle.style_id) {
              allStyles[x].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectStyle(allStyles);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } // else if the selected cue has no tempo, add it

      } else {
        updatedCue.style_id = newStyle.style_id;

        for (var _x2 in allStyles) {
          if (allStyles[_x2].style_id === newStyle.style_id) {
            allStyles[_x2].selected = true;
          }
        }

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.selectStyle(allStyles);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderInstruments = function () {
      // if there is a search happening and instruments in the selectedCue
      if (_this.props.modal.searchFilter !== '' && _this.props.modal.selectedCue.cue_instrus) {
        var allInstruments = _this.props.instrumentsBI.filter(function (instrument) {
          return (// this function checks to see if the searchFilterQuery appears at all
            // in any of the instrument names, and returns a filtered array
            instrument.instru_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1
          );
        }); // grab all the insturments from the selectedCue


        var instrumentsArray = _this.props.modal.selectedCue.cue_instrus.split(','); // change the selected boolean to true for those insturments


        instrumentsArray.forEach(function (instrument) {
          for (var i in allInstruments) {
            allInstruments[i].instru_name === instrument ? allInstruments[i].selected = true : null;
          }
        });
        return allInstruments.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "selected",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, " ", obj.instru_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "select",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, obj.instru_name);
        });
      } else if (_this.props.modal.searchFilter === '' && _this.props.modal.selectedCue.cue_instrus) {
        // checks to see if the instrument in our query filtered array is selected or not
        // and we return the div with className with corresponding css styling.
        var _allInstruments = _this.props.instrumentsBI.filter(function (instrument) {
          return instrument.instru_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1;
        }); // grab all the insturments from the selectedCue


        var _instrumentsArray = _this.props.modal.selectedCue.cue_instrus.split(','); // change the selected boolean to true for those insturments


        _instrumentsArray.forEach(function (instrument) {
          for (var i in _allInstruments) {
            _allInstruments[i].instru_name === instrument ? _allInstruments[i].selected = true : null;
          }
        });

        return _allInstruments.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "selected",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, " ", obj.instru_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "select",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, obj.instru_name);
        });
      } else {
        //  if the search query is empty and there are no instruments in the selectedCue
        var _allInstruments2 = _this.props.instrumentsBI.filter(function (instrument) {
          return instrument.instru_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1;
        });

        return _allInstruments2.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "selected",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, " ", obj.instru_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.instru_id),
            className: "select",
            id: obj.instru_id,
            onClick: function onClick() {
              return _this.setInstruments(obj.instru_name);
            }
          }, obj.instru_name);
        });
      }
    };

    _this.setInstruments = function (instrument) {
      var allInstruments = _this.props.instruments;
      var newInstrument = instrument;
      var updatedCue = _this.props.modal.selectedCue;

      if (updatedCue.cue_instrus !== null && updatedCue.cue_instrus !== '') {
        var selectedInstruments = updatedCue.cue_instrus.split(',').map(function (inst) {
          return inst.trim();
        });

        if (selectedInstruments.indexOf(newInstrument) === -1) {
          updatedCue.cue_instrus = "".concat(selectedInstruments, ",").concat(newInstrument);

          for (var inst in allInstruments) {
            if (allInstruments[inst].instru_name === newInstrument) {
              allInstruments[inst].selected = true;
            }
          }

          _this.props.selectInstruments(allInstruments);

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          var selectedIndex = selectedInstruments.indexOf(newInstrument);
          var i = selectedIndex;
          selectedInstruments.splice(i, 1);
          updatedCue.cue_instrus = selectedInstruments.join(',');

          for (var _inst in allInstruments) {
            if (allInstruments[_inst].instru_name === newInstrument) {
              allInstruments[_inst].selected = false;
            }
          }

          _this.props.selectInstruments(allInstruments);

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.updateCues(updatedCue, _this.props.cues);
        }
      } else {
        updatedCue.cue_instrus = "".concat(newInstrument);

        for (var _inst2 in allInstruments) {
          if (allInstruments[_inst2].instru_name === newInstrument) {
            allInstruments[_inst2].selected = true;
          }
        }

        _this.props.selectInstruments(allInstruments);

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderKeywords = function () {
      // if there is a description for the cue and a search Filter
      if (_this.props.modal.searchFilter !== '' && _this.props.modal.selectedCue.cue_desc) {
        var allKeywords = _this.props.keywordsBI.filter(function (keyword) {
          return (// filter the array by searchFilterQuery
            keyword.key_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1
          );
        });

        var selectedCueKeywords = _this.props.modal.selectedCue.cue_desc.split(','); // change the selected boolean to true for those keywords


        selectedCueKeywords.forEach(function (keyword) {
          for (var i in allKeywords) {
            allKeywords[i].key_name === keyword ? allKeywords[i].selected = true : null;
          }
        }); // checks to see if the keyword is selected or not and we return the div with className with corresponding SASS.

        return allKeywords.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "selected",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "select",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name);
        });
      } else if (_this.props.modal.searchFilter === '' && _this.props.modal.selectedCue.cue_desc) {
        var _allKeywords = _this.props.keywordsBI.filter(function (keyword) {
          return (// filter the array by searchFilterQuery
            keyword.key_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1
          );
        });

        var _selectedCueKeywords = _this.props.modal.selectedCue.cue_desc.split(','); // change the selected boolean to true for those keywords


        _selectedCueKeywords.forEach(function (keyword) {
          for (var i in _allKeywords) {
            _allKeywords[i].key_name === keyword ? _allKeywords[i].selected = true : null;
          }
        }); // checks to see if the keyword is selected or not and we return the div with className with corresponding SASS.


        return _allKeywords.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "selected",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "select",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name);
        });
      }

      {
        var _allKeywords2 = _this.props.keywordsBI.filter(function (keyword) {
          return keyword.key_name.toLowerCase().indexOf(_this.props.modal.searchFilter.toLowerCase()) !== -1;
        }); // if there is no description just render the normal divs


        return _allKeywords2.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "selected",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.key_id),
            className: "select",
            id: obj.key_id,
            onClick: function onClick() {
              return _this.setKeyword(obj.key_name);
            }
          }, obj.key_name);
        });
      }
    };

    _this.setKeyword = function (keyword) {
      var allKeywords = _this.props.keywordsBI;
      var newKeyword = keyword;
      var updatedCue = _this.props.modal.selectedCue; // if the selected cue has keywords

      if (updatedCue.cue_desc !== null && updatedCue.cue_desc !== '') {
        // turn the cue_desc into an array
        var selectedCueKeywords = updatedCue.cue_desc.split(',').map(function (inst) {
          return inst.trim();
        }); // check to see if the newKeyword already exsits in the cue_description

        if (selectedCueKeywords.indexOf(newKeyword) === -1) {
          // if it doesn't, we will add it
          updatedCue.cue_desc = "".concat(selectedCueKeywords, ",").concat(newKeyword);

          for (var _keyword in allKeywords) {
            if (allKeywords[_keyword].key_name === newKeyword) {
              allKeywords[_keyword].selected = true;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectKeywords(allKeywords);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          // if newKeyword is already in the cue_desc, then they are clicking it again to remove it
          selectedCueKeywords.splice(selectedCueKeywords.indexOf(newKeyword), 1);
          updatedCue.cue_desc = selectedCueKeywords.join(',');

          for (var _keyword2 in allKeywords) {
            if (allKeywords[_keyword2].key_name === newKeyword) {
              allKeywords[_keyword2].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectKeywords(allKeywords);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } // else if the selected cue has no keywords, add it to the description

      } else {
        updatedCue.cue_desc = "".concat(newKeyword);

        for (var _keyword3 in allKeywords) {
          if (allKeywords[_keyword3].key_name === newKeyword) {
            allKeywords[_keyword3].selected = true;
          }
        }

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.selectKeywords(allKeywords);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderTempos = function () {
      var allTempos = _this.props.tempos;
      var selectedCue = _this.props.modal.selectedCue; // if there is a tempo set for the cue...

      if (selectedCue.tempo_id !== 28) {
        allTempos.forEach(function (tempo) {
          tempo.tempo_id === selectedCue.tempo_id ? tempo.selected = true : null;
        }); // checks to see if the tempo is selected or not
        // and we return the div with className with corresponding SASS.

        return allTempos.map(function (obj) {
          return obj.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.tempo_id),
            className: "selected",
            id: obj.tempo_id,
            onClick: function onClick() {
              return _this.setTempo(obj);
            }
          }, obj.tempo_name) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.tempo_id),
            className: "select",
            id: obj.tempo_id,
            onClick: function onClick() {
              return _this.setTempo(obj);
            }
          }, obj.tempo_name);
        });
      } else {
        // if there is no tempo just render the normal divs
        return allTempos.map(function (obj) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            key: "".concat(obj.tempo_id),
            className: "select",
            id: obj.tempo_id,
            onClick: function onClick() {
              return _this.setTempo(obj);
            }
          }, obj.tempo_name);
        });
      }
    };

    _this.setTempo = function (newTempo) {
      var allTempos = _this.props.tempos;
      var updatedCue = _this.props.modal.selectedCue; // if the selected cue has a tempo

      if (updatedCue.tempo_id !== 28) {
        if (updatedCue.tempo_id !== newTempo.tempo_id) {
          updatedCue.tempo_id = newTempo.tempo_id; // change the selected value of the tempo that was selected to true

          for (var tempo in allTempos) {
            if (allTempos[tempo].tempo_id === newTempo.tempo_id) {
              allTempos[tempo].selected = true;
            } else {
              // this makes sure only one tempo can be selected at a time
              allTempos[tempo].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectTempos(allTempos);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          // if newTempo is already the tempo_id, then they are clicking it again to remove it
          updatedCue.tempo_id = 28;

          for (var x in allTempos) {
            if (allTempos[x].tempo_id === newTempo.tempo_id) {
              allTempos[x].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectTempos(allTempos);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } // else if the selected cue has no tempo, add it

      } else {
        updatedCue.tempo_id = newTempo.tempo_id;

        for (var _x3 in allTempos) {
          if (allTempos[_x3].tempo_id === newTempo.tempo_id) {
            allTempos[_x3].selected = true;
          }
        }

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.selectTempos(allTempos);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderRatings = function () {
      var allRatings = _this.props.ratings;
      var selectedCue = _this.props.modal.selectedCue;

      if (selectedCue.cue_rating !== null) {
        allRatings.forEach(function (rating) {
          rating.value === selectedCue.cue_rating ? rating.selected = true : null;
        });
        return allRatings.map(function (rating) {
          return rating.selected ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            id: rating.value,
            key: rating.value,
            className: "selected",
            onClick: function onClick() {
              return _this.setRating(rating);
            }
          }, rating.value) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            id: rating.value,
            key: rating.value,
            className: "select",
            onClick: function onClick() {
              return _this.setRating(rating);
            }
          }, rating.value);
        });
      } else {
        return allRatings.map(function (rating) {
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
            id: rating.value,
            key: rating.value,
            className: "select",
            onClick: function onClick() {
              return _this.setRating(rating);
            }
          }, " ", rating.value);
        });
      }
    };

    _this.setRating = function (newRating) {
      var allRatings = _this.props.ratings;
      var updatedCue = _this.props.modal.selectedCue;

      if (updatedCue.cue_rating !== 0) {
        if (updatedCue.cue_rating !== newRating.value) {
          updatedCue.cue_rating = newRating.value;

          for (var x in allRatings) {
            if (allRatings[x].value === newRating.value) {
              allRatings[x].selected = true;
            } else {
              allRatings[x].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectRating(allRatings);

          _this.props.updateCues(updatedCue, _this.props.cues);
        } else {
          updatedCue.cue_rating === 0;

          for (var _x4 in allRatings) {
            if (allRatings[_x4].value === newRating.value) {
              allRatings[_x4].selected = false;
            }
          }

          _this.props.updateData(_this.props.modal, updatedCue);

          _this.props.selectRating(allRatings);

          _this.props.updateCues(updatedCue, _this.props.cues);
        }
      } else {
        updatedCue.cue_rating = newRating.value;

        for (var _x5 in allRatings) {
          if (allRatings[_x5].value === newRating.value) {
            allRatings[_x5].selected = true;
          }
        }

        _this.props.updateData(_this.props.modal, updatedCue);

        _this.props.selectRating(allRatings);

        _this.props.updateCues(updatedCue, _this.props.cues);
      }
    };

    _this.renderTextBox = function (textType) {
      switch (textType) {
        case 'sounds_like_band_edit':
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, " Sounds like Bands: "), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TextBox__WEBPACK_IMPORTED_MODULE_7__["default"], {
            handleChange: _this.handleChange,
            value: _this.props.modal.selectedCue.sounds_like_band_edit || '',
            textType: "sounds_like_band_edit"
          }));
          break;

        case 'sounds_like_film_edit':
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, " Sounds like Films: "), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TextBox__WEBPACK_IMPORTED_MODULE_7__["default"], {
            handleChange: _this.handleChange,
            value: _this.props.modal.selectedCue.sounds_like_film_edit || '',
            textType: "sounds_like_film_edit"
          }));
          break;

        case 'sounds_like_composer_edit':
          return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, " Sounds like Composers: "), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_TextBox__WEBPACK_IMPORTED_MODULE_7__["default"], {
            handleChange: _this.handleChange,
            value: _this.props.modal.selectedCue.sounds_like_composer_edit || '',
            textType: "sounds_like_composer_edit"
          }));
          break;
      }
    };

    _this.handleChange = function (event) {
      var updatedCue = _this.props.modal.selectedCue;

      switch (event.target.getAttribute('texttype')) {
        case 'sounds_like_band_edit':
          updatedCue.sounds_like_band_edit = event.target.value;

          _this.props.updateData(_this.props.modal, updatedCue);

          break;

        case 'sounds_like_film_edit':
          updatedCue.sounds_like_film_edit = event.target.value;

          _this.props.updateData(_this.props.modal, updatedCue);

          break;

        case 'sounds_like_composer_edit':
          updatedCue.sounds_like_composer_edit = event.target.value;

          _this.props.updateData(_this.props.modal, updatedCue);

          break;
      }
    };

    _this.handleSearchFilter = function (query) {
      _this.props.handleSearchFilter(query.trim(), _this.props.modal);
    };

    _this.clearSearch = function () {
      _this.props.clearSearch(_this.props.modal);

      document.getElementById('search-filter').value = '';
    };

    return _this;
  } // **********************************************************************************************************
  // CATEGORIES FUNCTIONS
  // **********************************************************************************************************


  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(RightColumn, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var modal = this.props.modal;
      var searchBar = modal.showInstruments || modal.showKeywords || modal.showStyles ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("input", {
        id: "search-filter",
        type: "text",
        name: "search",
        value: this.props.searchFilter,
        onChange: function onChange(e) {
          return _this2.handleSearchFilter(e.target.value);
        }
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("button", {
        onClick: this.clearSearch
      }, "Clear")) : react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("br", null);
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "modal-right-column"
      }, searchBar, modal.showCategories ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Categories:"), this.renderCategories()) : null, modal.showStyles ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Styles:"), this.renderStyles()) : null, modal.showInstruments ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Instruments:"), this.renderInstruments()) : null, modal.showKeywords ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Keywords:"), this.renderKeywords()) : null, modal.showTempos ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Tempos:"), this.renderTempos()) : null, modal.showRating ? react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("strong", null, "Rating:"), this.renderRatings()) : null, modal.showText ? this.renderTextBox(event.target.getAttribute('texttype')) : null);
    }
  }]);

  return RightColumn;
}(react__WEBPACK_IMPORTED_MODULE_5___default.a.Component);

;

var mapStateToProps = function mapStateToProps(state) {
  return {
    categories: state.categories,
    composersBI: state.composersBI,
    cues: state.cues,
    instrumentsBI: state.instrumentsBI,
    keywordsBI: state.keywordsBI,
    modal: state.modal,
    ratings: state.ratings,
    searchFilter: state.searchFilter,
    styles: state.styles,
    tempos: state.tempos
  };
};

var mapDispatchToProps = {
  clearSearch: _actions_modalActions__WEBPACK_IMPORTED_MODULE_8__["clearSearch"],
  handleSearchFilter: _actions_modalActions__WEBPACK_IMPORTED_MODULE_8__["handleSearchFilter"],
  selectCategory: _actions_BackgroundInstrumentalsActions_categoriesActions__WEBPACK_IMPORTED_MODULE_9__["selectCategory"],
  selectInstruments: _actions_BackgroundInstrumentalsActions_instrumentsActions__WEBPACK_IMPORTED_MODULE_10__["selectInstruments"],
  selectKeywords: _actions_BackgroundInstrumentalsActions_keywordsActions__WEBPACK_IMPORTED_MODULE_11__["selectKeywords"],
  selectRating: _actions_BackgroundInstrumentalsActions_ratingsActions__WEBPACK_IMPORTED_MODULE_12__["selectRating"],
  selectStyle: _actions_BackgroundInstrumentalsActions_stylesActions__WEBPACK_IMPORTED_MODULE_13__["selectStyle"],
  selectTempos: _actions_BackgroundInstrumentalsActions_temposActions__WEBPACK_IMPORTED_MODULE_14__["selectTempos"],
  updateCues: _actions_BackgroundInstrumentalsActions_cuesActions__WEBPACK_IMPORTED_MODULE_15__["updateCues"],
  updateData: _actions_modalActions__WEBPACK_IMPORTED_MODULE_8__["updateData"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_6__["connect"])(mapStateToProps, mapDispatchToProps)(RightColumn));

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
 // this is a stateless functional component

var TextBox = function TextBox(props) {
  // console.log(5, props)
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("textarea", {
    className: "text-area",
    value: props.value,
    texttype: props.textType,
    onChange: props.handleChange
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (TextBox);

/***/ })

}]);
//# sourceMappingURL=5.bundle.js.map