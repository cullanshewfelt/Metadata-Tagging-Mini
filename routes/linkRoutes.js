const fs = require('fs');
const express = require('express');
let router = express.Router()
const moment = require('moment');

// ********************************************************************************************************************************
// FILE MOVE
// ********************************************************************************************************************************
const codecs = ['mp3', 'wav'];

router.post('/init-BI/:cat/:style', (req, res) => {
  const selectedCue = req.body.selectedCue;
  const cat = req.params.cat;
  const style = req.params.style;
  codecs.forEach(codec => {
    const filePath = `public/proc_music/${codec}/DLM - ${selectedCue.cue_title}.${codec}`;
    const newFilePath = `public/bi_music/${codec}/${cat}/${style}/DLM - ${selectedCue.cue_title}.${codec}`;
    if(fs.existsSync(filePath)){
      fs.rename(filePath, newFilePath, (err) => {
        if(err){
          console.error(21, err);
        } else {
          console.log(23, `${filePath} moved to ${newFilePath}`)
        }
      });
    }
  })
  res.send();
});

router.post('/init-IA/:cat/:style', (req, res) => {
  const selectedCue = req.body.selectedCue;
  const cat = req.params.cat;
  const style = req.params.style;
  codecs.forEach(codec => {
    const filePath = `public/proc_music/${codec}/IA - ${selectedCue.cue_title}.${codec}`;
    const newFilePath = `public/ia_music/${codec}/${cat}/${style}/IA - ${selectedCue.cue_title}.${codec}`;
    if(fs.existsSync(filePath)){
      fs.rename(filePath, newFilePath, (err) => {
        if(err){
          console.error(42, err);
        } else {
          console.log(44, `${filePath} moved to ${newFilePath}`)
        }
      });
    }
  })
  res.send();
});

router.post('/BI/:cats/:styles', (req, res) => {
  const selectedCue = req.body.selectedCue;
  let catFrom = req.params.cats.split('+')[0];
  let catTo = req.params.cats.split('+')[1];
  let styleFrom = req.params.styles.split('+')[0];
  let styleTo = req.params.styles.split('+')[1];
  codecs.forEach(codec => {
    const filePath = `public/bi_music/${codec}/${catFrom}/${styleFrom}/DLM - ${selectedCue.cue_title}.${codec}`;
    const newFilePath = `public/bi_music/${codec}/${catTo}/${styleTo}/DLM - ${selectedCue.cue_title}.${codec}`;
    if(fs.existsSync(filePath)){
      fs.rename(filePath, newFilePath, (err) => {
        if(err){
          console.error(62, err);
        } else {
          console.log(64, `${filePath} moved to ${newFilePath}`)
        }
      });
    }
  })
  res.send();
});

router.post('/IA/:cats/:styles', (req, res) => {
  const selectedCue = req.body.selectedCue;
  let catFrom = req.params.cats.split('+')[0];
  let catTo = req.params.cats.split('+')[1];
  let styleFrom = req.params.styles.split('+')[0];
  let styleTo = req.params.styles.split('+')[1];
  codecs.forEach(codec => {
    const filePath = `public/ia_music/${codec}/${catFrom}/${styleFrom}/DLM - ${selectedCue.cue_title}.${codec}`;
    const newFilePath = `public/ia_music/${codec}/${catTo}/${styleTo}/DLM - ${selectedCue.cue_title}.${codec}`;
    if(fs.existsSync(filePath)){
      fs.rename(filePath, newFilePath, (err) => {
        if(err){
          console.error(83, err);
        } else {
          console.log(85, `${filePath} moved to ${newFilePath}`)
        }
      });
    }
  })
  res.send();
});

module.exports = router;
