(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[4],{

/***/ 242:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(243);
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(246);
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(118);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(119);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(120);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(123);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(124);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(13);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(76);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(247);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_select__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(220);
/* harmony import */ var _SubComponents_Loader__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(126);
/* harmony import */ var _actions_selectedLibraryActions__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(170);
/* harmony import */ var _actions_selectedComposerActions__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(171);
/* harmony import */ var _actions_selectedReleasesActions__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(374);















 // this import contains all the export/download functions:

var exportTools = __webpack_require__(375);

var ExportDashboard =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_6___default()(ExportDashboard, _React$Component);

  function ExportDashboard(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2___default()(this, ExportDashboard);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5___default()(ExportDashboard).call(this, props));
    _this.state = {
      batchesDropDown: [],
      batchOrRelease: 'Background Instrumental Batch',
      inclusive: false,
      releaseFilter: 147,
      releasesDropDown: [],
      selectedLibrary: 'background-instrumentals'
    };

    _this.handleChange = function (releaseFilter) {
      _this.setState({
        releaseFilter: releaseFilter
      });
    };

    _this.handleCheck = function () {
      _this.setState({
        inclusive: !_this.state.inclusive
      });
    };

    _this.handleRadio = function (event) {
      switch (event.target.value) {
        case 'background-instrumentals':
          _this.setState({
            batchesDropDown: _this.props.batchesBI.map(function (rel) {
              return {
                value: rel.rel_id,
                label: rel.rel_num
              };
            }),
            batchOrRelease: 'Background Instrumental Batch',
            releaseFilter: null,
            selectedLibrary: event.target.value
          });

          _this.props.initializeSelectedLibrary(_this.props.cues, event.target.value);

          _this.props.initializeSelectedComposer(_this.props.composersBI);

          _this.props.initializeSelectedReleases(_this.props.batchesBI);

          break;

        case 'independent-artists':
          _this.setState({
            batchesDropDown: _this.props.releasesIA.map(function (rel) {
              return {
                value: rel.rel_id,
                label: rel.rel_num
              };
            }),
            batchOrRelease: 'Indie Artist Release',
            releaseFilter: null,
            selectedLibrary: event.target.value
          });

          _this.props.initializeSelectedLibrary(_this.props.tracks, event.target.value);

          _this.props.initializeSelectedComposer(_this.props.artists);

          _this.props.initializeSelectedReleases(_this.props.releasesIA);

          break;

        case 'Background Instrumental Release':
          _this.setState({
            batchOrRelease: event.target.value,
            batchesDropDown: _this.state.releasesDropDown,
            releaseFilter: null
          });

          break;

        case 'Background Instrumental Batch':
          _this.setState({
            batchOrRelease: event.target.value,
            batchesDropDown: _this.props.batchesBI.map(function (rel) {
              return {
                value: rel.rel_id,
                label: rel.rel_num
              };
            }),
            releaseFilter: null
          });

          break;

        default:
          null;
      }
    };

    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3___default()(ExportDashboard, [{
    key: "componentDidMount",
    value: function () {
      var _componentDidMount = _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_1___default()(
      /*#__PURE__*/
      _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.mark(function _callee() {
        var releases, i, releaseLabel, releasesDropDown;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default.a.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                // initialize the library in case this is the landing page
                if (this.props.selectedLibrary.library.length === 0) {
                  this.props.initializeSelectedLibrary(this.props.cues, 'background-instrumentals');
                }

                _context.next = 3;
                return this.setState({
                  batchesDropDown: this.props.batchesBI.map(function (rel) {
                    return {
                      value: rel.rel_id,
                      label: rel.rel_num
                    };
                  })
                });

              case 3:
                if (!(this.props.composersBI.length === 0)) {
                  _context.next = 6;
                  break;
                }

                _context.next = 6;
                return this.props.initializeSelectedComposer(this.props.composersBI);

              case 6:
                if (!(this.props.batchesBI.length === 0)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 9;
                return this.props.initializeSelectedReleases(this.props.batchesBI);

              case 9:
                // this handles creating the releasesDropDown array
                if (this.state.releasesDropDown.length === 0) {
                  releases = {};

                  for (i = 0; i < this.props.batchesBI.length; i++) {
                    releaseLabel = "".concat(isNaN(parseInt(this.props.batchesBI[i].rel_num_only)) ? '' : 'R').concat(this.props.batchesBI[i].rel_num_only);

                    if (!releases[releaseLabel]) {
                      releases[releaseLabel] = [];
                    }

                    releases[releaseLabel].push(this.props.batchesBI[i].rel_id);
                  }

                  releasesDropDown = [];

                  for (releaseLabel in releases) {
                    releasesDropDown.push({
                      releaseLabel: releaseLabel,
                      releaseIDs: releases[releaseLabel].join('-')
                    });
                  }

                  this.setState({
                    releasesDropDown: releasesDropDown.map(function (rel) {
                      return {
                        value: rel.releaseIDs,
                        label: rel.releaseLabel
                      };
                    })
                  });
                }

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function componentDidMount() {
        return _componentDidMount.apply(this, arguments);
      }

      return componentDidMount;
    }()
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // this is initializing our selected composers by default once the API request is returned
      // I added this condition so that the user could start on any /url_path
      if (this.props.selectedComposers.length === 0) {
        this.props.initializeSelectedComposer(this.props.composersBI);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log(123, this.props);
      console.log(124, this.state);
      var releaseFilter = this.state.releaseFilter;
      var selectedLibrary = this.props.selectedLibrary.library;

      var ExportsOptions = function ExportsOptions() {
        return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          className: "column-wrapper"
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          className: "dashboard-left-column"
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h2", null, "Meta Data Dashboard"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h3", null, "Filter Options: "), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(react_select__WEBPACK_IMPORTED_MODULE_11__["default"], {
          value: releaseFilter,
          onChange: _this2.handleChange,
          options: _this2.state.batchesDropDown,
          className: "exports-dropdown",
          placeholder: _this2.state.batchOrRelease === 'Indie Artist Release' ? "Select an ".concat(_this2.state.batchOrRelease) : "Select a ".concat(_this2.state.batchOrRelease)
        }), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "radio",
          name: "react-tips",
          value: "background-instrumentals",
          checked: _this2.state.selectedLibrary === 'background-instrumentals',
          className: "form-check-input",
          onChange: _this2.handleRadio
        }), " Background Instrumentals"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "radio",
          name: "react-tips",
          value: "independent-artists",
          checked: _this2.state.selectedLibrary === 'independent-artists',
          className: "form-check-input",
          onChange: _this2.handleRadio
        }), " Independent Artists"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), _this2.state.selectedLibrary === 'background-instrumentals' ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "radio",
          name: "releases-or-batches",
          value: "Background Instrumental Batch",
          checked: _this2.state.batchOrRelease === 'Background Instrumental Batch',
          className: "form-check-input",
          onChange: _this2.handleRadio
        }), " Batches"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("label", null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "radio",
          name: "releases-or-batches",
          value: "Background Instrumental Release",
          checked: _this2.state.batchOrRelease === 'Background Instrumental Release',
          className: "form-check-input",
          onChange: _this2.handleRadio
        }), " Releases")) : null, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("input", {
          type: "checkbox",
          id: "inclusive",
          onChange: _this2.handleCheck,
          checked: _this2.state.inclusive
        }), " Inclusive?", react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), "(checking this will include all releases before the one that's selected)"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
          className: "dashboard-right-column"
        }, react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("h2", null, "Download Links:"), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.renameExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "Rename Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : '')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.soundMinerExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "SoundMiner Batch Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : '')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.nbcSoundMinerExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "NBCU SoundMiner Batch Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : '')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.proTunesExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "ProTunes Batch Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : '')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.alterKExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "Alter K Release Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : '')), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("br", null), react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("a", {
          onClick: function onClick() {
            return exportTools.sourceAudioExport(_this2.props, _this2.state);
          },
          className: "select"
        }, "SourceAudio Batch Export ".concat(_this2.state.releaseFilter && _this2.state.releaseFilter.label ? _this2.state.releaseFilter.label : '', " ").concat(_this2.state.inclusive ? 'INC' : ''))));
      };

      return react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement("div", {
        className: "dashboard"
      }, this.props.selectedComposers.length === 0 && selectedLibrary.length === 0 ? react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(_SubComponents_Loader__WEBPACK_IMPORTED_MODULE_12__["default"], null) : react__WEBPACK_IMPORTED_MODULE_7___default.a.createElement(ExportsOptions, null));
    }
  }]);

  return ExportDashboard;
}(react__WEBPACK_IMPORTED_MODULE_7___default.a.Component);

