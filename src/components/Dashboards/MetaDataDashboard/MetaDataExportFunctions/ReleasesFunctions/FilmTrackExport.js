import React, { useEffect, useState } from 'react';
import { withRouter } from "react-router";
import moment from 'moment';
import { connect } from 'react-redux';
import { resetDownload, updateDownload } from '../../../../../actions/ExportActions/exportActions';
const exportTools = require('../ExportTools.js');

// ******************************************************************************************
//  FILM TRACK RELEASE EXPORT FUNCTION
// ******************************************************************************************
//  seems finished need to diff check, refactor if necessary
// ******************************************************************************************

const FilmTrackExport = (props) => {
  const { batchesDropDown, cuesLoading, inclusive, downloadCompletedChecker, downloadProgress, releaseFilter, resetDownload,
         selectedCategories, selectedComposers, selectedLibrary, selectedStyles, tempos, updateDownload
       } = props;

  const [xlsData, setXlsData] = useState([]);
  const [newRowData, setRowData] = useState([]);
  const [progress, setProgress] = useState(0.00);

  useEffect(() => {
    let downloadLink = `DLM_${releaseFilter.label + "_"}FILM_TRACK_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.xls`;
    updateDownload(progress)
    progress === 1 && exportTools.generateDownload(xlsData.join('\n'), downloadLink);
  }, [progress])

  useEffect(() => {
    (progress !== 1 && newRowData.length !== 0 && xlsData.indexOf(newRowData.join('\t')) === -1) && setXlsData([...xlsData, newRowData.join('\t')])
  }, [newRowData, progress])

   const filmTrackExport = () => {
   resetDownload();
   downloadCompletedChecker();
   let progressCount = 0;
   let headersRow = [
     'LibraryName',	'CDTitle', 'CDnum',	'CDDescription',	'ReleaseDate',	'TrackTitle',	'TrackDescription',	'Tracknum',
     'Tracksubnum',	'Pathname',	'Filename',	'BPM',	'composer1',	'Composer1affiliation',	'Composer1CAENumIPI',	'Composer1split',
     'Composer1Type',	'Composer2',	'Composer2affiliation',	'Composer2CAENumIPI',	'Composer2split',	'Composer2Type',
     'composer3',	'Composer3affiliation',	'Composer3CAENumIPI',	'Composer3split',	'Composer3Type',	'composer4',
     'Composer4affiliation',	'Composer4CAENumIPI',	'Composer4split',	'Composer4Type',	'composer5',	'Composer5affiliation',
     'Composer5CAENumIPI',	'Composer5split',	'Composer5Type',	'composer6',	'Composer6affiliation',	'Composer6CAENumIPI',
     'Composer6split',	'Composer6Type',	'Publisher1',	'Publisher1Type',	'Publisher1Affiliation',	'Publisher1Split',
     'Publisher1CAENumIPI',	'Publisher2',	'Publisher2Type',	'Publisher2Affiliation',	'Publisher2Split',	'Publisher2CAENumIPI',
     'Publisher3',	'Publisher3Type',	'Publisher3Affiliation',	'Publisher3Split',	'Publisher3CAENumIPI', 'LibraryTrackID',
     'Version',	'Instruments',	'Tempo',	'Genre',	'Categories',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',
     'keyword',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',	'keyword',
     'ISWC_Main',	'ISRC_Main',	'ISRC_All',	'ASCAP_Main',	'ASCAP_All',	'BMI_Main',	'BMI_All',	'SESAC_Main',	'SESAC_All',
     'SOCAN_Main', 'SOCAN_All'
    ];
    setXlsData([headersRow.join('\t')]);
    let releasesArray = isNaN(releaseFilter.value) && releaseFilter.value.includes('-') ? releaseFilter.value.split('-') : [];
    let filteredLibrary = selectedLibrary.library.filter(cue =>
      releasesArray.length !== 0
        ? cue.rel_id >= releasesArray[releasesArray.length - 1] && cue.rel_id <= releasesArray[0] && (cue.cue_status === 'Active')
        : null
      ).sort((e, f) => // this export demands we order things alphabetically by cue_title
          e.cue_title - f.cue_title).sort((c, d) => //  then by category name alphabetically....
            (selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name < selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
            ? -1
            : (selectedStyles.filter(as => as.style_id === c.style_id)[0].style_name > selectedStyles.filter(bs => bs.style_id === d.style_id)[0].style_name)
            ? 1
            : 0).sort((a, b) => // and then style name alphabetically...
              (selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name < selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
              ? -1
              : (selectedStyles.filter(ac => ac.cat_id === a.cat_id)[0].cat_name > selectedStyles.filter(bc => bc.cat_id === b.cat_id)[0].cat_name)
              ? 1
              : 0)

    exportTools.asyncExport(filteredLibrary, filteredLibrary.length, (row) => {
    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
      let descriptionString = exportTools.parseData(keywordParse(row.cue_desc).join(', ')).join(', ');
      let instrumentsString = exportTools.parseData(row.cue_instrus_edit).join(', ');
      let genre = selectedCategories.filter(categories =>
         categories.cat_id === row.cat_id).map(cat =>
           cat.cat_name);

      let subGenre = selectedStyles.filter(styles =>
             styles.style_id === row.style_id).map(style =>
               style.style_name);
     let releaseParse = releaseFilter.label.split('R')[1];
    // --------------------------------------------------------------------------------------------------
      let composerArray = selectedComposers.filter(composer =>
        composer.cue_id === row.cue_id).sort((a, b) =>
          b.composer_split - a.composer_split);
      // --------------------------------------------------------------------------------------------------
      //  these functions seperate publishers and add their splits up
      let pubMergeArray = [];

      Array.prototype.inArray = function(comparer) {
        for(var i=0; i < pubMergeArray.length; i++) {
          if(comparer(pubMergeArray[i])) return true;
        }
        return false;
      };

      Array.prototype.pushIfNotExist = function(element, comparer) {
        if (!pubMergeArray.inArray(comparer)) {
          pubMergeArray.push(element);
        } else {
          pubMergeArray.filter(pub =>
            pub.publisher_name === element.publisher_name).map(x =>
              x.composer_split += element.composer_split
          )
        }
      };

      composerArray.forEach((composer, i) => {
        let newPub = {publisher_name: composer.publisher_name.split(' (')[0], composer_split: composer.composer_split, ipi: composer.ipi, pro_name: composer.pro_name}
        pubMergeArray.pushIfNotExist(newPub, (c) => {
          return c.publisher_name === newPub.publisher_name;
        });
      })

    // --------------------------------------------------------------------------------------------------

      let newRow = [
        // LibraryName
        'DL Music - Background Instrumentals',
        // CDTitle
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // CDnum
        `DLM-${row.style_id.toString().padStart(3, 0)}-R${releaseParse}`,
        // CDDescription
        `${genre}, ${subGenre} Vol. ${releaseParse}`,
        // ReleaseDate
        moment(row.cue_reldate_h).format('MM/DD/YYYY'),
        // TrackTitle
        row.cue_title,
        // TrackDescription
        exportTools.parseData(row.cue_desc).join(', '),
        // Tracknum
        row.cue_id,
        // Tracksubnum
        selectedLibrary.library.filter(cues => row.cue_title.includes(cues.cue_title.split(/v\d{1,2}/)[0])).map(x => {
          return x.cue_id !== row.cue_id ?  x.cue_id : null})[0],
        // Pathname
        `\\${genre}\\${subGenre}\\`,
        // Filename
        `DLM - ${row.cue_title}.wav`,
        // BPM
        '',
        // composer1
        `${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ''} ${composerArray[0].last}`,
        // Composer1affiliation
        composerArray[0].pro_name,
        // Composer1CAENumIPI
        composerArray[0].cae,
        // Composer1split
        composerArray[0].composer_split,
        // Composer1Type
        composerOrArrangerParse(row),
        // Composer2
        composerArray[1]
          ? `${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ''} ${composerArray[1].last}`
          : '',
        // Composer2affiliation
        composerArray[1] ? composerArray[1].pro_name : '',
        // Composer2CAENumIPI
        composerArray[1] ? composerArray[1].cae : '',
        // Composer2split
        composerArray[1] ? composerArray[1].composer_split : '',
        // Composer2Type
        composerArray[1] ? composerOrArrangerParse(row) : '',
        // composer3
        composerArray[2]
          ? `${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ''} ${composerArray[2].last}`
          : '',
        // Composer3affiliation
        composerArray[2] ? composerArray[2].pro_name : '',
        // Composer3CAENumIPI
        composerArray[2] ? composerArray[2].cae : '',
        // Composer3split
        composerArray[2] ? composerArray[2].composer_split : '',
        // Composer3Type
        composerArray[2] ? composerOrArrangerParse(row) : '',
        // composer4
        composerArray[3]
          ? `${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ''} ${composerArray[3].last}`
          : '',
        // Composer4affiliation
        composerArray[3] ? composerArray[3].pro_name : '',
        // Composer4CAENumIPI
        composerArray[3] ? composerArray[3].cae : '',
        // Composer4split
        composerArray[3] ? composerArray[3].composer_split : '',
        // Composer4Type
        composerArray[3] ? composerOrArrangerParse(row) : '',
        // composer5
        composerArray[4]
          ? `${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ''} ${composerArray[4].last}`
          : '',
        // Composer5affiliation
        composerArray[4] ? composerArray[4].pro_name : '',
        // Composer5CAENumIPI
        composerArray[4] ? composerArray[4].cae : '',
        // Composer5split
        composerArray[4] ? composerArray[4].composer_split : '',
        // Composer5Type
        composerArray[4] ? composerOrArrangerParse(row) : '',
        // composer6
        composerArray[5]
          ? `${composerArray[5].first}${composerArray[5].middle ? " " + composerArray[5].middle : ''} ${composerArray[5].last}`
          : '',
        // Composer6affiliation
        composerArray[5] ? composerArray[5].pro_name : '',
        // Composer6CAENumIPI
        composerArray[5] ? composerArray[5].cae : '',
        // Composer6split
        composerArray[5] ? composerArray[5].composer_split : '',
        // Composer6Type
        composerArray[5] ? composerOrArrangerParse(row) : '',
        // Publisher1
        pubMergeArray[0].publisher_name,
        // Publisher1Type
        'Publisher',
        // Publisher1Affiliation
        publisherProParse(pubMergeArray[0].publisher_name),
        // Publisher1Split
        pubMergeArray[0].composer_split,
        // Publisher1CAENumIPI
        pubMergeArray[0].ipi,
        // Publisher2
        pubMergeArray[1] ? pubMergeArray[1].publisher_name : '',
        // Publisher2Type
        pubMergeArray[1] ? 'Publisher' : '',
        // Publisher2Affiliation
        pubMergeArray[1] ? publisherProParse(pubMergeArray[1].publisher_name) : '',
        // Publisher2Split
        pubMergeArray[1] ? pubMergeArray[1].composer_split : '',
        // Publisher2CAENumIPI
        pubMergeArray[1] ? pubMergeArray[1].ipi : '',
        // Publisher3
        pubMergeArray[2] ? pubMergeArray[2].publisher_name : '',
        // Publisher3Type
        pubMergeArray[2] ? 'Publisher' : '',
        // Publisher3Affiliation
        pubMergeArray[2] ? publisherProParse(pubMergeArray[2].publisher_name) : '',
        // Publisher3Split
        pubMergeArray[2] ? pubMergeArray[2].composer_split : '',
        // Publisher3CAENumIPI
        pubMergeArray[2] ? pubMergeArray[2].ipi : '',
        // LibraryTrackID
        `DLM-${row.style_id.toString().padStart(3, 0)}-${row.cue_id}`,
        // Version
        versionParse(row),
        // Instruments
        instrumentsString,
        // Tempo
        tempoParse(row.tempo_id),
        // Genre
        genreParse(row),
        // Categories
        catParse(row),
        // keyword
        descriptionString.split(', ')[0] ? descriptionString.split(', ')[0].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[1] ? descriptionString.split(', ')[1].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[2] ? descriptionString.split(', ')[2].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[3] ? descriptionString.split(', ')[3].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[4] ? descriptionString.split(', ')[4].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[5] ? descriptionString.split(', ')[5].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[6] ? descriptionString.split(', ')[6].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[7] ? descriptionString.split(', ')[7].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[8] ? descriptionString.split(', ')[8].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[9] ? descriptionString.split(', ')[9].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[10] ? descriptionString.split(', ')[10].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[11] ? descriptionString.split(', ')[11].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[12] ? descriptionString.split(', ')[12].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[13] ? descriptionString.split(', ')[13].toLowerCase() : '',
        // keyword
        descriptionString.split(', ')[14] ? descriptionString.split(', ')[14].toLowerCase() : '',
        // ISWC_Main
        '',
        // ISRC_Main
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // ISRC_All
        `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
        // ASCAP_Main
        '',
        // ASCAP_All
        '',
        // BMI_Main
        '',
        // BMI_All
        '',
        // SESAC_Main
        '',
        // SESAC_All
        '',
        // SOCAN_Main
        '',
        // SOCAN_All
        ''
      ]
      progressCount ++;
      let progress = (progressCount/filteredLibrary.length)
      setRowData(newRow);
      setProgress(progress);
    }, () => { // inProgress()
      // updateDownload(progress)
    },
    () => { // done()
      updateDownload(1)
      downloadCompletedChecker();
    })
  }

  const composerOrArrangerParse = (row) => {
    // PUBLIC DOMAIN CODE
    if (row.style_id === 51 || row.style_id === 52 || row.cue_title.includes(" Arr " || " Arr. ")) {
      return "Arranger";
    } else {
      return "Composer";
    }
  }

  const catParse = (row) => {
    switch(row.cat_id){
      case 1:
        return "Bumpers, Transitions, Stingers";
        break;
      case 2:
        return "Bumpers, Transitions, Stingers"; // BUMPERS
        break;
      case 3:
        return "Drama"; // DRAMA
        break;
      case 4:
        return "Drama, Trailer Music"; 	// DRAMA ORCHESTRAL
        break;
      case 5:
        return "Drama, Trailer Music"; 	// DRAMA ORCHESTRAL
        break;
      case 6:
        return "Drama, Trailer Music"; 	// DRAMA ORCHESTRAL
        break;
      case 7:
        return "Drama, Trailer Music"; 	// DRAMA ORCHESTRAL
        break;
      case 8:
        return "Drama, Trailer Music"; 	// DRAMA ORCHESTRAL
        break;
      case 9:
        return 'Retro TV'; // RETRO TV LAND
        break;
      case 10:
        return 'Retro TV'; // RETRO TV LAND
        break;
      case 11:
        return "Score Tools"; // SCORE TOOLS
        break;
      case 12:
        return "Score Tools"; // SCORE TOOLS
        break;
      case 13:
        return "Score Tools"; // SCORE TOOLS
        break;
      case 14:
        return "Score Tools"; // SCORE TOOLS
        break;
      case 15:
        return 'Score Tools';
        break;
      default:
        return '';
    }
  }

  const genreParse = (row) => {
    if (row.style_id === 4){
      return "Electronica"; // BUMPS TRANSITIONS: ELECTRONIC
    } else if (row.style_id === 5){
      return "Rock"; // BUMPS TRANSITIONS: GUITAR FX
    } else if (row.style_id === 6){
      return "Jazz"; // BUMPS TRANSITIONS: JAZZ
    } else if (row.style_id === 8){
      return "Orchestral"; // BUMPS TRANSITIONS: ORCH DRAMATIC
    } else if (row.style_id === 10){
      return "Pop"; // BUMPS TRANSITIONS: ROCK - POP - BLUES
    } else if (row.style_id === 14){
      return "Hip Hop/R&B"; // BUMPS TRANSITIONS: URBAN
    } else if (row.style_id === 15){
      return "World Music"; // BUMPS TRANSITIONS: WORLD
    } else if (row.style_id === 141){
      return "Holiday"; // BUMPS TRANSITIONS: HOLIDAY
    } else if (row.style_id === 16){
      return "Electronica"; // DANCE: AMBIENT - DOWN TEMPO
    } else if (row.style_id === 17){
      return "Breakbeat"; // DANCE: BREAKS
    } else if (row.style_id === 18){
      return "Dance Pop"; // DANCE: DANCE POP
    } else if (row.style_id === 19){
      return "Disco"; // DANCE: DISCO
    } else if (row.style_id === 20){
      return "Electronica"; // DANCE: ELECTRONICA
    } else if (row.style_id === 21){
      return "House"; // DANCE: HOUSE
    } else if (row.style_id === 22){
      return "Rave-Trance-Techno"; // DANCE: Nrg (rave-trance-techno)
    } else if (row.style_id === 23){
      return "Retro"; // DANCE: Retro
    } else if (row.style_id === 32){
      return "Rock"; // DRAMA: SOLO INSTRUMENTS: ACOUSTIC GTR
    } else if (row.style_id === 33){
      return "Rock"; // DRAMA: SOLO INSTRUMENTS: ELECTRIC GTR
    } else if (row.style_id === 34){
      return ""; // DRAMA: SOLO INSTRUMENTS: OTHER
    } else if (row.style_id === 35){
      return "Classical"; // DRAMA: SOLO INSTRUMENTS: PIANO
    } else if (row.style_id === 41){
      return "Classical"; // DRAMA ORCHESTRAL: CLASSICAL
    } else if (row.cat_id === 4){
      return "Orchestral"; // DRAMA ORCHESTRAL
    } else if (row.style_id === 45){
      return "Hip Hop"; // HIPHOP - RNB: Gangsta - Playa - Pimp
    } else if (row.style_id === 46){
      return "Hip Hop"; // HIPHOP - RNB: Hip-Hop
    } else if (row.style_id === 47){
      return "Hip Hop"; // HIPHOP - RNB: Ol Skool
    } else if (row.style_id === 48){
      return "R&B"; // HIPHOP - RNB: RnB - Soft
    } else if (row.style_id === 49){
      return "Trip Hop"; // HIPHOP - RNB: Trip-hop
    } else if (row.style_id === 50){
      return "Contemporary Holiday"; // HOLIDAY: CONTEMPORARY
    } else if (row.style_id === 51){
      return "Contemporary Holiday"; // HOLIDAY: PUBLIC DOMAIN CONTEMPORARY
    } else if (row.style_id === 52){
      return "Traditional Holiday"; // HOLIDAY: PUBLIC DOMAIN TRADITIONAL
    } else if (row.style_id === 53){
      return "Traditional Holiday"; // HOLIDAY: TRADITIONAL
    } else if (row.style_id === 127){
      return "World Holiday"; // HOLIDAY: WORLD
    } else if (row.style_id === 146){
      return "Holiday"; // HOLIDAY: HOLIDAY STANDARDS
    } else if (row.style_id === 54){
      return "Jazz"; // JAZZ - BIG BAND - LARGE ENSEMBLE
    } else if (row.style_id === 55){
      return "Jazz Rock"; // JAZZ - JAZZ ROCK
    } else if (row.style_id === 56){
      return "Jazz"; // JAZZ - QUARTET - SMALL ENSEMBLE
    } else if (row.style_id === 57){
      return "Smooth Jazz"; // JAZZ - SMOOTH JAZZ
    } else if (row.style_id === 58){
      return "Jazz"; // JAZZ - SOLO JAZZ INSTRUMENTS
    } else if (row.style_id === 65){
      return "Blues"; // ROCK BLUES FUNK: BLUES
    } else if (row.style_id === 66){
      return "Industrial"; // ROCK BLUES FUNK: Edgy - Industrial
    } else if (row.style_id === 67){
      return "Funk"; // ROCK BLUES FUNK: Funk
    } else if (row.style_id === 68){
      return "Heavy Rock"; // ROCK BLUES FUNK: Heavy Rock
    } else if (row.style_id === 69){
      return "Pop Rock"; // ROCK BLUES FUNK: Pop Rock
    } else if (row.style_id === 59){
      return "Reggae-Ska"; // REGGAE- SKA - REGGAE-SKA
    } else if (row.style_id === 70){
      return "Pop Rock"; // SCORE TOOLS: ROCK - POP
    } else if (row.style_id === 72){
      return ""; // SCORE TOOLS: DRONES - TEXTURES
    } else if (row.style_id === 73){
      return "Jazz"; // SCORE TOOLS: JAZZY
    } else if (row.style_id === 75){
      return ""; // SCORE TOOLS: POSITIVE SORROW
    } else if (row.style_id === 76){
      return "Electronica"; // SCORE TOOLS: TECHNO - ELECTRONICA
    } else if (row.style_id === 105){
      return ""; // SCORE TOOLS: CAREFREE
    } else if (row.style_id === 110){
      return ""; // SCORE TOOLS: DRAMATIC
    } else if (row.style_id === 111){
      return ""; // SCORE TOOLS: DRIVING
    } else if (row.style_id === 120){
      return ""; // SCORE TOOLS: RHYTHMIC
    } else if (row.style_id === 126){
      return "Urban"; // SCORE TOOLS: URBAN
    } else if (row.style_id === 77){
      return "Country"; // SPECIALTY: COUNTRY - AMERICANA
    } else if (row.style_id === 78){
      return "Children"; // SPECIALTY: GOOFY COMEDIC KIDS
    } else if (row.style_id === 142){
      return "Hick hop"; // SPECIALTY: HICK HOP
    } else if (row.style_id === 79){
      return "Corporate"; // SPECIALTY: INFORMATIONAL
    } else if (row.style_id === 80){
      return ""; // SPECIALTY: NEWS
    } else if (row.style_id === 81){
      return "Patriotic"; // SPECIALTY: PATRIOTIC - HEROIC
    } else if (row.style_id === 82){
      return "Spiritual"; // SPECIALTY: SPIRITUAL
    } else if (row.style_id === 84){
      return "Urban"; //	VOCAL TRAX: DANCE - URBAN
    } else if (row.style_id === 85){
      return "Rock"; //	VOCAL TRAX: ROCK - BLUES
    } else if (row.style_id === 128){
      return "World"; //	VOCAL TRAX: WORLD
    } else if (row.style_id === 86){
      return "African"; // WORLD MUSIC: AFRICA
    } else if (row.style_id === 87){
      return "Australian"; // WORLD MUSIC: AUSTRALIA
    } else if (row.style_id === 88){
      return "Caribbean"; // WORLD MUSIC: CARIBBEAN - ISLAND
    } else if (row.style_id === 89){
      return "Central European"; // WORLD MUSIC: CENTRAL EUROPEAN
    } else if (row.style_id === 90){
      return "World Fusion"; // WORLD MUSIC: CONTEMPORARY WORLD
    } else if (row.style_id === 91){
      return "World"; // WORLD MUSIC: DRAMATIC WORLD
    } else if (row.style_id === 92){
      return "Asian"; // WORLD MUSIC: FAR EAST
    } else if (row.style_id === 93){
      return "Indian"; // WORLD MUSIC: INDIA - ARAB NATIONS
    } else if (row.style_id === 94){
      return "Latin"; // WORLD MUSIC: LATIN
    } else if (row.style_id === 95){
      return "Native American"; // WORLD MUSIC: NATIVE AMERICAN
    } else if (row.style_id === 97){
      return "Island"; // WORLD POP - ISLAND
    } else if (row.style_id === 99){
      return "Reggaeton"; // WORLD POP - REGGAETON
    } else if (row.style_id === 99){
      return "Latin"; // WORLD POP - LATIN
    } else if (row.style_id === 129){
      return "Eastern"; // WORLD POP - EASTERN
    } else if (row.style_id === 130){
      return "African"; 	// WORLD POP - AFRICAN
    } else {
      return '';
    }
  }

  const keywordParse = (cue_desc) => {
    let keywords = cue_desc.replace(/ - /gm, ' ');
		keywords = keywords.replace(/r&amp;b/gm, 'r&b');
		keywords = keywords.replace(/r & b/gm, "r&b");
		keywords = keywords.replace(/rnb/gm, "r&b");
		keywords = keywords.replace(/-/gm, " ");
		keywords = keywords.replace(/\(/gm, " ");
		keywords = keywords.replace(/\)/gm, " ");
		keywords = keywords.replace(/\./gm, " ");
		keywords = keywords.replace(/ the /gm, " ");
		keywords = keywords.replace(/bumpers/gm, "bumper");
		keywords = keywords.replace(/transitions/gm, "transition");
		keywords = keywords.replace(/, /gm, " ");
		keywords = keywords.replace(/'/gm, "");
		keywords = keywords.replace(/ with /gm, " ");
		keywords = keywords.replace(/ a /gm, " ");
		keywords = keywords.replace(/ of /gm, " ");
		keywords = keywords.replace(/,/gm, " ");
		keywords = keywords.replace(/ at /gm, " ");
		keywords = keywords.replace(/ and /gm, " ");
		keywords = keywords.replace(/ to /gm, " ");
		keywords = keywords.replace(/ this /gm, " ");
		keywords = keywords.replace(/ mix /gm, " ");
		keywords = keywords.replace(/ in /gm, " ");
		keywords = keywords.replace(/ is /gm, " ");
		keywords = keywords.replace(/ it /gm, " ");
		keywords = keywords.replace(/nrg/gm, "energy");
		keywords = keywords.replace(/ & /gm, " ");
		keywords = keywords.replace(/ n /gm, " ");
		let keywordsArray = keywords.split(" ");
		keywordsArray = keywordsArray.map(keywords => keywords.trim());
    keywordsArray = [...new Set(keywordsArray)];
    return keywordsArray;
  }

  const publisherProParse = (publisher_name) => {
    switch(publisher_name){
      case 'Derek Luff Music, Inc.':
        return 'ASCAP';
        break;
      case 'Dewmarc Music':
        return 'BMI';
        break;
      case 'Ridek Music':
        return 'SESAC';
        break;
      default:
        return '';
        break;
    }
  }

  const tempoParse = (tempo_id) => {
    if (tempo_id == 1){
      return "Slow";
    } else if (tempo_id === 2){
      return "Moderate";
    } else if (tempo_id === 3){
      return "Fast";
    } else if (tempo_id === 4){
      return "Varied";
    } else if (tempo_id === 8){
      return "Varied";
    }
  }

  const versionParse = (row) => {
		if (row.cue_duration === '0:28') {
			return '30';
		} else if (row.cue_duration === '0:29') {
			return '30';
		} else if (row.cue_duration === '0:30') {
			return '30';
		} else if (row.cue_duration === '0:31') {
			return '30';
		} else if (row.cue_duration === '0:58') {
			return '60';
		} else if (row.cue_duration === '0:59') {
			return '60';
		} else if (row.cue_duration === '1:00') {
			return '60';
		} else if (row.cue_duration === '1:01') {
			return '60';
		} else if (row.cat_id === 13){
    	return 'Vocal';
	  } else if (row.cue_title.includes('v1' || '(Full')){
    	return 'Instrumental';
		} else {
			return 'Instrumental';
		}
  }

  return (
    <a onClick={(() =>
      releaseFilter === 147 || cuesLoading
        ? exportTools.exportError()
        : !releaseFilter.value.toString().includes('-')
        ? exportTools.exportError('We Typically Only Send Film Track Releases. Please Select A Release.')
        :  selectedLibrary.libraryName === 'independent-artists'
        ? exportTools.exportError('We Don\'t Send Our Independent Artists Catalog To Film Track')
        : inclusive || releaseFilter.label === 'All'
          ? exportTools.exportError('We Typically Only Send Film Track One Release At A Time. Please Unselect Inclusive.')
          : filmTrackExport())
    } className={
      inclusive || cuesLoading
        ? 'strikethrough'
        : (releaseFilter.value
        && typeof releaseFilter.value === 'string')
        && releaseFilter.label !== 'All'
        ? 'download-links'
        : 'strikethrough'
      }>
      {`Film Track Release Export ${
        (releaseFilter.value
        && typeof releaseFilter.value === 'string')
        && releaseFilter.label !== 'All'
        ? releaseFilter.label
        : ''
      }`
    }
    </a>
  );
}

const mapStateToProps = (state) => ({
  downloadProgress: state.downloadProgress,
  selectedCategories: state.selectedCategories,
  selectedComposers: state.selectedComposers,
  selectedLibrary: state.selectedLibrary,
  selectedStyles: state.selectedStyles,
  tempos: state.tempos
})

const mapDispatchToProps = {
  resetDownload,
  updateDownload
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(FilmTrackExport));
