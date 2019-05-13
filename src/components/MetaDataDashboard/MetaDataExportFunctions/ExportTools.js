// ******************************************************************************************
import moment from 'moment';
import XLSX from 'xlsx';
// ******************************************************************************************
// CHECKER

const batchChecker = (batch) => {
  return batch !== 147 ? !!batch : false
}

const exportError = (message) => {
  alert(message || 'Please Select A Release To Export')
}

const asyncExport = (arr, originalLength, task, onProgress, done) => { // asynchronous recursive forLoop
    setTimeout(() => {
      task(arr[0]);
      if (arr.length === 1) {
        onProgress()
        done();
      } else {
        onProgress()
        asyncExport(arr.slice(1), originalLength, task, onProgress, done);
      }
    }, 0);
  }


// ******************************************************************************************
//  PROTUNES BATCH EXPORT FUNCTION
// ******************************************************************************************
// exports a batch of tracks with ratings only above 5, and splits them into 2 tiers:
// tier 2 = rating 8 - 10
// tier 1 = rating 6 - 7
// ******************************************************************************************


const proTunesExport = (props, state, progressCallBack) => {
  let headersRow = [
     'provider filename', 'provider track id', 'title', 'version', 'primary track', 'catalog', 'instrumental',
     'vocals', 'genre', 'keywords', 'mood', 'description', 'era', 'sounds-like/influences', 'instruments',
     'bpm', 'lyrics', 'restrictions', 'original/cover', 'one-stop licensing', 'cd title / ref #',
     'release date', 'track no', 'iswc', 'isrc', 'tier', 'ARTIST',
     'COMPOSER 1 NAME', 'COMPOSER 1 PRO', 'COMPOSER 1 PRO NUMBER', 'COMPOSER 1 SPLIT',
     'COMPOSER 2 NAME', 'COMPOSER 2 PRO', 'COMPOSER 2 PRO NUMBER', 'COMPOSER 2 SPLIT',
     'COMPOSER 3 NAME', 'COMPOSER 3 PRO', 'COMPOSER 3 PRO NUMBER', 'COMPOSER 3 SPLIT',
     'COMPOSER 4 NAME', 'COMPOSER 4 PRO', 'COMPOSER 4 PRO NUMBER', 'COMPOSER 4 SPLIT',
     'COMPOSER 5 NAME', 'COMPOSER 5 PRO', 'COMPOSER 5 PRO NUMBER', 'COMPOSER 5 SPLIT',
     'COMPOSER 6 NAME', 'COMPOSER 6 PRO', 'COMPOSER 6 PRO NUMBER', 'COMPOSER 6 SPLIT',
     'PUBLISHER 1 NAME', 'PUBLISHER 1 PRO', 'PUBLISHER 1 PRO NUMBER', 'PUBLISHER 1 SPLIT',
     'PUBLISHER 2 NAME', 'PUBLISHER 2 PRO', 'PUBLISHER 2 PRO NUMBER', 'PUBLISHER 2 SPLIT',
     'PUBLISHER 3 NAME', 'PUBLISHER 3 PRO', 'PUBLISHER 3 PRO NUMBER', 'PUBLISHER 3 SPLIT',
     'PUBLISHER 4 NAME', 'PUBLISHER 4 PRO', 'PUBLISHER 4 PRO NUMBER', 'PUBLISHER 4 SPLIT',
     'PUBLISHER 5 NAME', 'PUBLISHER 5 PRO', 'PUBLISHER 5 PRO NUMBER', 'PUBLISHER 5 SPLIT',
     'PUBLISHER 6 NAME', 'PUBLISHER 6 PRO', 'PUBLISHER 6 PRO NUMBER', 'PUBLISHER 6 SPLIT'
 ];

 let csvData = [];
 csvData.push(headersRow.join('\t'));
   let filteredLibrary = props.selectedLibrary.library.filter(cue =>
      cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled' && cue.cue_rating > 5
   )
   filteredLibrary.forEach((row, rowIndex) => {
  // --------------------------------------------------------------------------------------------------
  // these little functions parse data to Title Case formatting
  // and remove empty keywords/instruments and tailing commas
  // --------------------------------------------------------------------------------------------------
    let descriptionString = parseData(row.cue_desc).join(', ');
    let instrumentsString = parseData(row.cue_instrus_edit).join(', ');
  // --------------------------------------------------------------------------------------------------

    let composerArray = props.selectedComposers.filter(composer => composer.cue_id === row.cue_id);
    let releaseParse = state.releaseFilter.label.split('R')[1];

    let wavRow = [
      // provider filename
      `DLM_${row.cue_title.replace(/\s/g, '_')}.wav`,
      // provider track id
      row.cue_id,
      // title
      row.cue_title,
      // version
      '',
      // primary track
      props.BImasterIDs.filter(ids => row.cue_id === ids.cue_id).map(id => id.master_cue_id)[0],
      // catalog
      'DL Music',
      // instrumental
      'Yes',
      // vocals
      '',
      // genre
      `${props.selectedCategories.filter(category =>
       category.cat_id === row.cat_id).map(cat =>
         cat.cat_name)}, ${props.selectedStyles.filter(styles =>
           styles.style_id === row.style_id).map(style =>
             style.style_name)}`,
      // keywords
      descriptionString,
      // mood
      descriptionString,
      // description
      '',
      // era
      '',
      // sounds-like/influences
      row.sounds_like_band_edit || '',
      // instruments
      instrumentsString || '',
      // bpm
      '',
      // lyrics
      '',
      // restrictions
      '',
      // original/cover
      'Original',
      // one-stop licensing
      'Yes',
      // cd title / ref #
      `${props.selectedCategories.filter(category =>
         category.cat_id === row.cat_id).map(cat =>
           cat.cat_name)}, ${props.selectedStyles.filter(styles =>
             styles.style_id === row.style_id).map(style =>
               style.style_name)} Vol. ${(/\_/).test(releaseParse) ?
                 releaseParse.split('_')[0] :
                 releaseParse}`,
      // release date
      row.cue_reldate_h.substring(0, 4),
      // track no
      row.cue_id,
      // iswc
      '',
      // isrc
      `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
      // tier // tier 2 = rating 8 - 10  // tier 1 = rating 6 - 7
      row.cue_rating > 7 ? 2 : 1 ,
      // ARTIST
      '',
      // 'COMPOSER 1 NAME'
      `${composerArray[0].first + ' '}${composerArray[0].middle ? composerArray[0].middle + ' ' : ''}${composerArray[0].last }${composerArray[0].suffix ? ' ' + composerArray[0].suffix : ''}`,
      // 'COMPOSER 1 PRO'
      composerArray[0].pro_name,
      // 'COMPOSER 1 PRO NUMBER'
      composerArray[0].cae,
      // 'COMPOSER 1 SPLIT'
      composerArray[0].composer_split,
      // 'COMPOSER 2 NAME'
      composerArray[1] ? `${composerArray[1].first + ' '}${composerArray[1].middle ? composerArray[1].middle + ' ' : ''}${composerArray[1].last }${composerArray[1].suffix ? ' ' + composerArray[1].suffix : ''}` : '',
      // 'COMPOSER 2 PRO'
      composerArray[1] ? composerArray[1].pro_name : '',
      // 'COMPOSER 2 PRO NUMBER'
      composerArray[1] ? composerArray[1].cae : '',
      // 'COMPOSER 2 SPLIT'
      composerArray[1] ? composerArray[1].composer_split : '',
      // 'COMPOSER 3 NAME'
      composerArray[2] ? `${composerArray[2].first + ' '}${composerArray[2].middle ? composerArray[2].middle + ' ' : ''}${composerArray[2].last }${composerArray[2].suffix ? ' ' + composerArray[2].suffix : ''}` : '',
      // 'COMPOSER 3 PRO'
      composerArray[2] ? composerArray[2].pro_name : '',
      // 'COMPOSER 3 PRO NUMBER'
      composerArray[2] ? composerArray[2].cae : '',
      // 'COMPOSER 3 SPLIT'
      composerArray[2] ? composerArray[2].composer_split : '',
      // 'COMPOSER 4 NAME'
      composerArray[3] ? `${composerArray[3].first + ' '}${composerArray[3].middle ? composerArray[3].middle + ' ' : ''}${composerArray[3].last }${composerArray[3].suffix ? ' ' + composerArray[3].suffix : ''}` : '',
      // 'COMPOSER 4 PRO'
      composerArray[3] ? composerArray[3].pro_name : '',
      // 'COMPOSER 4 PRO NUMBER'
      composerArray[3] ? composerArray[3].cae : '',
      // 'COMPOSER 4 SPLIT'
      composerArray[3] ? composerArray[3].composer_split : '',
      // 'COMPOSER 5 NAME'
      composerArray[4] ? `${composerArray[4].first + ' '}${composerArray[4].middle ? composerArray[4].middle + ' ' : ''}${composerArray[4].last }${composerArray[4].suffix ? ' ' + composerArray[4].suffix : ''}` : '',
      // 'COMPOSER 5 PRO'
      composerArray[4] ? composerArray[4].pro_name : '',
      // 'COMPOSER 5 PRO NUMBER'
      composerArray[4] ? composerArray[4].cae : '',
      // 'COMPOSER 5 SPLIT'
      composerArray[4] ? composerArray[4].composer_split : '',
      // 'COMPOSER 6 NAME'
      composerArray[5] ? `${composerArray[5].first + ' '}${composerArray[5].middle ? composerArray[5].middle + ' ' : ''}${composerArray[5].last }${composerArray[5].suffix ? ' ' + composerArray[5].suffix : ''}` : '',
      // 'COMPOSER 6 PRO'
      composerArray[5] ? composerArray[5].pro_name : '',
      // 'COMPOSER 6 PRO NUMBER'
      composerArray[5] ? composerArray[5].cae : '',
      // 'COMPOSER 6 SPLIT'
      composerArray[5] ? composerArray[5].composer_split : '',
      // 'PUBLISHER 1 NAME'
      composerArray[0].name_only,
      // 'PUBLISHER 1 PRO'
      composerArray[0].publisher_pro,
      // 'PUBLISHER 1 PRO NUMBER'
      composerArray[0].ipi,
      // 'PUBLISHER 1 SPLIT'
      composerArray[0].composer_split,
      // 'PUBLISHER 2 NAME'
      composerArray[1] ? composerArray[1].name_only : '',
      // 'PUBLISHER 2 PRO'
      composerArray[1] ? composerArray[1].publisher_pro : '',
      // 'PUBLISHER 2 PRO NUMBER'
      composerArray[1] ? composerArray[1].ipi : '',
      // 'PUBLISHER 2 SPLIT'
      composerArray[1] ? composerArray[1].composer_split : '',
      // 'PUBLISHER 3 NAME'
      composerArray[2] ? composerArray[2].name_only : '',
      // 'PUBLISHER 3 PRO'
      composerArray[2] ? composerArray[2].publisher_pro : '',
      // 'PUBLISHER 3 PRO NUMBER'
      composerArray[2] ? composerArray[2].ipi : '',
      // 'PUBLISHER 3 SPLIT'
      composerArray[2] ? composerArray[2].composer_split : '',
      // 'PUBLISHER 4 NAME'
      composerArray[3] ? composerArray[3].name_only : '',
      // 'PUBLISHER 4 PRO'
      composerArray[3] ? composerArray[3].publisher_pro : '',
      // 'PUBLISHER 4 PRO NUMBER'
      composerArray[3] ? composerArray[3].ipi : '',
      // 'PUBLISHER 4 SPLIT'
      composerArray[3] ? composerArray[3].composer_split : '',
      // 'PUBLISHER 5 NAME'
      composerArray[4] ? composerArray[4].name_only : '',
      // 'PUBLISHER 5 PRO'
      composerArray[4] ? composerArray[4].publisher_pro : '',
      // 'PUBLISHER 5 PRO NUMBER'
      composerArray[4] ? composerArray[4].ipi : '',
      // 'PUBLISHER 5 SPLIT'
      composerArray[4] ? composerArray[4].composer_split : '',
      // 'PUBLISHER 6 NAME'
      composerArray[5] ? composerArray[5].name_only : '',
      // 'PUBLISHER 6 PRO'
      composerArray[5] ? composerArray[5].publisher_pro : '',
      // 'PUBLISHER 6 PRO NUMBER'
      composerArray[5] ? composerArray[5].ipi : '',
      // 'PUBLISHER 6 SPLIT'
      composerArray[5] ? composerArray[5].composer_split : ''
     ]
     csvData.push(`${wavRow.join('\t')}`)
     progressCallBack(rowIndex, filteredLibrary.length)
   })
   generateDownload(csvData.join('\n'), `DLM_${state.releaseFilter.label + "_"}PROTUNES_TIERED_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
}

// ******************************************************************************************
//  NEW NEW NEW NEW ALTER K RELEASES EXPORT FUNCTION
// ------------------------------------------------------------------------------------------
//  in progress
// ******************************************************************************************

const alterKExport = (props, state, progressCallBack) => {
  let headersRow = [
     'NOM DU CATALOGUE', 'TITRE', 'COMPO 1', 'CATEG.', 'REPRES.', 'DEP % COMPO 1 POSSEDE', 'DEP % COMPO 1 COLLECTE',
     'PHONO % COMPO 1 POSSEDE', 'PHONO % COMPO 1 COLLECTE', 'COMPO 2', 'CATEG.', 'REPRES.', 'DEP % COMPO 2 POSSEDE', 'DEP % COMPO 2 COLLECTE',
     'PHONO % COMPO 2 POSSEDE', 'PHONO % COMPO 2 COLLECTE', 'COMPO 3', 'CATEG.', 'REPRES.', 'DEP % COMPO 3 POSSEDE', 'DEP % COMPO 3 COLLECTE',
     'PHONO % COMPO 3 POSSEDE', 'PHONO % COMPO 3 COLLECTE', 'COMPO 4', 'CATEG.', 'REPRES.', 'DEP % COMPO 4 POSSEDE', 'DEP % COMPO 4 COLLECTE',
     'PHONO % COMPO 4 POSSEDE', 'PHONO % COMPO 4 COLLECTE', 'COMPO 5', 'CATEG.', 'REPRES.', 'DEP % COMPO 5 POSSEDE', 'DEP % COMPO 5 COLLECTE',
     'PHONO % COMPO 5 POSSEDE', 'PHONO % COMPO 5 COLLECTE', 'EDITEUR ORIGINAL 1', 'CATEG.', 'REPRES.', 'DEP % ED.OR 1 POSSEDE',
     'DEP % ED.OR 1 COLLECTE', 'PHONO % ED.OR 1 POSSEDE', 'PHONO % ED.OR 1 COLLECTE', 'EDITEUR ORIGINAL 2', 'CATEG.', 'REPRES.', 'DEP % ED.OR 2 POSSEDE',
     'DEP % ED.OR 2 COLLECTE', 'PHONO % ED.OR 2 POSSEDE', 'PHONO % ED.OR 2 COLLECTE', 'EDITEUR ORIGINAL 3', 'CATEG.', 'REPRES.', 'DEP % ED.OR 3 POSSEDE',
     'DEP % ED.OR 3 COLLECTE', 'PHONO % ED.OR 3 POSSEDE', 'PHONO % ED.OR 3 COLLECTE', 'SOUS EDITEUR', 'CATEG.', 'REPRES.', 'DEP % SOUS EDITEUR POSSEDE',
     'DEP % SOUS EDITEUR COLLECTE', 'PHONO % SOUS EDITEUR POSSEDE', 'PHONO % SOUS EDITEUR COLLECTE', 'TOTAL DEP POSSEDE', 'TOTAL DEP COLLECTE', 'TOTAL PHONO POSSEDE',
     'TOTAL PHONO COLLECTE', 'VERIFICATION DES TOTAUX'
   ];

  let csvData = [];
  csvData.push(headersRow.join('\t'));
  let filteredLibrary = props.selectedLibrary.library.filter(cue =>
    state.releaseFilter.value !== 9999 && !state.inclusive
    ? cue.rel_id === state.releaseFilter.value && (cue.cue_status === 'Active'|| 'Instrumental_Active')
    : state.releaseFilter.value !== 9999 && state.inclusive
    ? cue.rel_id <= state.releaseFilter.value && (cue.cue_status === 'Active'|| 'Instrumental_Active')
    : cue.cue_status !== 'Pulled'
  )

  filteredLibrary.forEach((row, rowIndex) => {
    let composerArray = props.selectedComposers.filter(composer => composer.cue_id === row.cue_id);
    // --------------------------------------------------------------------------------------------------
    let wavRow = [
      // 'NOM DU CATALOGUE'
      'DL Music',
      // 'TITRE'
      row.cue_title.toString(),
      // 'COMPO 1'
      `${composerArray[0].first}${composerArray[0].middle ? " " + composerArray[0].middle : ''} ${composerArray[0].last}`,
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      'C',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      'O',
      // 'DEP % COMPO 1 POSSEDE'        // this is the same % in every box for you (per composer) - just fill their split in each of these columns
      composerArray[0].composer_split.toFixed(2)/2,
      // 'DEP % COMPO 1 COLLECTE'       // same as above
      composerArray[0].composer_split.toFixed(2)/2,
      // 'PHONO % COMPO 1 POSSEDE'      // same as above
      composerArray[0].composer_split.toFixed(2)/2,
      // 'PHONO % COMPO 1 COLLECTE'     // same as above
      composerArray[0].composer_split.toFixed(2)/2,
      // 'COMPO 2'
      composerArray[1]
      ? `${composerArray[1].first}${composerArray[1].middle ? " " + composerArray[1].middle : ''} ${composerArray[1].last}`
      : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[1]
      ? 'C'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[1]
      ? 'O'
      : '',
      // 'DEP % COMPO 2 POSSEDE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'DEP % COMPO 2 COLLECTE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 2 POSSEDE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 2 COLLECTE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'COMPO 3'
      composerArray[2]
      ? `${composerArray[2].first}${composerArray[2].middle ? " " + composerArray[2].middle : ''} ${composerArray[2].last}`
      : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[2]
      ? 'C'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[2]
      ? 'O'
      : '',
      // 'DEP % COMPO 3 POSSEDE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'DEP % COMPO 3 COLLECTE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 3 POSSEDE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 3 COLLECTE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'COMPO 4'
      composerArray[3]
      ? `${composerArray[3].first}${composerArray[3].middle ? " " + composerArray[3].middle : ''} ${composerArray[3].last}`
      : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[3]
      ? 'C'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[3]
      ? 'O'
      : '',
      // 'DEP % COMPO 4 POSSEDE'
      composerArray[3] ? composerArray[3].composer_split.toFixed(2)/2 : '',
      // 'DEP % COMPO 4 COLLECTE'
      composerArray[3] ? composerArray[3].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 4 POSSEDE'
      composerArray[3] ? composerArray[3].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 4 COLLECTE'
      composerArray[3] ? composerArray[3].composer_split.toFixed(2)/2 : '',
      // 'COMPO 5'
      composerArray[4]
      ? `${composerArray[4].first}${composerArray[4].middle ? " " + composerArray[4].middle : ''} ${composerArray[4].last}`
      : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[4]
      ? 'C'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[4]
      ? 'O'
      : '',
      // 'DEP % COMPO 5 POSSEDE'
      composerArray[4] ? composerArray[4].composer_split.toFixed(2)/2 : '',
      // 'DEP % COMPO 5 COLLECTE'
      composerArray[4] ? composerArray[4].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 5 POSSEDE'
      composerArray[4] ? composerArray[4].composer_split.toFixed(2)/2 : '',
      // 'PHONO % COMPO 5 COLLECTE'
      composerArray[4] ? composerArray[4].composer_split.toFixed(2)/2 : '',
      // 'EDITEUR ORIGINAL 1'
      composerArray[0].publisher_name,
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      'E',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      'O',
      // 'DEP % ED.OR 1 POSSEDE'
      composerArray[0].composer_split.toFixed(2)/2,
      // 'DEP % ED.OR 1 COLLECTE'
      composerArray[0].composer_split.toFixed(2)/2,
      // 'PHONO % ED.OR 1 POSSEDE'
      composerArray[0].composer_split.toFixed(2)/2,
      // 'PHONO % ED.OR 1 COLLECTE'
      composerArray[0].composer_split.toFixed(2)/2,
      // 'EDITEUR ORIGINAL 2'
      composerArray[1] ? composerArray[1].publisher_name : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[1]
      ? 'E'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[1]
      ? 'O'
      : '',
      // 'DEP % ED.OR 2 POSSEDE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'DEP % ED.OR 2 COLLECTE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'PHONO % ED.OR 2 POSSEDE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'PHONO % ED.OR 2 COLLECTE'
      composerArray[1] ? composerArray[1].composer_split.toFixed(2)/2 : '',
      // 'EDITEUR ORIGINAL 3'
      composerArray[2] ? composerArray[2].publisher_name : '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[2]
      ? 'E'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[2]
      ? 'O'
      : '',
      // 'DEP % ED.OR 3 POSSEDE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'DEP % ED.OR 3 COLLECTE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'PHONO % ED.OR 3 POSSEDE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'PHONO % ED.OR 3 COLLECTE'
      composerArray[2] ? composerArray[2].composer_split.toFixed(2)/2 : '',
      // 'SOUS EDITEUR'
      '',
      // 'CATEG.'                       // catégorie = the quality of the artist : Author, Compositor, Editeur (please put just the first letter (A/C/E)
      composerArray[5]
      ? 'E'
      : '',
      // 'REPRES.'                      // if you represent the artist or not (if you are the publisher) you put O for YES and N for NO.
      composerArray[5]
      ? 'O'
      : '',
      // 'DEP % SOUS EDITEUR POSSEDE'
      '',
      // 'DEP % SOUS EDITEUR COLLECTE'
      '',
      // 'PHONO % SOUS EDITEUR POSSEDE'
      '',
      // 'PHONO % SOUS EDITEUR COLLECTE'
      '',
      // 'TOTAL DEP POSSEDE'
      `=F${rowIndex + 2}+M${rowIndex + 2}+T${rowIndex + 2}+AA${rowIndex + 2}+AH${rowIndex + 2}+AO${rowIndex + 2}+AV${rowIndex + 2}+BC${rowIndex + 2}+BJ${rowIndex + 2}`,
      // 'TOTAL DEP COLLECTE'
      `=G${rowIndex + 2}+N${rowIndex + 2}+U${rowIndex + 2}+AB${rowIndex + 2}+AI${rowIndex + 2}+AP${rowIndex + 2}+AW${rowIndex + 2}+BD${rowIndex + 2}+BK${rowIndex + 2}`,
      // 'TOTAL PHONO POSSEDE'
      `=H${rowIndex + 2}+O${rowIndex + 2}+V${rowIndex + 2}+AC${rowIndex + 2}+AJ${rowIndex + 2}+AQ${rowIndex + 2}+AX${rowIndex + 2}+BE${rowIndex + 2}+BL${rowIndex + 2}`,
      // 'TOTAL PHONO COLLECTE'
      `=I${rowIndex + 2}+P${rowIndex + 2}+W${rowIndex + 2}+AD${rowIndex + 2}+AK${rowIndex + 2}+AR${rowIndex + 2}+AY${rowIndex + 2}+BF${rowIndex + 2}+BM${rowIndex + 2}`,
      // 'VERIFICATION DES TOTAUX'
      `=IF(OR(BN${rowIndex + 2}<>100;BO${rowIndex + 2}<>100;BP${rowIndex + 2}<>100;BQ${rowIndex + 2}<>100);"ERREUR";"ok")`
     ]
     csvData.push(`${wavRow.join('\t')}`)
     progressCallBack(rowIndex, filteredLibrary.length)
   })
   generateDownload(csvData.join('\n'), `DLM_${state.releaseFilter.label + "_"}${state.inclusive ? 'INC_' : ''}ALTER_K_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.csv`);
}

// ******************************************************************************************
//  OLD ALTER K RELEASES EXPORT FUNCTION
// ------------------------------------------------------------------------------------------
//  done & perfect
// ******************************************************************************************

const oldAlterKExport = (props, state) => {
  let headersRow = [
     'Category', 'CD #', 'Composer', 'Description', 'Duration', 'Instrumentation', 'PRO',
     'Publisher', 'Release', 'Composer Split', 'Publisher Split', 'Style', 'Tempo', 'Song Title',
     'Track #', 'Track ID', 'Cue Rating', 'ISRC', 'Sounds Like Band', 'Sounds Like Film'
   ];

  let csvData = [];
  csvData.push(headersRow.join('\t'));
  props.selectedLibrary.library.filter(cue =>
    cue.rel_id === state.releaseFilter.value && cue.cue_status !== 'Pulled'
  ).forEach(row => {

    // --------------------------------------------------------------------------------------------------
    // these little functions parse data to Title Case formatting
    // and remove empty keywords/instruments and tailing commas
    // --------------------------------------------------------------------------------------------------
    let descriptionString = parseData(row.cue_desc).join(', ');
    let instrumentsString = parseData(row.cue_instrus_edit).join(', ');

    // --------------------------------------------------------------------------------------------------
    // creates composer/publisher/splits data
    // --------------------------------------------------------------------------------------------------

    let compString = '';
    let proString = '';
    let pubString = '';
    let splitString = '';
    let pubSplit = '';
    let composerArray = props.selectedComposers.filter(composer => composer.cue_id === row.cue_id);

    for(let c in composerArray){
      compString += `${composerArray[c].first}${composerArray[c].middle ? ' ' + composerArray[c].middle  : ''} ${composerArray[c].last}${composerArray[c].suffix ? ' ' + composerArray[c].suffix : ''}`;
      compString += c < composerArray.length - 1 ? ' / ' : '';

      proString += (c > 0) && (proString !== composerArray[c].pro_name) ? ' / ' : '';
      proString += composerArray[c].pro_name !== proString ? composerArray[c].pro_name : '';

      pubString += (c > 0) && (pubString !== composerArray[c].publisher_name) ? ' / ' : '';
      pubString += (composerArray[c].pro_name ===  'ASCAP' || 'BMI' || 'SESAC') && (pubString.split('/')[0].trim() !== composerArray[c].publisher_name) ? `${composerArray[c].publisher_name}` : '';

      splitString += `${composerArray[c].composer_split !== 100 ? composerArray[c].composer_split.toFixed(2) : composerArray[c].composer_split}`
      splitString += c < composerArray.length - 1 ? ' / ' : '';

      pubSplit = pubString.includes('/') ? `50.00 / 50.00` : '100'
    }

    // --------------------------------------------------------------------------------------------------

    let wavRow = [
      // 'Category'
      `${props.selectedCategories.filter(category => category.cat_id === row.cat_id).map(cat => cat.cat_name)}`,
      // 'CD #'
      `DLM${row.style_id.toString().padStart(3, 0)}`,
      // 'Composer'
      compString,
      // 'Description'
      descriptionString,
      // 'Duration'
      row.cue_duration,
      // 'Instrumentation'
      instrumentsString,
      // 'PRO'
      proString,
      // 'Publisher'
      pubString,
      // 'Release'
      state.releaseFilter.label,
      // 'Composer Split'
      splitString,
      // 'Publisher Split'
      pubSplit,
      // 'Style'
      `${props.selectedStyles.filter(styles => styles.style_id === row.style_id).map(style => style.style_name)}`,
      // 'Tempo'
      props.tempos.filter(tempo => tempo.tempo_id === row.tempo_id)[0].tempo_name,
      // 'Song Title'
      row.cue_title,
      // 'Track #'
      row.cue_id,
      // 'Track ID'
      row.cue_id,
      // 'Cue Rating'
      'N/A',   // row.cue_rating,
      // ISRC
      `US-RRD-${row.cue_reldate_h.substring(2, 4)}-${row.cue_id.toString().slice(1)}`,
      // 'Sounds Like Band'
      row.sounds_like_band_edit || 'N/A',
      // 'Sounds Like Film'
      row.sounds_like_film_edit || 'N/A'
     ]
     csvData.push(`${wavRow.join('\t')}`)
   })
   generateDownload(csvData.join('\n'), `DLM_${state.releaseFilter.label + "_"}ALTER_K_EXPORT_${moment().format('YYYY.MM.DD-HH_mm_ss')}.txt`);
}

// ******************************************************************************************
// parseData function
// ------------------------------------------------------------------------------------------
// this function capitalizes all the words in the descriptions and insturments of each cue,
// it also removes blank spaces and trailing commas
// ******************************************************************************************

const parseData = (array) => {
  let parsedArray = []
    if(array !== null){
      array.split(', ').forEach(desc => {
        let wordArray = []
        desc.replace(',', '').split(' ').forEach(word => {
           word.replace(/\w\S*/g, txt => {
             wordArray.push(txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase())
           })
        })
        if(wordArray[0] !== undefined){
         parsedArray.push(wordArray.join(' '))
        }
      })
    }
  return parsedArray;
}

// ******************************************************************************************
// generateDownload function
// ------------------------------------------------------------------------------------------
// this function takes the fileName as an argument and generates a link for that export
// ******************************************************************************************
const generateDownload = (csvData, fileName) => {
  let downloadLink = document.createElement("a");
  let blob = new Blob(["\ufeff", csvData]);
  let url = URL.createObjectURL(blob);
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

// this function is passed as the last argument in the Export functions so we can track the download progress.
const downloadProgress = (current, length) => {
  // console.log(current/length)
  return current/length
}


export {
  alterKExport, asyncExport, batchChecker, downloadProgress, exportError,
  generateDownload, parseData, proTunesExport
};


// ******************************************************************************************











// ******************************************************************************************