var mapStateToProps = function mapStateToProps(state) {
  return {
    artists: state.artists,
    BImasterIDs: state.BImasterIDs,
    categories: state.categories,
    composersBI: state.composersBI,
    cues: state.cues,
    instrumentsBI: state.instrumentsBI,
    keywordsBI: state.keywordsBI,
    batchesBI: state.batchesBI,
    releasesIA: state.releasesIA,
    selectedComposers: state.selectedComposers,
    selectedLibrary: state.selectedLibrary,
    selectedReleases: state.selectedReleases,
    styles: state.styles,
    tempos: state.tempos,
    tracks: state.tracks
  };
};

var mapDispatchToProps = {
  initializeSelectedLibrary: _actions_selectedLibraryActions__WEBPACK_IMPORTED_MODULE_13__["initializeSelectedLibrary"],
  initializeSelectedComposer: _actions_selectedComposerActions__WEBPACK_IMPORTED_MODULE_14__["initializeSelectedComposer"],
  initializeSelectedReleases: _actions_selectedReleasesActions__WEBPACK_IMPORTED_MODULE_15__["initializeSelectedReleases"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_8__["connect"])(mapStateToProps, mapDispatchToProps)(ExportDashboard));

/***/ }),

/***/ 249:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 250,
	"./af.js": 250,
	"./ar": 251,
	"./ar-dz": 252,
	"./ar-dz.js": 252,
	"./ar-kw": 253,
	"./ar-kw.js": 253,
	"./ar-ly": 254,
	"./ar-ly.js": 254,
	"./ar-ma": 255,
	"./ar-ma.js": 255,
	"./ar-sa": 256,
	"./ar-sa.js": 256,
	"./ar-tn": 257,
	"./ar-tn.js": 257,
	"./ar.js": 251,
	"./az": 258,
	"./az.js": 258,
	"./be": 259,
	"./be.js": 259,
	"./bg": 260,
	"./bg.js": 260,
	"./bm": 261,
	"./bm.js": 261,
	"./bn": 262,
	"./bn.js": 262,
	"./bo": 263,
	"./bo.js": 263,
	"./br": 264,
	"./br.js": 264,
	"./bs": 265,
	"./bs.js": 265,
	"./ca": 266,
	"./ca.js": 266,
	"./cs": 267,
	"./cs.js": 267,
	"./cv": 268,
	"./cv.js": 268,
	"./cy": 269,
	"./cy.js": 269,
	"./da": 270,
	"./da.js": 270,
	"./de": 271,
	"./de-at": 272,
	"./de-at.js": 272,
	"./de-ch": 273,
	"./de-ch.js": 273,
	"./de.js": 271,
	"./dv": 274,
	"./dv.js": 274,
	"./el": 275,
	"./el.js": 275,
	"./en-au": 276,
	"./en-au.js": 276,
	"./en-ca": 277,
	"./en-ca.js": 277,
	"./en-gb": 278,
	"./en-gb.js": 278,
	"./en-ie": 279,
	"./en-ie.js": 279,
	"./en-il": 280,
	"./en-il.js": 280,
	"./en-nz": 281,
	"./en-nz.js": 281,
	"./eo": 282,
	"./eo.js": 282,
	"./es": 283,
	"./es-do": 284,
	"./es-do.js": 284,
	"./es-us": 285,
	"./es-us.js": 285,
	"./es.js": 283,
	"./et": 286,
	"./et.js": 286,
	"./eu": 287,
	"./eu.js": 287,
	"./fa": 288,
	"./fa.js": 288,
	"./fi": 289,
	"./fi.js": 289,
	"./fo": 290,
	"./fo.js": 290,
	"./fr": 291,
	"./fr-ca": 292,
	"./fr-ca.js": 292,
	"./fr-ch": 293,
	"./fr-ch.js": 293,
	"./fr.js": 291,
	"./fy": 294,
	"./fy.js": 294,
	"./gd": 295,
	"./gd.js": 295,
	"./gl": 296,
	"./gl.js": 296,
	"./gom-latn": 297,
	"./gom-latn.js": 297,
	"./gu": 298,
	"./gu.js": 298,
	"./he": 299,
	"./he.js": 299,
	"./hi": 300,
	"./hi.js": 300,
	"./hr": 301,
	"./hr.js": 301,
	"./hu": 302,
	"./hu.js": 302,
	"./hy-am": 303,
	"./hy-am.js": 303,
	"./id": 304,
	"./id.js": 304,
	"./is": 305,
	"./is.js": 305,
	"./it": 306,
	"./it.js": 306,
	"./ja": 307,
	"./ja.js": 307,
	"./jv": 308,
	"./jv.js": 308,
	"./ka": 309,
	"./ka.js": 309,
	"./kk": 310,
	"./kk.js": 310,
	"./km": 311,
	"./km.js": 311,
	"./kn": 312,
	"./kn.js": 312,
	"./ko": 313,
	"./ko.js": 313,
	"./ku": 314,
	"./ku.js": 314,
	"./ky": 315,
	"./ky.js": 315,
	"./lb": 316,
	"./lb.js": 316,
	"./lo": 317,
	"./lo.js": 317,
	"./lt": 318,
	"./lt.js": 318,
	"./lv": 319,
	"./lv.js": 319,
	"./me": 320,
	"./me.js": 320,
	"./mi": 321,
	"./mi.js": 321,
	"./mk": 322,
	"./mk.js": 322,
	"./ml": 323,
	"./ml.js": 323,
	"./mn": 324,
	"./mn.js": 324,
	"./mr": 325,
	"./mr.js": 325,
	"./ms": 326,
	"./ms-my": 327,
	"./ms-my.js": 327,
	"./ms.js": 326,
	"./mt": 328,
	"./mt.js": 328,
	"./my": 329,
	"./my.js": 329,
	"./nb": 330,
	"./nb.js": 330,
	"./ne": 331,
	"./ne.js": 331,
	"./nl": 332,
	"./nl-be": 333,
	"./nl-be.js": 333,
	"./nl.js": 332,
	"./nn": 334,
	"./nn.js": 334,
	"./pa-in": 335,
	"./pa-in.js": 335,
	"./pl": 336,
	"./pl.js": 336,
	"./pt": 337,
	"./pt-br": 338,
	"./pt-br.js": 338,
	"./pt.js": 337,
	"./ro": 339,
	"./ro.js": 339,
	"./ru": 340,
	"./ru.js": 340,
	"./sd": 341,
	"./sd.js": 341,
	"./se": 342,
	"./se.js": 342,
	"./si": 343,
	"./si.js": 343,
	"./sk": 344,
	"./sk.js": 344,
	"./sl": 345,
	"./sl.js": 345,
	"./sq": 346,
	"./sq.js": 346,
	"./sr": 347,
	"./sr-cyrl": 348,
	"./sr-cyrl.js": 348,
	"./sr.js": 347,
	"./ss": 349,
	"./ss.js": 349,
	"./sv": 350,
	"./sv.js": 350,
	"./sw": 351,
	"./sw.js": 351,
	"./ta": 352,
	"./ta.js": 352,
	"./te": 353,
	"./te.js": 353,
	"./tet": 354,
	"./tet.js": 354,
	"./tg": 355,
	"./tg.js": 355,
	"./th": 356,
	"./th.js": 356,
	"./tl-ph": 357,
	"./tl-ph.js": 357,
	"./tlh": 358,
	"./tlh.js": 358,
	"./tr": 359,
	"./tr.js": 359,
	"./tzl": 360,
	"./tzl.js": 360,
	"./tzm": 361,
	"./tzm-latn": 362,
	"./tzm-latn.js": 362,
	"./tzm.js": 361,
	"./ug-cn": 363,
	"./ug-cn.js": 363,
	"./uk": 364,
	"./uk.js": 364,
	"./ur": 365,
	"./ur.js": 365,
	"./uz": 366,
	"./uz-latn": 367,
	"./uz-latn.js": 367,
	"./uz.js": 366,
	"./vi": 368,
	"./vi.js": 368,
	"./x-pseudo": 369,
	"./x-pseudo.js": 369,
	"./yo": 370,
	"./yo.js": 370,
	"./zh-cn": 371,
	"./zh-cn.js": 371,
	"./zh-hk": 372,
	"./zh-hk.js": 372,
	"./zh-tw": 373,
	"./zh-tw.js": 373
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 249;

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initializeSelectedReleases", function() { return initializeSelectedReleases; });
// ==============================================================================================================
//  SELECTED RELEASES ACTIONS
// ==============================================================================================================
var initializeSelectedReleases = function initializeSelectedReleases(data) {
  return {
    type: 'INITIALIZE_SELECTED_RELEASES',
    selectedReleases: data
  };
};

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "alterKExport", function() { return alterKExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nbcSoundMinerExport", function() { return nbcSoundMinerExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "proTunesExport", function() { return proTunesExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renameExport", function() { return renameExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "soundMinerExport", function() { return soundMinerExport; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sourceAudioExport", function() { return sourceAudioExport; });
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(247);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_0__);
// ******************************************************************************************
 // ******************************************************************************************
// ******************************************************************************************
//  RENAME EXPORT FUNCTION
// ******************************************************************************************

var renameExport = function renameExport(props, state) {
  var headersRow = ['1 DLMSONG TITLE', '2 DLM FILENAME (WAV)', '3 DLM FILENAME (MP3)', '4 NBC FILENAME (WAV)', '5 NBC FILENAME (MP3)', '6 PROTUNES/GMR', '7 MUSIC DIRECTOR', '8 ZINKO', '9 DLM CATEGORY', '10 DLM STYLE', '11 FOLDER', '12 RELEASE #', '13 TRACK ID#', '14 ISRC', '15 PNG MP3', '16 PNG WAV', '17 CUE RATING', '18 STYLE MD', '19 PROTUNES - UNDER 6 RATED TO REMOVE', '20 GROOVERS - UNDER 8 RATED TO REMOVE', '21 ACTIVE WAVs', '22 AVID MXF a1', '23 AVID MXF a2', '24 CUE_ID MXF a1', '25 CUE_ID MXF a2'];
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    switch (state.batchOrRelease) {
      case 'Background Instrumental Batch':
        return state.inclusive ? cue.rel_id <= state.releaseFilter.value && cue.cue_status !== 'Pulled' : cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
        break;

      case 'Background Instrumental Release':
        var releasesArray = /\-/.test(state.releaseFilter.value) ? state.releaseFilter.value.split('-') : state.releaseFilter.value;
        return isNaN(state.releaseFilter.value) ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && cue.cue_status !== 'Pulled' : cue.cue_status !== 'Pulled';

      case 'Indie Artist Release':
        return state.inclusive ? cue.rel_id <= state.releaseFilter.value && cue.cue_status !== 'Pulled' : cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
        break;
    }
  }).forEach(function (row) {
    var newRow = [// 1 DLMSONG TITLE
    row.cue_title, // 2 DLM FILENAME (WAV)
    "DLM - ".concat(row.cue_title, ".wav"), // 3 DLM FILENAME (MP3)
    "DLM - ".concat(row.cue_title, ".mp3"), // 4 NBC FILENAME (WAV)
    "DLM_".concat(row.cue_title, ".wav"), // 5 NBC FILENAME (MP3)
    "DLM_".concat(row.cue_title, ".mp3"), // 6 PROTUNES/GMR
    "DLM_".concat(row.cue_title.replace(/\s/g, "_"), ".wav"), // 7 MUSIC DIRECTOR
    "".concat(row.cue_id, "-").concat(row.cue_title.toLowerCase().replace(/\s/g, ''), ".wav"), // 8 ZINKO
    "DLM".concat(row.style_id.toString().padStart(3, 0), "_").concat(row.cue_id, "_").concat(row.cue_title.toLowerCase().replace(/\s/g, ''), ".mp3"), // 9 DLM CATEGORY
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    })), // 10 DLM STYLE
    "".concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // 11 FOLDER
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), "\\").concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // 12 RELEASE #
    row.rel_id, // 13 TRACK ID#
    row.cue_id, // 14 ISRC
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1)), // 15 PNG MP3
    "".concat(row.cue_id, ".mp3"), // 16 PNG WAV
    "".concat(row.cue_id, ".wav"), // 17 CUE RATING
    row.cue_rating, // 18 STYLE MD
    "DLM".concat(row.style_id.toString().padStart(3, 0), "_").concat(row.cue_id, "-").concat(row.cue_title.toLowerCase().replace(/\s/g, ''), ".wav"), // 19 PROTUNES - UNDER 6 RATED TO REMOVE
    row.cue_rating < 6 ? "pppppppDLM - ".concat(row.cue_title, ".wav") : '', // 20 GROOVERS - UNDER 8 RATED TO REMOVE
    row.cue_rating < 8 ? "gggggggDLM - ".concat(row.cue_title, ".wav") : '', // 21 ACTIVE WAVs
    row.cue_status === 'Active' ? "aaaaaaaDLM - ".concat(row.cue_title, ".wav") : '', // 22 AVID MXF a1
    "DLM - ".concat(row.cue_title, "_a1.mfx"), // 23 AVID MXF a2
    "DLM - ".concat(row.cue_title, "_a2.mfx"), // 24 CUE_ID MXF a1
    "".concat(row.cue_title, "_a1.mfx"), // 25 CUE_ID MXF a2
    "".concat(row.cue_title, "_a2.mfx")];
    csvData.push("".concat(newRow.join('\t')));
  });
  generateDownload(csvData.join('\n'), "DLM_".concat(state.releaseFilter.label + "_").concat(state.inclusive ? 'INC_' : '', "RENAME_").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY.MM.DD-HH_mm_ss'), ".csv"));
}; // ******************************************************************************************
//  SOUND MINER EXPORT FUNCTION
// ******************************************************************************************


