(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{332:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),r=n(2),c=n(26),s={selectHeader:c.f,showCategories:c.g,showInstruments:c.h,showKeywords:c.i,showRatings:c.j,showStyles:c.k,showTempos:c.l,showTextBox:c.m},i=Object(r.b)(function(e){return{composersIA:e.composersBI,instrumentsIA:e.instrumentsBI,keywordsIA:e.keywordsBI,modal:e.modal,releasesIA:e.releasesIA,ratings:e.ratings,selectedCategories:e.selectedCategories,selectedLibrary:e.selectedLibrary,selectedStyles:e.selectedStyles,styles:e.styles,tempos:e.tempos,tracks:e.tracks}},s)(function(e){e.batchesBI;var t=e.modal,n=(e.ratings,e.releasesIA,e.selectedCategories),a=(e.selectedCue,e.selectedLibrary),r=e.selectedStyles,c=e.showCategories,s=e.showInstruments,i=e.showKeywords,o=e.showRatings,d=e.showStyles,u=e.showTempos,m=e.showTextBox,_=e.tempos,f=function(){m(t,event.target.getAttribute("texttype"))};return l.a.createElement("div",{className:"modal-left-column"},l.a.createElement("div",{className:"modal-category"},l.a.createElement("strong",null,"Catalog Name:")," ","background-instrumentals"===a.libraryName?"Background Instrumentals":"independent-artists"===a.libraryName?"Independent Artists":null),l.a.createElement("div",{className:"modal-category"},l.a.createElement("strong",null,"Status:")," ",t.selectedCue?t.selectedCue.cue_status:null),l.a.createElement("div",{className:"modal-category-select",onClick:function(){c(t)}},l.a.createElement("strong",null,"Category:")," ",t.selectedCategories?n.filter(function(e){return e.cat_id===t.selectedCue.cat_id}).map(function(e){return e.cat_name}):null),l.a.createElement("div",{className:"modal-category-select",onClick:function(){d(t),document.getElementById("search-filter")&&(document.getElementById("search-filter").value="")}},l.a.createElement("strong",null,"Style: ")," ",r?r.filter(function(e){return e.style_id===t.selectedCue.style_id}).map(function(e){return e.style_name}):null),l.a.createElement("div",{className:"modal-category"},l.a.createElement("strong",null,"Composer(s): ")," ",1===t.selectedComposer.length?t.selectedComposer.map(function(e,t){return"".concat(e.composer_name," (").concat(e.pro_name,") ").concat(e.composer_split,"%")}):t.selectedComposer.map(function(e,t){return"".concat(e.composer_name," (").concat(e.pro_name,") ").concat(e.composer_split,"%  ").concat(String.fromCodePoint(183)," ")})),l.a.createElement("div",{className:"modal-category"},l.a.createElement("strong",null,"Publisher(s): ")," ",1===t.selectedComposer.length?t.selectedComposer.map(function(e,t){return"".concat(e.publisher_name,"  ").concat(e.composer_split,"%")}):t.selectedComposer.map(function(e,t){return"".concat(e.publisher_name,"  ").concat(e.composer_split,"% ").concat(String.fromCodePoint(183),"  ")})),l.a.createElement("div",{className:"modal-category-select",onClick:function(){s(t),document.getElementById("search-filter")&&(document.getElementById("search-filter").value="")}},l.a.createElement("strong",null,"Instruments: ")," ",t.selectedCue.cue_instrus_edit),l.a.createElement("div",{className:"modal-category-select",onClick:function(){i(t),document.getElementById("search-filter")&&(document.getElementById("search-filter").value="")}},l.a.createElement("strong",null,"Keywords: ")," ",t.selectedCue.cue_desc),l.a.createElement("div",{className:"modal-category-select",onClick:function(){u(t)}},l.a.createElement("strong",null,"Tempo: ")," ",_.filter(function(e){return e.tempo_id===t.selectedCue.tempo_id}).map(function(e){return e.tempo_name})),l.a.createElement("div",{className:"modal-category-select",onClick:function(){o(t)}},l.a.createElement("strong",null,"Rating: ")," ",t.selectedCue.cue_rating),"background-instrumentals"===a.libraryName?l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("div",{className:"modal-category-select",onClick:f,texttype:"sounds_like_band_edit"},l.a.createElement("strong",{texttype:"sounds_like_band_edit"},"Sounds Like Band: ")," ",t.selectedCue.sounds_like_band_edit),l.a.createElement("br",null),l.a.createElement("div",{className:"modal-category-select",onClick:f,texttype:"sounds_like_film_edit"},l.a.createElement("strong",{texttype:"sounds_like_film_edit"},"Sounds Like Film/TV: ")," ",t.selectedCue.sounds_like_film_edit),l.a.createElement("br",null),l.a.createElement("div",{className:"modal-category-select",onClick:f,texttype:"sounds_like_composer_edit"},l.a.createElement("strong",{texttype:"sounds_like_composer_edit"},"Sounds Like Composer: ")," ",t.selectedCue.sounds_like_composer_edit)):null)}),o=n(43),d=n.n(o),u=function(e){return l.a.createElement("div",null,l.a.createElement("textarea",{className:"text-area",value:e.value,texttype:e.textType,onChange:e.handleChange}))},m=n(66),_=n(31),f=n(37),y=n(38),k=n(216),v=n(32),p=n(36),h=n(35),C={clearSearch:c.a,handleSearchFilter:c.c,saveIAKeyword:m.b,selectCategory:_.c,selectInstruments:f.c,selectKeywords:y.c,selectRating:k.b,selectStyle:v.c,selectTempos:p.c,updateTracks:h.b,updateData:c.o},E=Object(r.b)(function(e){return{isPlaying:e.isPlaying,modal:e.modal,ratings:e.ratings,searchFilter:e.searchFilter,selectedCategories:e.selectedCategories,selectedInstruments:e.selectedInstruments,selectedKeywords:e.selectedKeywords,selectedLibrary:e.selectedLibrary,selectedStyles:e.selectedStyles,tempos:e.tempos,tracks:e.tracks}},C)(function(e){var t,n,a=e.handleSearchFilter,r=e.modal,c=e.ratings,s=e.saveIAKeyword,i=e.searchFilter,o=e.selectedCategories,m=e.selectCategory,_=e.selectedInstruments,f=e.selectInstruments,y=e.selectedLibrary,k=e.selectedKeywords,v=e.selectKeywords,p=(e.selectedRating,e.selectRating),h=e.selectedStyles,C=e.selectStyle,E=e.selectTempos,g=e.tempos,b=e.tracks,w=e.updateTracks,N=e.updateData,I=function(e){var t=o,n=r.selectedCue;if(19!==n.cat_id)if(n.cat_id!==e.cat_id){for(var a in n.cat_id=e.cat_id,t)t[a].cat_id===e.cat_id?t[a].selected=!0:t[a].selected=!1;N(r,n),m(t),w(n,b)}else{for(var l in n.cat_id=19,t)t[l].cat_id===e.cat_id&&(t[l].selected=!1);N(r,n),m(t),w(n,b)}else{for(var c in n.cat_id=e.cat_id,t)t[c].cat_id===e.cat_id&&(t[c].selected=!0);N(r,n),m(t),w(n,b)}},A=function(e){var t=h,n=r.selectedCue;if(147!==n.style_id)if(n.style_id!==e.style_id){for(var a in n.style_id=e.style_id,t)t[a].style_id===e.style_id?t[a].selected=!0:t[a].selected=!1;N(r,n),C(t),w(n,b)}else{for(var l in n.style_id=147,t)t[l].style_id===e.style_id&&(t[l].selected=!1);N(r,n),C(t),w(n,b)}else{for(var c in n.style_id=e.style_id,t)t[c].style_id===e.style_id&&(t[c].selected=!0);N(r,n),C(t),w(n,b)}},S=function(e){var t=_,n=e,a=r.selectedCue;if(null!==a.cue_instrus_edit&&""!==a.cue_instrus_edit){var l=a.cue_instrus_edit.split(",").map(function(e){return e.trim()});if(-1===l.indexOf(n)){for(var c in a.cue_instrus_edit="".concat(l.join(", "),", ").concat(n),t)t[c].instru_name===n&&(t[c].selected=!0);f(t),N(r,a),w(a,b)}else{var s=l.indexOf(n);for(var i in l.splice(s,1),a.cue_instrus_edit=l.join(", ").trim(),t)t[i].instru_name===n&&(t[i].selected=!1);f(t),N(r,a),w(a,b)}}else{for(var o in a.cue_instrus_edit="".concat(n),t)t[o].instru_name===n&&(t[o].selected=!0);f(t),N(r,a),w(a,b)}},x=function(e){var t=k,n=e;n.key_name=n.key_name.charAt(0).toUpperCase()+n.key_name.slice(1);var a=r.selectedCue,l=a.key_id_arry.split(",");if(null!==a.cue_desc&&""!==a.cue_desc){var c=a.cue_desc.split(",").map(function(e){return e.trim()});if(-1===c.indexOf(n.key_name)){for(var s in a.cue_desc="".concat(c.join(", "),", ").concat(n.key_name),t)t[s].key_name===n.key_name&&(t[s].selected=!0,t[s].key_cnt++,n=t[s]);l.push(e.key_id),a.key_id_arry=l.join(","),B(t,b,r,n,a)}else{for(var i in l.splice(l.indexOf(e.key_id),1),a.key_id_arry=l.join(","),c.splice(c.indexOf(n.key_name),1),a.cue_desc=c.join(", "),t)t[i].key_name===n.key_name&&(t[i].selected=!1,t[i].key_cnt--,n=t[i]);B(t,b,r,n,a)}}else{for(var o in a.cue_desc="".concat(n.key_name),t)t[o].key_name===n.key_name&&(t[o].selected=!0,t[o].key_cnt++,n=t[o]);l.push(e.key_id),a.key_id_arry=l.join(","),B(t,b,r,n,a)}},B=function(e,t,n,a,l){"independent-artists"===y.libraryName&&(s(a,e),N(n,l),v(e),w(l,t))},L=function(e){var t=g,n=r.selectedCue;if(28!==n.tempo_id)if(n.tempo_id!==e.tempo_id){for(var a in n.tempo_id=e.tempo_id,t)t[a].tempo_id===e.tempo_id?t[a].selected=!0:t[a].selected=!1;N(r,n),E(t),w(n,b)}else{for(var l in n.tempo_id=28,t)t[l].tempo_id===e.tempo_id&&(t[l].selected=!1);N(r,n),E(t),w(n,b)}else{for(var c in n.tempo_id=e.tempo_id,t)t[c].tempo_id===e.tempo_id&&(t[c].selected=!0);N(r,n),E(t),w(n,b)}},T=function(e){var t=c,n=r.selectedCue;if(0!==n.cue_rating)if(n.cue_rating!==e.value){for(var a in n.cue_rating=e.value,t)t[a].value===e.value?t[a].selected=!0:t[a].selected=!1;N(r,n),p(t),w(n,b)}else{for(var l in n.cue_rating,t)t[l].value===e.value&&(t[l].selected=!1);N(r,n),p(t),w(n,b)}else{for(var s in n.cue_rating=e.value,t)t[s].value===e.value&&(t[s].selected=!0);N(r,n),p(t),w(n,b)}},F=function(e){var t=r.selectedCue;switch(e.target.getAttribute("texttype")){case"sounds_like_band_edit":t.sounds_like_band_edit=e.target.value,N(r,t);break;case"sounds_like_film_edit":t.sounds_like_film_edit=e.target.value,N(r,t);break;case"sounds_like_composer_edit":t.sounds_like_composer_edit=e.target.value,N(r,t)}},K=r.showInstruments||r.showKeywords||r.showStyles?l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("input",{className:"search-bar",id:"search-filter",name:"search",onChange:function(e){return a(e.target.value,r)&(document.getElementsByClassName("scrollableModalDiv")[0]&&O())},onClick:function(){document.getElementById("search-filter")&&document.getElementById("search-filter").focus()},type:"text",value:i}),l.a.createElement("button",{onClick:function(){}},"Add"),l.a.createElement("button",{onClick:function(){a("",r),document.getElementById("search-filter").value=""}},"Clear"),l.a.createElement("br",null),l.a.createElement("br",null)):l.a.createElement("br",null),O=function(){var e=document.getElementsByClassName("scrollableModalDiv")[0];e&&(e.scrollTop=0)};return l.a.createElement("div",{className:"modal-right-column"},K,l.a.createElement("div",null,r.showText?function(e){switch(e){case"sounds_like_band_edit":return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("strong",null," Sounds like Bands: "),l.a.createElement(u,{handleChange:F,value:r.selectedCue.sounds_like_band_edit||"",textType:"sounds_like_band_edit"}));case"sounds_like_film_edit":return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("strong",null," Sounds like Films: "),l.a.createElement(u,{handleChange:F,value:r.selectedCue.sounds_like_film_edit||"",textType:"sounds_like_film_edit"}));case"sounds_like_composer_edit":return l.a.createElement("div",null,l.a.createElement("br",null),l.a.createElement("strong",null," Sounds like Composers: "),l.a.createElement(u,{handleChange:F,value:r.selectedCue.sounds_like_composer_edit||"",textType:"sounds_like_composer_edit"}))}}(event.target.getAttribute("texttype")):r.showCategories||r.showStyles||r.showInstruments||r.showKeywords||r.showTempos||r.showRating?l.a.createElement("div",{style:{overflowY:"hidden",height:"550px"}},l.a.createElement(d.a,{className:"scrollableModalDiv",dataLength:14,hasMore:!0,height:600,id:"scrollableModalDiv",endMessage:l.a.createElement("p",{style:{textAlign:"center"}},l.a.createElement("b",null))},r.showCategories?(t=o,n=r.selectedCue,t.forEach(function(e){e.cat_id===n.cat_id&&(e.selected=!0)}),t.map(function(e){return l.a.createElement("div",{key:"".concat(e.cat_name," - ").concat(e.cat_id),className:e.selected?"modal-selected":"modal-select",id:e.cat_id,onClick:function(){return I(e)}},e.cat_name)})):r.showStyles?function(){var e=h.filter(function(e){return-1!==e.style_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())}),t=r.selectedCue;if(147!==t.style_id){e.forEach(function(e){e.style_id===t.style_id&&(e.selected=!0)});for(var n=e.filter(function(e){return!0===e.selected}).concat(e.filter(function(e){return!1===e.selected})).map(function(e){return l.a.createElement("div",{key:"".concat(e.style_name," - ").concat(e.style_id),className:e.selected?"modal-selected":"modal-select",id:e.style_id,onClick:function(){return A(e)}},e.style_name)}),a=0;a<5;a++)n.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(a)},"Blank"));return n}for(var c=h.filter(function(e){return-1!==e.style_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())}).map(function(e){return l.a.createElement("div",{key:"".concat(e.style_name," - ").concat(e.style_id),className:e.selected?"modal-selected":"modal-select",id:e.style_id,onClick:function(){return A(e)}},e.style_name)}),s=0;s<5;s++)c.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(s)},"Blank"));return c}():r.showInstruments?function(){if(""!==r.searchFilter&&r.selectedCue.cue_instrus_edit){var e=_.filter(function(e){return-1!==e.instru_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())});r.selectedCue.cue_instrus_edit.split(",").forEach(function(t){for(var n in e)e[n].instru_name.toLowerCase().trim()===t.toLowerCase().trim()&&(e[n].selected=!0),e[n].instru_name=e[n].instru_name.charAt(0).toUpperCase()+e[n].instru_name.slice(1)});var t=e.filter(function(e){return!0===e.selected}).concat(e.filter(function(e){return!1===e.selected})).map(function(e){return l.a.createElement("div",{key:"".concat(e.instru_id),className:e.selected?"modal-selected":"modal-select",count:e.instru_cnt,id:e.instru_id,onClick:function(){return S(e.instru_name)}},e.instru_name)});if(0===t.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Instrument");for(var n=0;n<5;n++)t.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(n)},"Blank"));return t}if(""===r.searchFilter&&r.selectedCue.cue_instrus_edit){var a=_.filter(function(e){return-1!==e.instru_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())});r.selectedCue.cue_instrus_edit.split(",").forEach(function(e){for(var t in a)a[t].instru_name.toLowerCase().trim()===e.toLowerCase().trim()&&(a[t].selected=!0),a[t].instru_name=a[t].instru_name.charAt(0).toUpperCase()+a[t].instru_name.slice(1)});var c=a.filter(function(e){return!0===e.selected}).concat(a.filter(function(e){return!1===e.selected})).map(function(e){return l.a.createElement("div",{key:"".concat(e.instru_id),className:e.selected?"modal-selected":"modal-select",count:e.instru_cnt,id:e.instru_id,onClick:function(){return S(e.instru_name)}},e.instru_name)});if(0===c.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Instrument");for(var s=0;s<5;s++)c.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(s)},"Blank"));return c}var i=_.filter(function(e){return-1!==e.instru_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())}).map(function(e){return l.a.createElement("div",{key:"".concat(e.instru_id),className:e.selected?"modal-selected":"modal-select",count:e.instru_cnt,id:e.instru_id,onClick:function(){return S(e.instru_name)}},e.instru_name.charAt(0).toUpperCase()+e.instru_name.slice(1))});if(0===i.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Instrument");for(var o=0;o<5;o++)i.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(o)},"Blank"));return i}():r.showKeywords?function(){if(""!==r.searchFilter&&r.selectedCue.cue_desc){var e=k.filter(function(e){return-1!==e.key_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())});r.selectedCue.cue_desc.split(",").forEach(function(t){for(var n in e)e[n].key_name.toLowerCase().trim()===t.toLowerCase().trim()&&(e[n].selected=!0),e[n].key_name=e[n].key_name.charAt(0).toUpperCase()+e[n].key_name.slice(1)});var t=e.filter(function(e){return!0===e.selected}).concat(e.filter(function(e){return!1===e.selected})).map(function(e){return l.a.createElement("div",{key:"".concat(e.key_id),className:e.selected?"modal-selected":"modal-select",count:e.key_cnt,id:e.key_id,onClick:function(){return x(e)}},e.key_name)});if(0===t.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Keyword.");for(var n=0;n<5;n++)t.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(n)},"Blank"));return t}if(""===r.searchFilter&&r.selectedCue.cue_desc){var a=k.filter(function(e){return-1!==e.key_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())});r.selectedCue.cue_desc.split(",").forEach(function(e){for(var t in a)a[t].key_name.toLowerCase().trim()===e.toLowerCase().trim()&&(a[t].selected=!0),a[t].key_name=a[t].key_name.charAt(0).toUpperCase()+a[t].key_name.slice(1)});var c=a.filter(function(e){return!0===e.selected}).concat(a.filter(function(e){return!1===e.selected})).map(function(e){return l.a.createElement("div",{key:"".concat(e.key_id),className:e.selected?"modal-selected":"modal-select",count:e.key_cnt,id:e.key_id,onClick:function(){return x(e)}},e.key_name)});if(0===c.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Keyword.");for(var s=0;s<5;s++)c.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(s)},"Blank"));return c}var i=k.filter(function(e){return-1!==e.key_name.toLowerCase().indexOf(r.searchFilter.toLowerCase())}).map(function(e){return l.a.createElement("div",{key:"".concat(e.key_id),className:e.selected?"modal-selected":"modal-select",count:e.key_cnt,id:e.key_id,onClick:function(){return x(e)}},e.key_name.charAt(0).toUpperCase()+e.key_name.slice(1))});if(0===i.length)return l.a.createElement("div",null,l.a.createElement("br",null),"Sorry, Your Search Returned No Matches.",l.a.createElement("br",null),"Use The Button Above To Add A New Keyword.");for(var o=0;o<5;o++)i.push(l.a.createElement("div",{className:"blank-divs",key:"blank-".concat(o)},"Blank"));return i}():r.showTempos?function(){var e=g,t=r.selectedCue;return 28!==t.tempo_id?(e.forEach(function(e){e.tempo_id===t.tempo_id&&(e.selected=!0)}),e.map(function(e){return l.a.createElement("div",{key:"".concat(e.tempo_id),className:e.selected?"modal-selected":"modal-select",id:e.tempo_id,onClick:function(){return L(e)}},e.tempo_name)})):e.map(function(e){return l.a.createElement("div",{key:"".concat(e.tempo_id),className:"modal-select",id:e.tempo_id,onClick:function(){return L(e)}},e.tempo_name)})}():r.showRating?function(){var e=c,t=r.selectedCue;return null!==t.cue_rating?(e.forEach(function(e){e.value===t.cue_rating&&(e.selected=!0)}),e.map(function(e){return l.a.createElement("div",{id:e.value,key:e.value,className:e.selected?"modal-selected":"modal-select",onClick:function(){return T(e)}},e.value)})):e.map(function(e){return l.a.createElement("div",{id:e.value,key:e.value,className:"modal-select",onClick:function(){return T(e)}}," ",e.value)})}():null)):null))}),g={save:c.e,updateTracks:h.b,updateData:c.o};t.default=Object(r.b)(function(e){return{cues:e.cues,BImasterIDs:e.BImasterIDs,modal:e.modal,releasesIA:e.releasesIA,selectedLibrary:e.selectedLibrary,tracks:e.tracks}},g)(function(e){var t=e.modal,n=e.releasesIA,a=e.selectedLibrary,r=(e.tracks,e.updateData,e.updateTracks,t.selectedCue),c=/v\d{1,2}/g.test(r.cue_title)?l.a.createElement("button",{onClick:copyFromV1},"Copy From V1"):null;return l.a.createElement("div",null,l.a.createElement("div",{className:"title",id:t.selectedCueId},l.a.createElement("strong",null,"You Are Editing Metadata For The Cue: "),l.a.createElement("br",null),t.selectedCue.cue_title),l.a.createElement("strong",null,"Cue ID:")," ",t.selectedCue?t.selectedCue.cue_id:null,c,l.a.createElement("button",{className:"save-button",onClick:function(){e.handleSave(function(e){return console.log(e)})}},"Save"),l.a.createElement("br",null),l.a.createElement("strong",null,"Release: ")," ",t.selectedCue&&"background-instrumentals"===a.libraryName?batchesBI.filter(function(e){return e.rel_id===t.selectedCue.rel_id}).map(function(e){return e.rel_num}):t.selectedCue&&"independent-artists"===a.libraryName?n.filter(function(e){return e.rel_id===t.selectedCue.rel_id}).map(function(e){return e.rel_num}):null,l.a.createElement("div",null,l.a.createElement("strong",null,"Duration:")," ",t.selectedCue.cue_duration),l.a.createElement("div",{className:"column-wrapper"},l.a.createElement(i,null),l.a.createElement(E,null)))})}}]);
//# sourceMappingURL=1.bundle.js.map