const express = require('express');
const moment = require('moment');
const mysql = require('mysql');
const path = require('path');
const cors = require('cors');
const indieDB = require('./connection');
const app = express();
const util = require('util');
const port = process.env.PORT || 4000;

util.inspect.defaultOptions.maxArrayLength = null;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({credentials: true, origin: true}));
app.options('*', cors())
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.sendFile(path.join(__dirname + '/public/index.html'));
  // res.sendFile(path.resolve(__dirname + '/../dist/index.html'));
  next();
})

// ********************************************************************************************************************************
// ********************************************************************************************************************************


app.get('/api/independent-artists/composersIA/', (req, res) => {
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
    return err ? res.send(err) : res.json({
      data: results
    });
  });
})

app.get('/api/independent-artists/categoriesIA/', (req, res) => {
  indieDB.query(`SELECT cat_id, cat_name FROM categories`, (err, results) => {
    for (let i in results) {
      results[i].selected = false;
    }
    return err ? res.send(err) : res.json({
      data: results
    })
  })
})

app.get('/api/independent-artists/tracksIA/', (req, res) => {
  indieDB.query(`SELECT cues.cue_id, cues.cat_id, cues.style_id, cues.cue_title, cues.cue_desc, cues.key_id_arry, cues.cue_duration, cues.cue_rating,
    cues.cue_duration_sec, cues.cue_duration_id, cues.cue_status, cues.rel_id, cues.tempo_id, cues.cue_instrus_edit,
    cues.cue_reldate_h, cues.artist_id, cues.instru_avail, artists.artist_id, artists.artist_name
    FROM cues
    JOIN artists
    ON cues.artist_id = artists.artist_id
    ORDER BY cues.cue_title
    ASC`, (err, results) => {
    return err ? res.send(err) : res.json({
      data: results
    })
  })
})

app.get('/api/independent-artists/stylesIA/', (req, res) => {
  indieDB.query(`SELECT styles.style_id, styles.style_name, categories.cat_id, categories.cat_name FROM categories JOIN styles ON styles.cat_id = categories.cat_id ORDER BY style_name ASC`, (err, results) => {
    for (let i in results) {
      results[i].selected = false;
    }
    return err ? res.send(err) : res.json({
      data: results
    });
  });
})

app.get('/api/independent-artists/instrumentsIA', (req, res) => {
  indieDB.query(`SELECT instru_id, instru_name, selected_admin FROM instruments`, (err, results) => {
    for (let i in results) {
      results[i].selected = false;
    }
    return err ? res.send(err) : res.json({
      data: results
    });
  })
})

// AND key_cnt > 5
app.get('/api/independent-artists/keywordsIA/', (req, res) => {
  indieDB.query(`SELECT key_name, key_cnt, key_id FROM master_keys WHERE key_name <> "" ORDER BY key_cnt DESC`, (err, results) => {
    for (let i in results) {
      results[i].selected = false;
    }
    return err ? res.send(err) : res.json({
      data: results
    });
  })
})

app.post('/api/independent-artists/keywordsIA/update/:id', (req, res) => {
  let keyword = req.body.keyword;
  indieDB.query(`UPDATE master_keys SET key_cnt = ? WHERE key_id = ?`, [keyword.key_cnt, keyword.key_id], (err) =>
    err ? console.log(164, err) : console.log(`keycount set`))
})

app.get('/api/independent-artists/master-id/', (req, res) => {
  indieDB.query(`SELECT master_cue_id, cue_id, cue_title FROM master_cues_id`, (err, results) => {
    return err ? res.send(err) : res.json({
      data: results
    })
  })
})


app.get('/api/independent-artists/releasesIA/', (req, res) => {
  indieDB.query(`SELECT rel_id, rel_num FROM releases ORDER BY rel_id DESC`, (err, results) => {
    return err ? res.send(err) : res.json({
      data: results
    });
  });
})

app.get('/api/independent-artists/artistsIA/', (req, res) => {
  indieDB.query(`SELECT artist_id, artist_name, artist_status FROM artists`, (err, results) => {
    return err ? res.send(err) : res.json({
      data: results
    });
  });
})


app.get('/api/independent-artists/temposIA/', (req, res) => {
  indieDB.query(`SELECT tempo_id, tempo_name FROM tempos`, (err, results) => {
    for (let i in results) {
      results[i].selected = false;
    }
    return err ? res.send(err) : res.json({
      data: results
    });
  })
})

app.post('/api/independent-artists/tracksIA/update/:id', (req, res) => {
  let updatedCue = req.body.updatedCue;
  indieDB.query(`UPDATE cues SET cat_id = ?, style_id = ?, cue_title = ?, cue_desc = ?,
    tempo_id = ?, cue_instrus_edit = ?, date_modified = ? WHERE cue_id = ?`,
    [updatedCue.cat_id, updatedCue.style_id, updatedCue.cue_title, updatedCue.cue_desc, updatedCue.tempo_id,
    updatedCue.cue_instrus_edit,
    moment().format('YYYY-MM-DD HH:mm:ss'), req.params.id], (err) => err ? console.log(err) : console.log(`${updatedCue.cue_id} ${updatedCue.cue_title} successfully updated.`)
  )
})
// ********************************************************************************************************************************


app.listen(port, () => {
  console.log('Server is up!', port);
})





// ********************************************************************************************************************************