var soundMinerExport = function soundMinerExport(props, state) {
  var headersRow = ['Filename', 'Manufacturer', 'Library', 'CDTitle', 'TrackTitle', 'Version', 'Description', 'Category', 'SubCategory', 'FeaturedInstrument', 'Keywords', 'Composer', 'Artist', 'Publisher', 'Designer', 'BWDescription', 'BWOriginator', 'BWOriginatorRef', 'BWTime', 'BWDate', 'Tempo', 'ReleaseDate', 'TrackYear', 'ISRC'];
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    return state.inclusive ? cue.rel_id <= state.releaseFilter.value && cue.cue_status !== 'Pulled' : cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
  }).forEach(function (row) {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
    var descriptionString = parseData(row.cue_desc).join(', ');
    var instrumentsString = parseData(row.cue_instrus_edit).join(', '); // --------------------------------------------------------------------------------------------------

    var composerArray = props.selectedComposers.filter(function (composer) {
      return composer.cue_id === row.cue_id;
    });
    var compString = '';
    var splitString = '';
    var pubString = '';

    for (var c in composerArray) {
      pubString += "".concat(composerArray[c].publisher_name);
      pubString += c < composerArray.length - 1 ? ' / ' : ' ';
      compString += "".concat(composerArray[c].last).concat(composerArray[c].suffix ? ' ' + composerArray[c].suffix : '', ", ").concat(composerArray[c].first, " ").concat(composerArray[c].middle || '', " (").concat(composerArray[c].pro_name, ")");
      compString += c < composerArray.length - 1 ? ' / ' : ' ';
      splitString += "".concat(composerArray[c].composer_split);
      splitString += c < composerArray.length - 1 ? '/' : '%';
    }

    var wavRow = [// Filename
    "DLM - ".concat(row.cue_title, ".wav"), // Manufacturer
    "DL Music", // Library
    "".concat(compString).concat(splitString), // CDTitle
    row.cat_id !== 19 && row.style_id !== 147 ? "".concat(props.categories.filter(function (cat) {
      return cat.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), ", ").concat(props.styles.filter(function (style) {
      return style.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })) : '', // TrackTitle
    row.cue_title, // Version
    /\sv[0-9]{1,2}/.test(row.cue_title) ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, '') : "", // Description
    pubString, // Category
    "".concat(props.categories.filter(function (cat) {
      return cat.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    })), // SubCategory
    "".concat(props.styles.filter(function (style) {
      return style.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // FeaturedInstrument
    instrumentsString || '', // Keywords
    descriptionString, // Composer
    "".concat(compString).concat(splitString), // Artist
    "".concat(compString).concat(splitString), // Publisher
    pubString, // DESIGNER
    pubString, // BWDescription
    pubString, // BWOriginator
    'DL-Music.com', // BWOriginator Reference
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1)), // BWTime
    row.cue_reldate_h.includes('T') ? row.cue_reldate_h.split('T')[1].split('.')[0] : row.cue_reldate_h.split(' ')[1].split('.')[0], // BWDate
    row.cue_reldate_h.split('T')[0], // Tempo
    props.tempos.filter(function (tempo) {
      return tempo.tempo_id === row.tempo_id;
    })[0].tempo_name, // ReleaseDate
    row.cue_reldate_h.split('T')[0], // TrackYear
    row.cue_reldate_h.substring(0, 4), // ISRC
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1))];
    csvData.push("".concat(wavRow.join('\t')));
    wavRow.shift();
    csvData.push(["DLM - ".concat(row.cue_title, ".aif")].concat(wavRow).join('\t'));
    csvData.push(["DLM - ".concat(row.cue_title, ".mp3")].concat(wavRow).join('\t'));
  });
  generateDownload(csvData.join('\n'), "DLM_".concat(state.releaseFilter.label + "_", "SOUNDMINER_EXPORT_").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY.MM.DD-HH_mm_ss'), ".txt"));
}; // ******************************************************************************************
//  NBCU SOUNDMINER RELEASE EXPORT FUNCTION
// ******************************************************************************************


