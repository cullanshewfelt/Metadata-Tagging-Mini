const moment = require('moment');
const express = require('express');
const indieDB = require('../connection');
let router = express.Router()

// ********************************************************************************************************************************
// INSTRUMENTAL ARTISTS ROUTER
// ********************************************************************************************************************************
// IA Tracks Routes
// ********************************************************************************************************************************

router.get('/tracksIA/', (req, res) => {
  console.log(12, 'fetching all IA tracks')
  indieDB.query(`SELECT cue_id, cat_id, style_id, cue_title, key_id_arry, cue_status
    FROM cues
    ORDER BY cue_title
    ASC`,
    (err, results) => {
      // console.log(19, results)
      return err
        ? res.send(err) & console.log(22, err)
        : res.json({ data: results })
    })
})

router.get('/tracksIA/:cueId', (req, res) => {
  console.log(29, 'fetching metadata for cue_id:', req.params.cueId)
  indieDB.query(`SELECT cues.cue_id, cues.cat_id, cues.style_id, cues.cue_title, cues.cue_desc, cues.cue_duration, cues.cue_rating,
    cues.cue_duration_sec, cues.cue_duration_id, cues.cue_status, cues.rel_id, cues.tempo_id, cues.cue_instrus_edit,
    cues.cue_reldate_h, cues.artist_id, cues.instru_avail, artists.artist_id, artists.artist_name, cues.key_id_arry
    FROM cues
    JOIN artists
    ON cues.artist_id = artists.artist_id
    WHERE cue_id = ?`,
    [req.params.cueId],
    (err, results) => {
      // console.log(39, results)
      return err ?
        res.send(err) :
        res.json({
          data: results
        })
    })
})

router.post('/tracksIA/update/:id', (req, res) => {
  let updatedCue = req.body.updatedCue;
  indieDB.query(`UPDATE cues SET cat_id = ?, style_id = ?, cue_title = ?, cue_desc = ?,
    tempo_id = ?, cue_instrus_edit = ?, date_modified = ?,
    cue_rating = ?, cue_status = ?  WHERE cue_id = ?`, [
    updatedCue.cat_id,
    updatedCue.style_id,
    updatedCue.cue_title,
    updatedCue.cue_desc,
    updatedCue.tempo_id,
    updatedCue.cue_instrus_edit,
    moment().format('YYYY-MM-DD HH:mm:ss'),
    updatedCue.cue_rating,
    updatedCue.cue_status,
    req.params.id
  ], (err) => {
    err
      ?
      console.log(68, err) :
      console.log(69, `'${updatedCue.cue_id}' ${updatedCue.cue_title} successfully updated.`)
  })
})

// fetches cues from a specific release
router.get('/tracksIA/rel/:releaseID', (req, res) => {
  console.log(73, `fetching IA tracks release_id ${req.params.releaseID}`)
  indieDB.query(`SELECT cue_id, cat_id, style_id, cue_title, rel_id, key_id_arry, cue_status
    FROM cues
    WHERE rel_id = ?
    ORDER BY cue_title`,
    [req.params.releaseID],
    (err, results) => {
      // console.log(83, results)
      return err ?
        res.send(err) :
        res.json({
          data: results
        });
    });
});

// ********************************************************************************************************************************
// IA Instrument Routes
// ********************************************************************************************************************************

router.get('/instrumentsIA', (req, res) => {
  indieDB.query(`SELECT instru_id, instru_name, selected_admin FROM instruments`, (err, results) => {
    const instruments = results.map(inst => ({
      ...inst,
      selected: false
    }))
    return err ?
      res.send(err) :
      res.json({
        data: results
      });
  })
})

