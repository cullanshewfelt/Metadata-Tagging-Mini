const fs = require('fs');
const express = require('express');
let router = express.Router()
const multer = require('multer');
const ffmetadata = require('ffmetadata');
const moment = require('moment');

const uploadAudio = multer({ dest: 'public/proc_music/mp3' });
const uploadText = multer({ dest: 'public/temp' });

// const catalogDB = require('../catalogDBconnection');

// ********************************************************************************************************************************
// UPLOADS ROUTER
// ********************************************************************************************************************************
// AUDIO UPLOAD
// --------------------------------------------------------------------------------------------------------------------------------

router.post('/proc_music/', uploadAudio.any(), (req, res) => {
  let successCount = 0;

  asyncRead(req.files, (file) => { // task()
    let fileType = file.originalname.includes('.mp3') ?
      'mp3' :
      file.originalname.includes('.wav') ?
      'wav' :
      ''

    let newFilePath = `public/proc_music/${fileType}/${file.originalname}`;

    if(!fs.existsSync(newFilePath)){
      fs.rename(file.path, newFilePath, (err) => {
        if(err){
          console.error(35, err);
        } else {
          successCount ++;
          console.log(37, `${file.originalname} successfully uploaded to ${newFilePath}`)
        }
      });
    } else {
      fs.unlink(file.path, (err) => {
        if(err) throw err;
        console.log(43, `${newFilePath} already exists. Deleting ${file.path}.`)
      });
    }
  })
  res.statusMessage = `${successCount} of ${req.files.length} files uploaded.`;
  return res.status(200).send({ success: true });
});

const asyncRead = (arr, task) => {
  setTimeout(() => {
    task(arr[0]);
    if (arr.length === 1) {
      // done();
    } else {
      asyncRead(arr.slice(1), task);
    }
  }, 0);
}

// ********************************************************************************************************************************
// METADATA UPLOAD
// ********************************************************************************************************************************

router.post('/bi/metadata/', uploadText.any(), async (req, res) => {
  // console.log(66, req.files)
  let filepath = req.files[0].path;
  let metadata = fs.readFileSync(filepath, 'utf8').split('\r\n').map(str => str.split('\t'));
  metadata
  metadata = metadata.map(x => (
    {
      cat: x[0], // Category,
      cd_num: x[1], // CD #
      composer: x[2], // Composer,
      cue_desc: x[3], // Description,
      cue_duration: x[4], // Duration,
      cue_instrus: x[5], // Instrumentation,
      pro: x[6], // PRO,
      publisher: x[7], // Publisher,
      release: x[8], // Release,
      composer_split: x[9],   // Composer Split,
      publisher_split: x[10], // Publisher Split,
      style: x[11], // Style,
      tempo: x[12], // Tempo,
      cue_title: x[13], // Song Title,
      track_no: x[14], // Track #,
      cue_rating: x[15], // Cue Rating,
      sounds_like_band: x[16], // Sounds Like Band,
      sounds_like_film: x[17], // Sounds Like Film,
      cue_notes: x[18] // Note,
    }
  ));
  await importBImetadataToSQL(metadata, filepath);
  res.send();
})

const importBImetadataToSQL = (metadataArray, filepath) => {
  metadataArray.shift(); // remove the header row

  metadataArray = metadataArray.map(x => {
    if(x.cue_duration){
      let timeArray = x.cue_duration && x.cue_duration.split(':');
      let seconds = parseInt(timeArray[1]) + (60 * parseInt(timeArray[0]));
      let durationId = durationParse(seconds);
      return ([19, 147, x.cue_title, '', '', '', '', 0, x.cue_duration, seconds, durationId, 137, 28, moment().utcOffset(+'-07:00', true).format('X'), moment().format('YYYY-MM-DD HH:mm:ss'), 'Pending', 0, x.sounds_like_film, x.sounds_like_band, x.cue_notes])
    }
  }).filter(y => y !== undefined);

  // and insert them into our SQL database
  const sqlQuery = "INSERT INTO cues (cat_id, style_id, cue_title, cue_desc, other_title, isrc, cue_desc_edit, cue_trk_num, cue_duration, cue_duration_sec, cue_duration_id, rel_id, tempo_id, cue_reldate, cue_reldate_h, cue_status, cue_rating, sounds_like_film_edit, sounds_like_band_edit, cue_notes) VALUES ? ";
  catalogDB.query(sqlQuery, [metadataArray], (err, res) => {
    if (err) throw err;
    console.log(157, `Successfully inserted ${res.affectedRows} rows into SQL table`);
    fs.unlink(filepath, (err) => {
      if(err) throw err;
      console.log(160, `Successfully deleted ${filepath}`)
    });
  });

  return 'finished'
}

const durationParse = (cueDuration) => {
  if (cueDuration >= 16 && cueDuration <= 30) {
    return '1';
  } else if (cueDuration >= 0 && cueDuration <= 15){
    return '7';
  } else if (cueDuration >= 31 && cueDuration <= 60){
    return '2';
  } else if (cueDuration >= 61 && cueDuration <= 90){
    return '3';
  } else if (cueDuration >= 91 && cueDuration <= 120){
    return '4';
  } else if (cueDuration > 120){
    return '5';
  }
}

module.exports = router;