var nbcSoundMinerExport = function nbcSoundMinerExport(props, state) {
  var headersRow = ['Filename', 'Manufacturer', 'Library', 'CDTitle', 'TrackTitle', 'Version', 'Description', 'Category', 'SubCategory', 'FeaturedInstrument', 'Keywords', 'Composer', 'Publisher', 'Designer', 'BWDescription', 'BWOriginator', 'BWOriginatorRef', 'BWTime', 'BWDate', 'Tempo', 'ReleaseDate', 'TrackYear', 'ISRC'];
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    return state.inclusive ? cue.rel_id <= state.releaseFilter.value && cue.cue_status !== 'Pulled' : cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
  }).forEach(function (row) {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
    var descriptionString = parseData(row.cue_desc).join(', ');
    var instrumentsString = parseData(row.cue_instrus_edit).join(', '); // --------------------------------------------------------------------------------------------------

    var composerArray = props.selectedComposers.filter(function (composer) {
      return composer.cue_id === row.cue_id;
    });
    var compString = '';
    var splitString = '';
    var pubString = '';

    for (var c in composerArray) {
      pubString += "".concat(composerArray[c].publisher_name);
      pubString += c < composerArray.length - 1 ? ' / ' : ' ';
      compString += "".concat(composerArray[c].last).concat(composerArray[c].suffix || '', ", ").concat(composerArray[c].first, " ").concat(composerArray[c].middle || '', " (").concat(composerArray[c].pro_name, ")");
      compString += c < composerArray.length - 1 ? ' / ' : ' ';
      splitString += "".concat(composerArray[c].composer_split);
      splitString += c < composerArray.length - 1 ? '/' : '%';
    }

    var wavRow = [// Filename
    "DLM - ".concat(row.cue_title, ".wav"), // Manufacturer
    "DL Music", // Library
    "".concat(compString).concat(splitString), // CDTitle
    row.cat_id !== 19 && row.style_id !== 147 ? "".concat(props.categories.filter(function (cat) {
      return cat.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), ", ").concat(props.styles.filter(function (style) {
      return style.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })) : '', // TrackTitle
    row.cue_title, // Version
    /\sv[0-9]{1,2}/.test(row.cue_title) ? row.cue_title.split(/\sv[0-9]{1,2}/)[1].replace(/\s?[()]/g, '') : "", // Description
    pubString, // Category
    "".concat(props.categories.filter(function (cat) {
      return cat.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    })), // SubCategory
    "".concat(props.styles.filter(function (style) {
      return style.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // FeaturedInstrument
    instrumentsString || '', // Keywords
    descriptionString, // Composer
    "".concat(compString).concat(splitString), // Publisher
    pubString, // DESIGNER
    pubString, // BWDescription
    pubString, // BWOriginator
    'DL-Music.com', // BWOriginator Reference
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1)), // BWTime
    row.cue_reldate_h.includes('T') ? row.cue_reldate_h.split('T')[1].split('.')[0] : row.cue_reldate_h.split(' ')[1].split('.')[0], // BWDate
    row.cue_reldate_h.split('T')[0], // Tempo
    props.tempos.filter(function (tempo) {
      return tempo.tempo_id === row.tempo_id;
    })[0].tempo_name, // ReleaseDate
    row.cue_reldate_h.split('T')[0], // TrackYear
    row.cue_reldate_h.substring(0, 4), // ISRC
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1))];
    csvData.push("".concat(wavRow.join('\t')));
    wavRow.shift();
    csvData.push(["DLM - ".concat(row.cue_title, ".mp3")].concat(wavRow).join('\t'));
  });
  generateDownload(csvData.join('\n'), "DLM_".concat((state.releaseFilter.label || '') + "_", "NBCU_SOUNDMINER_EXPORT_").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY.MM.DD-HH_mm_ss'), ".txt"));
}; // ******************************************************************************************
//  PROTUNES BATCH EXPORT FUNCTION
// ******************************************************************************************
// exports a batch of tracks with ratings only above 5, and splits them into 2 tiers:
// tier 2 = rating 8 - 10
// tier 1 = rating 6 - 7
// ******************************************************************************************