// create front-end logic:
router.post('/instrumentsIA/new', (req, res) => {
  let newInstrument = {
    instru_name: req.body.instrument,
    // instru_cnt: 0,  IA library does not track instru_cnt
    instru_status: 'show'
  }
  indieDB.query(`INSERT INTO instruments SET ?`, newInstrument, (err, results) => {
    if (err) {
      console.log(119, err)
    } else {
      let insertId = results.insertId;
      console.log(122, ` new IA Instrument ${newInstrument.instru_name} inserted at instur_id = ${insertId}`)
      newInstrument.instru_id = insertId;
      res.statusMessage = JSON.stringify(newInstrument);
      res.send();
    }
  })
})

// no sense in updating sense instru_cnt is not being recorded anyways
// router.post('/instrumentsIA/update/:id', (req, res) => {
//   indieDB.query(`UPDATE instruments SET instru_cnt = ? WHERE instru_id = ?`, [req.body.instru_cnt, req.params.id], (err, results) => {
//     if(err){
//       console.log(err)
//     } else {
//       console.log(156, `IA instru ${keyword.key_name} key_cnt set to ${keyword.key_cnt}`)
//     }
//   })
// })

// ********************************************************************************************************************************
// IA master_keys Routes - !!! all routes need front end client logic !!!
// ********************************************************************************************************************************
// !!! all routes need front end client logic !!!
// AND key_cnt > 5
router.get('/masterKeywordsIA/',
  (req, res) => {
  indieDB.query(`SELECT key_name, key_cnt, key_id
    FROM master_keys
    WHERE key_name <> ""
    ORDER BY key_cnt DESC`,
    (err, results) => {
      return err ?
        res.send(err) :
        res.json({ data: results });
    })
})

// need to create front end redux dispatch for this:
router.post('/masterKeywordsIA/new', (req, res) => {
  let newMasterKey = {
    key_name: req.body.keyword,
    key_cnt: 0
  }
  indieDB.query(`INSERT INTO master_keys SET ?`, newMasterKey, (err, results) => {
    if (err) {
      console.log(169, err)
    } else {
      let insertId = results.insertId;
      console.log(172, ` new IA keyword '${newMasterKey.key_name}' inserted at key_id = `, insertId)
      newMasterKey.instru_id = insertId;
      res.statusMessage = JSON.stringify(newMasterKey);
      res.send();
    }
  })
})

// need to create front end redux dispatch for this:
router.post('/masterKeywordsIA/update/:id', (req, res) => {
  const keyword = req.body.keyword;
  const message = `IA master_key '${keyword.key_name}' key_cnt set to ${keyword.key_cnt}`;
  indieDB.query(
    `UPDATE master_keys SET key_cnt = ? WHERE key_id = ?`,
     [ keyword.key_cnt, keyword.key_id ],
    (err) => {
      if(err){
        console.log(187, err)
      } else {
        res.statusMessage = JSON.stringify(message);
        console.log(190, message) & res.send()
      }
    })
})

// ********************************************************************************************************************************
// IA keywords Routes
// ********************************************************************************************************************************
// AND key_cnt > 5
router.get('/keywordsIA/', (req, res) => {
  indieDB.query(`SELECT keyword_name, key_cnt, keyword_id FROM keywords WHERE keyword_name <> "" ORDER BY key_cnt DESC`, (err, results) => {
    const keywords = results.map(keys => ({
      ...keys,
      selected: false
    }))
    return err ?
      res.send(err) :
      res.json({
        data: keywords
      });
  })
})

// need to create front end redux dispatch for this:
router.post('/keywordsIA/new', (req, res) => {
  let newKeyword = {
    keyword_name: req.body.keyword,
    key_cnt: 0
  }
  indieDB.query(`INSERT INTO keywords SET ?`, newKeyword, (err, results) => {
    if (err) {
      console.log(219, err)
    } else {
      let insertId = results.insertId;
      console.log(222, ` new IA keyword '${newKeyword.keyword_name}' inserted at keyword_id = `, insertId)
      newKeyword.keyword_id = insertId;
      res.statusMessage = JSON.stringify(newKeyword);
      res.send();
    }
  })
})