var proTunesExport = function proTunesExport(props, state) {
  var headersRow = ['provider filename', 'provider track id', 'title', 'version', 'primary track', 'catalog', 'instrumental', 'vocals', 'genre', 'keywords', 'mood', 'description', 'era', 'sounds-like/influences', 'instruments', 'bpm', 'lyrics', 'restrictions', 'original/cover', 'one-stop licensing', 'cd title / ref #', 'release date', 'track no', 'iswc', 'isrc', 'tier', 'ARTIST', 'COMPOSER 1 NAME', 'COMPOSER 1 PRO', 'COMPOSER 1 PRO NUMBER', 'COMPOSER 1 SPLIT', 'COMPOSER 2 NAME', 'COMPOSER 2 PRO', 'COMPOSER 2 PRO NUMBER', 'COMPOSER 2 SPLIT', 'COMPOSER 3 NAME', 'COMPOSER 3 PRO', 'COMPOSER 3 PRO NUMBER', 'COMPOSER 3 SPLIT', 'COMPOSER 4 NAME', 'COMPOSER 4 PRO', 'COMPOSER 4 PRO NUMBER', 'COMPOSER 4 SPLIT', 'COMPOSER 5 NAME', 'COMPOSER 5 PRO', 'COMPOSER 5 PRO NUMBER', 'COMPOSER 5 SPLIT', 'COMPOSER 6 NAME', 'COMPOSER 6 PRO', 'COMPOSER 6 PRO NUMBER', 'COMPOSER 6 SPLIT', 'PUBLISHER 1 NAME', 'PUBLISHER 1 PRO', 'PUBLISHER 1 PRO NUMBER', 'PUBLISHER 1 SPLIT', 'PUBLISHER 2 NAME', 'PUBLISHER 2 PRO', 'PUBLISHER 2 PRO NUMBER', 'PUBLISHER 2 SPLIT', 'PUBLISHER 3 NAME', 'PUBLISHER 3 PRO', 'PUBLISHER 3 PRO NUMBER', 'PUBLISHER 3 SPLIT', 'PUBLISHER 4 NAME', 'PUBLISHER 4 PRO', 'PUBLISHER 4 PRO NUMBER', 'PUBLISHER 4 SPLIT', 'PUBLISHER 5 NAME', 'PUBLISHER 5 PRO', 'PUBLISHER 5 PRO NUMBER', 'PUBLISHER 5 SPLIT', 'PUBLISHER 6 NAME', 'PUBLISHER 6 PRO', 'PUBLISHER 6 PRO NUMBER', 'PUBLISHER 6 SPLIT'];
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    return cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled' && cue.cue_rating > 5;
  }).forEach(function (row) {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
    var descriptionString = parseData(row.cue_desc).join(', ');
    var instrumentsString = parseData(row.cue_instrus_edit).join(', '); // --------------------------------------------------------------------------------------------------

    var composerArray = props.selectedComposers.filter(function (composer) {
      return composer.cue_id === row.cue_id;
    });
    var releaseParse = state.releaseFilter.label.split('R')[1];
    var wavRow = [// provider filename
    "DLM_".concat(row.cue_title.replace(/\s/g, '_'), ".wav"), // provider track id
    row.cue_id, // title
    row.cue_title, // version
    '', // primary track
    props.BImasterIDs.filter(function (ids) {
      return row.cue_id === ids.cue_id;
    }).map(function (id) {
      return id.master_cue_id;
    })[0], // catalog
    'DL Music', // instrumental
    'Yes', // vocals
    '', // genre
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), ", ").concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // keywords
    descriptionString, // mood
    descriptionString, // description
    '', // era
    '', // sounds-like/influences
    row.sounds_like_band_edit || '', // instruments
    instrumentsString || '', // bpm
    '', // lyrics
    '', // restrictions
    '', // original/cover
    'Original', // one-stop licensing
    'Yes', // cd title / ref #
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), ", ").concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    }), " Vol. ").concat(/\_/.test(releaseParse) ? releaseParse.split('_')[0] : releaseParse), // release date
    row.cue_reldate_h.substring(0, 4), // track no
    row.cue_id, // iswc
    '', // isrc
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1)), // tier // tier 2 = rating 8 - 10  // tier 1 = rating 6 - 7
    row.cue_rating > 7 ? 2 : 1, // ARTIST
    '', // 'COMPOSER 1 NAME'
    "".concat(composerArray[0].first + ' ').concat(composerArray[0].middle ? composerArray[0].middle + ' ' : '').concat(composerArray[0].last).concat(composerArray[0].suffix ? ' ' + composerArray[0].suffix : ''), // 'COMPOSER 1 PRO'
    composerArray[0].pro_name, // 'COMPOSER 1 PRO NUMBER'
    composerArray[0].cae, // 'COMPOSER 1 SPLIT'
    composerArray[0].composer_split, // 'COMPOSER 2 NAME'
    composerArray[1] ? "".concat(composerArray[1].first + ' ').concat(composerArray[1].middle ? composerArray[1].middle + ' ' : '').concat(composerArray[1].last).concat(composerArray[1].suffix ? ' ' + composerArray[1].suffix : '') : '', // 'COMPOSER 2 PRO'
    composerArray[1] ? composerArray[1].pro_name : '', // 'COMPOSER 2 PRO NUMBER'
    composerArray[1] ? composerArray[1].cae : '', // 'COMPOSER 2 SPLIT'
    composerArray[1] ? composerArray[1].composer_split : '', // 'COMPOSER 3 NAME'
    composerArray[2] ? "".concat(composerArray[2].first + ' ').concat(composerArray[2].middle ? composerArray[2].middle + ' ' : '').concat(composerArray[2].last).concat(composerArray[2].suffix ? ' ' + composerArray[2].suffix : '') : '', // 'COMPOSER 3 PRO'
    composerArray[2] ? composerArray[2].pro_name : '', // 'COMPOSER 3 PRO NUMBER'
    composerArray[2] ? composerArray[2].cae : '', // 'COMPOSER 3 SPLIT'
    composerArray[2] ? composerArray[2].composer_split : '', // 'COMPOSER 4 NAME'
    composerArray[3] ? "".concat(composerArray[3].first + ' ').concat(composerArray[3].middle ? composerArray[3].middle + ' ' : '').concat(composerArray[3].last).concat(composerArray[3].suffix ? ' ' + composerArray[3].suffix : '') : '', // 'COMPOSER 4 PRO'
    composerArray[3] ? composerArray[3].pro_name : '', // 'COMPOSER 4 PRO NUMBER'
    composerArray[3] ? composerArray[3].cae : '', // 'COMPOSER 4 SPLIT'
    composerArray[3] ? composerArray[3].composer_split : '', // 'COMPOSER 5 NAME'
    composerArray[4] ? "".concat(composerArray[4].first + ' ').concat(composerArray[4].middle ? composerArray[4].middle + ' ' : '').concat(composerArray[4].last).concat(composerArray[4].suffix ? ' ' + composerArray[4].suffix : '') : '', // 'COMPOSER 5 PRO'
    composerArray[4] ? composerArray[4].pro_name : '', // 'COMPOSER 5 PRO NUMBER'
    composerArray[4] ? composerArray[4].cae : '', // 'COMPOSER 5 SPLIT'
    composerArray[4] ? composerArray[4].composer_split : '', // 'COMPOSER 6 NAME'
    composerArray[5] ? "".concat(composerArray[5].first + ' ').concat(composerArray[5].middle ? composerArray[5].middle + ' ' : '').concat(composerArray[5].last).concat(composerArray[5].suffix ? ' ' + composerArray[5].suffix : '') : '', // 'COMPOSER 6 PRO'
    composerArray[5] ? composerArray[5].pro_name : '', // 'COMPOSER 6 PRO NUMBER'
    composerArray[5] ? composerArray[5].cae : '', // 'COMPOSER 6 SPLIT'
    composerArray[5] ? composerArray[5].composer_split : '', // 'PUBLISHER 1 NAME'
    composerArray[0].name_only, // 'PUBLISHER 1 PRO'
    composerArray[0].publisher_pro, // 'PUBLISHER 1 PRO NUMBER'
    composerArray[0].ipi, // 'PUBLISHER 1 SPLIT'
    composerArray[0].composer_split, // 'PUBLISHER 2 NAME'
    composerArray[1] ? composerArray[1].name_only : '', // 'PUBLISHER 2 PRO'
    composerArray[1] ? composerArray[1].publisher_pro : '', // 'PUBLISHER 2 PRO NUMBER'
    composerArray[1] ? composerArray[1].ipi : '', // 'PUBLISHER 2 SPLIT'
    composerArray[1] ? composerArray[1].composer_split : '', // 'PUBLISHER 3 NAME'
    composerArray[2] ? composerArray[2].name_only : '', // 'PUBLISHER 3 PRO'
    composerArray[2] ? composerArray[2].publisher_pro : '', // 'PUBLISHER 3 PRO NUMBER'
    composerArray[2] ? composerArray[2].ipi : '', // 'PUBLISHER 3 SPLIT'
    composerArray[2] ? composerArray[2].composer_split : '', // 'PUBLISHER 4 NAME'
    composerArray[3] ? composerArray[3].name_only : '', // 'PUBLISHER 4 PRO'
    composerArray[3] ? composerArray[3].publisher_pro : '', // 'PUBLISHER 4 PRO NUMBER'
    composerArray[3] ? composerArray[3].ipi : '', // 'PUBLISHER 4 SPLIT'
    composerArray[3] ? composerArray[3].composer_split : '', // 'PUBLISHER 5 NAME'
    composerArray[4] ? composerArray[4].name_only : '', // 'PUBLISHER 5 PRO'
    composerArray[4] ? composerArray[4].publisher_pro : '', // 'PUBLISHER 5 PRO NUMBER'
    composerArray[4] ? composerArray[4].ipi : '', // 'PUBLISHER 5 SPLIT'
    composerArray[4] ? composerArray[4].composer_split : '', // 'PUBLISHER 6 NAME'
    composerArray[5] ? composerArray[5].name_only : '', // 'PUBLISHER 6 PRO'
    composerArray[5] ? composerArray[5].publisher_pro : '', // 'PUBLISHER 6 PRO NUMBER'
    composerArray[5] ? composerArray[5].ipi : '', // 'PUBLISHER 6 SPLIT'
    composerArray[5] ? composerArray[5].composer_split : ''];
    csvData.push("".concat(wavRow.join('\t')));
  });
  generateDownload(csvData.join('\n'), "DLM_".concat(state.releaseFilter.label + "_", "PROTUNES_TIERED_EXPORT_").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY.MM.DD-HH_mm_ss'), ".txt"));
}; // ******************************************************************************************
//  ALTER K RELEASES EXPORT FUNCTION
// ------------------------------------------------------------------------------------------
//  done & perfect
// ******************************************************************************************


var alterKExport = function alterKExport(props, state) {
  var headersRow = ['Category', 'CD #', 'Composer', 'Description', 'Duration', 'Instrumentation', 'PRO', 'Publisher', 'Release', 'Composer Split', 'Publisher Split', 'Style', 'Tempo', 'Song Title', 'Track #', 'Track ID', 'Cue Rating', 'ISRC', 'Sounds Like Band', 'Sounds Like Film'];
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    return cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
  }).forEach(function (row) {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
    var descriptionString = parseData(row.cue_desc).join(', ');
    var instrumentsString = parseData(row.cue_instrus_edit).join(', '); // --------------------------------------------------------------------------------------------------
    // creates composer/publisher/splits data
    // --------------------------------------------------------------------------------------------------

    var compString = '';
    var proString = '';
    var pubString = '';
    var splitString = '';
    var pubSplit = '';
    var composerArray = props.selectedComposers.filter(function (composer) {
      return composer.cue_id === row.cue_id;
    });

    for (var c in composerArray) {
      compString += "".concat(composerArray[c].first).concat(composerArray[c].middle ? ' ' + composerArray[c].middle : '', " ").concat(composerArray[c].last).concat(composerArray[c].suffix ? ' ' + composerArray[c].suffix : '');
      compString += c < composerArray.length - 1 ? ' / ' : '';
      proString += c > 0 && proString !== composerArray[c].pro_name ? ' / ' : '';
      proString += composerArray[c].pro_name !== proString ? composerArray[c].pro_name : '';
      pubString += c > 0 && pubString !== composerArray[c].publisher_name ? ' / ' : '';
      pubString += (composerArray[c].pro_name === 'ASCAP' || 'BMI' || 'SESAC') && pubString.split('/')[0].trim() !== composerArray[c].publisher_name ? "".concat(composerArray[c].publisher_name) : '';
      splitString += "".concat(composerArray[c].composer_split !== 100 ? composerArray[c].composer_split.toFixed(2) : composerArray[c].composer_split);
      splitString += c < composerArray.length - 1 ? ' / ' : '';
      pubSplit = pubString.includes('/') ? "50.00 / 50.00" : '100';
    } // --------------------------------------------------------------------------------------------------


    var wavRow = [// 'Category'
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    })), // 'CD #'
    "DLM".concat(row.style_id.toString().padStart(3, 0)), // 'Composer'
    compString, // 'Description'
    descriptionString, // 'Duration'
    row.cue_duration, // 'Instrumentation'
    instrumentsString, // 'PRO'
    proString, // 'Publisher'
    pubString, // 'Release'
    state.releaseFilter.label, // 'Composer Split'
    splitString, // 'Publisher Split'
    pubSplit, // 'Style'
    "".concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    })), // 'Tempo'
    props.tempos.filter(function (tempo) {
      return tempo.tempo_id === row.tempo_id;
    })[0].tempo_name, // 'Song Title'
    row.cue_title, // 'Track #'
    row.cue_id, // 'Track ID'
    row.cue_id, // 'Cue Rating'
    'N/A', // row.cue_rating,
    // ISRC
    "US-RRD-".concat(row.cue_reldate_h.substring(2, 4), "-").concat(row.cue_id.toString().slice(1)), // 'Sounds Like Band'
    row.sounds_like_band_edit || 'N/A', // 'Sounds Like Film'
    row.sounds_like_film_edit || 'N/A'];
    csvData.push("".concat(wavRow.join('\t')));
  });
  generateDownload(csvData.join('\n'), "DLM_".concat(state.releaseFilter.label + "_", "ALTER_K_EXPORT_").concat(moment__WEBPACK_IMPORTED_MODULE_0___default()().format('YYYY.MM.DD-HH_mm_ss'), ".txt"));
}; // ******************************************************************************************
// Source Audio EXPORT FUNCTION
// ------------------------------------------------------------------------------------------
// this is where i left off 666 ***
// ******************************************************************************************