router.post('/keywordsIA/update/:id', (req, res) => {
  let keyword = req.body.keyword;
  indieDB.query(
    `UPDATE keywords SET key_cnt = ? WHERE keyword_id = ?`, [
      keyword.key_cnt, keyword.keyword_id
    ], (err) => err ?
    console.log(238, err) :
    console.log(239, `IA keyword '${keyword.keyword_name}' key_cnt set to ${keyword.key_cnt}`)) & res.send();
})
// ********************************************************************************************************************************
// IA
// ********************************************************************************************************************************
router.get('/composersIA/', (req, res) => {
  indieDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name, publishers.ipi, publishers.publisher_pro,
      pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split, composers.cae, composers.first, composers.middle, composers.last, composers.composer_status, composers.suffix
      FROM composers
      JOIN cue_2_composer
      ON cue_2_composer.composer_id = composers.composer_id
      JOIN pref_rights_org
      ON pref_rights_org.pro_id = composers.pro_id
      JOIN publishers
      ON publishers.publisher_id = composers.publisher_id
      JOIN cues
      ON cue_2_composer.cue_id = cues.cue_id
      ORDER BY composer_id
      DESC;
      `, (err, results) => {
    // console.log(results)
    return err ?
      res.send(err) :
      res.json({
        data: results
      });
  });
})

router.get('/composersIA/:cueId', (req, res) => {
  console.log(263, 'fetching composers for cue_id: ', req.params.cueId);
  indieDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name, publishers.ipi, publishers.publisher_pro,
      pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split, composers.cae, composers.first, composers.middle, composers.last, composers.composer_status, composers.suffix
      FROM composers
      JOIN cue_2_composer
      ON cue_2_composer.composer_id = composers.composer_id
      JOIN pref_rights_org
      ON pref_rights_org.pro_id = composers.pro_id
      JOIN publishers
      ON publishers.publisher_id = composers.publisher_id
      JOIN cues
      ON cue_2_composer.cue_id = cues.cue_id
      WHERE cues.cue_id = ?`, [req.params.cueId], (err, results) => {
    // console.log(667, results)
    return err ?
      res.send(err) :
      res.json({
        data: results
      });
  })
})

router.get('/categoriesIA/', (req, res) => {
  indieDB.query(`SELECT cat_id, cat_name FROM categories`, (err, results) => {
    const catgegories = results.map(cat => ({
      ...cat,
      selected: false
    }))
    return err ?
      res.send(err) :
      res.json({
        data: catgegories
      })
  })
})

router.get('/stylesIA/', (req, res) => {
  indieDB.query(`SELECT styles.style_id, styles.style_name, categories.cat_id, categories.cat_name FROM categories JOIN styles ON styles.cat_id = categories.cat_id ORDER BY style_name ASC`, (err, results) => {
    const styles = results.map(style => ({
      ...style,
      selected: false
    }))
    return err ?
      res.send(err) :
      res.json({
        data: styles
      });
  });
})

router.get('/master-id/', (req, res) => {
  indieDB.query(`SELECT master_cue_id, cue_id, cue_title FROM master_cues_id`, (err, results) => {
    return err ?
      res.send(err) :
      res.json({
        data: results
      })
  })
})

router.get('/releasesIA/', (req, res) => {
  indieDB.query(`SELECT rel_id, rel_num FROM releases ORDER BY rel_id DESC`, (err, results) => {
    return err ?
      res.send(err) :
      res.json({
        data: results
      });
  });
})

router.get('/artistsIA/', (req, res) => {
  indieDB.query(`SELECT artist_id, artist_name, artist_status FROM artists`, (err, results) => {
    return err ?
      res.send(err) :
      res.json({
        data: results
      });
  });
})

router.get('/temposIA/', (req, res) => {
  indieDB.query(`SELECT tempo_id, tempo_name FROM tempos`, (err, results) => {
    const tempos = results.map(tempo => ({
      ...tempo,
      selected: false
    }))
    return err ?
      res.send(err) :
      res.json({
        data: tempos
      });
  })
})

module.exports = router;