var sourceAudioExport = function sourceAudioExport(props, state) {
  var headersRow = ['xx MAIN VERSION TITLE xx', 'Sourceaudio Id', 'Catalog', 'Label', 'Title', 'Filename', 'Master ID', 'Album', 'Album Code', 'Album Description', 'Album Genre', 'Track Number', 'Artist', 'Composer', 'Publisher', 'Genres', 'Tempos', 'Cue Types', 'Bpm', 'Release Date', 'Description', 'Mood', 'Style', 'Style Of', 'Lyrics', 'Has Vocal', 'Explicit', 'Isrc', 'Iswc', 'Publisher 1 Company', 'Publisher 1 Pro Affiliation', 'Publisher 1 CAE/IPI', 'Publisher 1 Ownership Share', 'Publisher 1 Role', 'Publisher 1 Collection Share Percentage', 'Publisher 1 Collection Share Territory', 'Writer 1 First Name', 'Writer 1 Last Name', 'Writer 1 Company', 'Writer 1 Pro Affiliation', 'Writer 1 CAE/IPI', 'Writer 1 Ownership Share', 'Writer 1 Publisher', 'Writer 1 Role', 'Publisher 2 Company', 'Publisher 2 Pro Affiliation', 'Publisher 2 CAE/IPI', 'Publisher 2 Ownership Share', 'Publisher 2 Role', 'Publisher 2 Collection Share Percentage', 'Publisher 2 Collection Share Territory', 'Writer 2 First Name', 'Writer 2 Last Name', 'Writer 2 Company', 'Writer 2 Pro Affiliation', 'Writer 2 CAE/IPI', 'Writer 2 Ownership Share', 'Writer 2 Publisher', 'Writer 2 Role', 'Publisher 3 Company', 'Publisher 3 Pro Affiliation', 'Publisher 3 CAE/IPI', 'Publisher 3 Ownership Share', 'Publisher 3 Role', 'Publisher 3 Collection Share Percentage', 'Publisher 3 Collection Share Territory', 'Writer 3 First Name', 'Writer 3 Last Name', 'Writer 3 Company', 'Writer 3 Pro Affiliation', 'Writer 3 CAE/IPI', 'Writer 3 Ownership Share', 'Writer 3 Publisher', 'Writer 3 Role', 'Publisher 4 Company', 'Publisher 4 Pro Affiliation', 'Publisher 4 CAE/IPI', 'Publisher 4 Ownership Share', 'Publisher 4 Role', 'Publisher 4 Collection Share Percentage', 'Publisher 4 Collection Share Territory', 'Writer 4 First Name', 'Writer 4 Last Name', 'Writer 4 Company', 'Writer 4 Pro Affiliation', 'Writer 4 CAE/IPI', 'Writer 4 Ownership Share', 'Writer 4 Publisher', 'Writer 4 Role', 'Publisher 5 Company', 'Publisher 5 Pro Affiliation', 'Publisher 5 CAE/IPI', 'Publisher 5 Ownership Share', 'Publisher 5 Role', 'Publisher 5 Collection Share Percentage', 'Publisher 5 Collection Share Territory', 'Writer 5 First Name', 'Writer 5 Last Name', 'Writer 5 Company', 'Writer 5 Pro Affiliation', 'Writer 5 CAE/IPI', 'Writer 5 Ownership Share', 'Writer 5 Publisher', 'Writer 5 Role', 'Instrumentation', 'Pro', 'Release'];
  console.log('testing');
  var csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(function (cue) {
    return cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled';
  }).forEach(function (row) {
    var releaseParse = state.releaseFilter.label.split('R')[1]; // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------

    var descriptionString = parseData(row.cue_desc).join(', ');
    var instrumentsString = parseData(row.cue_instrus_edit).join(', '); // --------------------------------------------------------------------------------------------------
    // creates composer/publisher/splits data
    // --------------------------------------------------------------------------------------------------

    var compString = '';
    var proString = '';
    var pubString = '';
    var splitString = '';
    var pubSplit = '';
    var composerArray = props.selectedComposers.filter(function (composer) {
      return composer.cue_id === row.cue_id;
    });

    for (var c in composerArray) {
      compString += "".concat(composerArray[c].first).concat(composerArray[c].middle ? ' ' + composerArray[c].middle : '', " ").concat(composerArray[c].last).concat(composerArray[c].suffix ? ' ' + composerArray[c].suffix : '');
      compString += c < composerArray.length - 1 ? ' / ' : '';
      proString += c > 0 && proString !== composerArray[c].pro_name ? ' / ' : '';
      proString += composerArray[c].pro_name !== proString ? composerArray[c].pro_name : '';
      pubString += c > 0 && pubString !== composerArray[c].publisher_name ? ' / ' : '';
      pubString += (composerArray[c].pro_name === 'ASCAP' || 'BMI' || 'SESAC') && pubString.split('/')[0].trim() !== composerArray[c].publisher_name ? "".concat(composerArray[c].publisher_name) : '';
      splitString += "".concat(composerArray[c].composer_split !== 100 ? composerArray[c].composer_split.toFixed(2) : composerArray[c].composer_split);
      splitString += c < composerArray.length - 1 ? ' / ' : '';
      pubSplit = pubString.includes('/') ? "50.00 / 50.00" : '100';
    } // --------------------------------------------------------------------------------------------------


    var wavRow = [// xx MAIN VERSION TITLE xx
    row.cue_title, // Sourceaudio Id
    '', // Catalog
    'DL Music', // Label
    'DL Music', // Title
    row.cue_title, // Filename
    "DLM - ".concat(row.cue_title, ".mp3"), // Master ID
    'formula', // Album
    "".concat(props.categories.filter(function (categories) {
      return categories.cat_id === row.cat_id;
    }).map(function (cat) {
      return cat.cat_name;
    }), ", ").concat(props.styles.filter(function (styles) {
      return styles.style_id === row.style_id;
    }).map(function (style) {
      return style.style_name;
    }), " Vol. ").concat(/\_/.test(releaseParse) ? releaseParse.split('_')[0] : releaseParse) // Album Code
    // Album Description
    // Album Genre
    // Track Number
    // Artist
    // Composer
    // Publisher
    // Genres
    // Tempos
    // Cue Types
    // Bpm
    // Release Date
    // Description
    // Mood
    // Style
    // Style Of
    // Lyrics
    // Has Vocal
    // Explicit
    // Isrc
    // Iswc
    // Publisher 1 Company
    // Publisher 1 Pro Affiliation
    // Publisher 1 CAE/IPI
    // Publisher 1 Ownership Share
    // Publisher 1 Role
    // Publisher 1 Collection Share Percentage
    // Publisher 1 Collection Share Territory
    // Writer 1 First Name
    // Writer 1 Last Name
    // Writer 1 Company
    // Writer 1 Pro Affiliation
    // Writer 1 CAE/IPI
    // Writer 1 Ownership Share
    // Writer 1 Publisher
    // Writer 1 Role
    // Publisher 2 Company
    // Publisher 2 Pro Affiliation
    // Publisher 2 CAE/IPI
    // Publisher 2 Ownership Share
    // Publisher 2 Role
    // Publisher 2 Collection Share Percentage
    // Publisher 2 Collection Share Territory
    // Writer 2 First Name
    // Writer 2 Last Name
    // Writer 2 Company
    // Writer 2 Pro Affiliation
    // Writer 2 CAE/IPI
    // Writer 2 Ownership Share
    // Writer 2 Publisher
    // Writer 2 Role
    // Publisher 3 Company
    // Publisher 3 Pro Affiliation
    // Publisher 3 CAE/IPI
    // Publisher 3 Ownership Share
    // Publisher 3 Role
    // Publisher 3 Collection Share Percentage
    // Publisher 3 Collection Share Territory
    // Writer 3 First Name
    // Writer 3 Last Name
    // Writer 3 Company
    // Writer 3 Pro Affiliation
    // Writer 3 CAE/IPI
    // Writer 3 Ownership Share
    // Writer 3 Publisher
    // Writer 3 Role
    // Publisher 4 Company
    // Publisher 4 Pro Affiliation
    // Publisher 4 CAE/IPI
    // Publisher 4 Ownership Share
    // Publisher 4 Role
    // Publisher 4 Collection Share Percentage
    // Publisher 4 Collection Share Territory
    // Writer 4 First Name
    // Writer 4 Last Name
    // Writer 4 Company
    // Writer 4 Pro Affiliation
    // Writer 4 CAE/IPI
    // Writer 4 Ownership Share
    // Writer 4 Publisher
    // Writer 4 Role
    // Publisher 5 Company
    // Publisher 5 Pro Affiliation
    // Publisher 5 CAE/IPI
    // Publisher 5 Ownership Share
    // Publisher 5 Role
    // Publisher 5 Collection Share Percentage
    // Publisher 5 Collection Share Territory
    // Writer 5 First Name
    // Writer 5 Last Name
    // Writer 5 Company
    // Writer 5 Pro Affiliation
    // Writer 5 CAE/IPI
    // Writer 5 Ownership Share
    // Writer 5 Publisher
    // Writer 5 Role
    // Instrumentation
    // Pro
    // Release
    ];
    csvData.push("".concat(wavRow.join('\t')));
    console.log(767, wavRow);
  }); // generateDownload(csvData.join('\n'), `DLM_${state.releaseFilter.label + "_"}ALTER_K_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
}; // ******************************************************************************************
// parseData function
// ------------------------------------------------------------------------------------------
// this function capitalizes all the words in the descriptions and insturments of each cue,
// it also removes blank spaces and trailing commas
// ******************************************************************************************


var parseData = function parseData(array) {
  var parsedArray = [];

  if (array !== null) {
    array.split(', ').forEach(function (desc) {
      var wordArray = [];
      desc.replace(',', '').split(' ').forEach(function (word) {
        word.replace(/\w\S*/g, function (txt) {
          wordArray.push(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
        });
      });

      if (wordArray[0] !== undefined) {
        parsedArray.push(wordArray.join(' '));
      }
    });
  }

  return parsedArray;
}; // ******************************************************************************************
// generateDownload function
// ------------------------------------------------------------------------------------------
// this function takes the fileName as an argument and generates a link for that export
// ******************************************************************************************


var generateDownload = function generateDownload(csvData, fileName) {
  var downloadLink = document.createElement("a");
  var blob = new Blob(["\uFEFF", csvData]);
  var url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

 // ******************************************************************************************
// ******************************************************************************************

/***/ })

}]);
//# sourceMappingURL=4.bundle.js.map