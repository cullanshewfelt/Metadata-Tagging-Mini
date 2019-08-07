const express = require('express');
const router = express.Router();
// const catalogDB = require('../catalogDBconnection');
const indieDB = require('../indieDBconnection');

// handles all express routes for the exports page

// ********************************************************************************************************************************
// EXPORT ROUTER
// --------------------------------------------------------------------------------------------------------------------------------
// NOTE:
// All export routes should only fetch ACTIVE tracks unless otherwise stated.
// ********************************************************************************************************************************
// BI CUES ROUTES
// ********************************************************************************************************************************
//
// router.get('/cuesBI/', (req, res) => {
//   console.log(15, 'fetching all BI cues for export')
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, cue_desc, cue_status,
//     cue_duration, cue_duration_sec, cue_duration_id, rel_id, tempo_id, cue_instrus_edit, cue_rating,
//     sounds_like_band_edit, sounds_like_film_edit, sounds_like_composer_edit, cue_reldate_h, key_id_arry
//     FROM cues
//     WHERE cue_status = 'Active'
//     AND
//     ORDER BY cue_title
//     ASC`,
//     (err, results) => {
//       return err ?
//         res.send(err) & console.log(25, err) :
//         res.json({
//           data: results
//         });
//     });
// });
//
// // fetches cues from a specific batch
// router.get('/cuesBI/batch/:batchID', (req, res) => {
//   console.log(35, `fetching BI cues batchID: ${req.params.batchID} for export`)
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, cue_desc, cue_status,
//     cue_duration, cue_duration_sec, cue_duration_id, rel_id, tempo_id, cue_instrus_edit, cue_rating,
//     sounds_like_band_edit, sounds_like_film_edit, sounds_like_composer_edit, cue_reldate_h, key_id_arry
//     FROM cues
//     WHERE cue_status = 'Active'
//     AND rel_id = ?
//     ORDER BY cue_title`,
//     [req.params.batchID],
//     (err, results) => {
//       // console.log(45, results)
//       return err ?
//         res.send(err) :
//         res.json({
//           data: results
//         });
//     });
// });
//
// // fetches cues from a specific release
// router.get('/cuesBI/rel/:releaseID', (req, res) => {
//   let releasesArray = req.params.releaseID.split('-');
//   console.log(57, `fetching BI cues release: ${req.params.releaseID} for export`)
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, cue_desc, cue_status,
//     cue_duration, cue_duration_sec, cue_duration_id, rel_id, tempo_id, cue_instrus_edit, cue_rating,
//     sounds_like_band_edit, sounds_like_film_edit, sounds_like_composer_edit, cue_reldate_h, key_id_arry
//     FROM cues
//     WHERE cue_status = 'Active'
//     AND rel_id >= ?
//     AND rel_id <= ?
//     ORDER BY cue_title`,
//     [releasesArray[releasesArray.length - 1], releasesArray[0]],
//     (err, results) => {
//       // console.log(68, results)
//       return err ?
//         res.send(err) :
//         res.json({
//           data: results
//         });
//     });
// });

// ********************************************************************************************************************************
// IA TRACKS ROUTES
// ********************************************************************************************************************************

router.get('/tracksIA/', (req, res) => {
  console.log(82, 'fetching all IA tracks for export')
  indieDB.query(`SELECT cues.cue_id, cues.cat_id, cues.style_id, cues.cue_title, cues.cue_desc, cues.cue_duration, cues.cue_rating,
    cues.cue_duration_sec, cues.cue_duration_id, cues.cue_status, cues.rel_id, cues.tempo_id, cues.cue_instrus_edit,
    cues.cue_reldate_h, cues.artist_id, cues.instru_avail, artists.artist_id, artists.artist_name, cues.key_id_arry
    FROM cues
    JOIN artists
    ON cues.artist_id = artists.artist_id
    WHERE cue_status = 'Active'
    OR cue_status = 'Instrumental_Active'
    ORDER BY cue_title
    ASC`,
    (err, results) => {
      // console.log(93, results)
      return err
        ? res.send(err) & console.log(95, err)
        : res.json({ data: results })
    })
})

// fetches cues from a specific release
router.get('/tracksIA/rel/:releaseID', (req, res) => {
  console.log(102, `fetching IA tracks release_id: ${req.params.releaseID} for export`)
  indieDB.query(`SELECT cues.cue_id, cues.cat_id, cues.style_id, cues.cue_title, cues.cue_desc, cues.cue_duration, cues.cue_rating,
    cues.cue_duration_sec, cues.cue_duration_id, cues.cue_status, cues.rel_id, cues.tempo_id, cues.cue_instrus_edit,
    cues.cue_reldate_h, cues.artist_id, cues.instru_avail, artists.artist_id, artists.artist_name, cues.key_id_arry
    FROM cues
    JOIN artists
    ON cues.artist_id = artists.artist_id
    WHERE (cue_status = 'Active'
    OR cue_status = 'Instrumental_Active')
    AND rel_id = ?
    ORDER BY cue_title`,
    [req.params.releaseID],
    (err, results) => {
      // console.log(114, results)
      return err ?
        res.send(err) :
        res.json({
          data: results
        });
    });
});

// ********************************************************************************************************************************
// BI COMPOSERS ROUTES
// ********************************************************************************************************************************

router.get('/composersBI/', (req, res) => {
  console.log(127, 'fetching all BI composers for export')
  catalogDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id,
    publishers.publisher_name, publishers.name_only, publishers.ipi, pref_rights_org.pro_name,
    pref_rights_org.pro_id, cue_2_composer.composer_split,
    composers.first, composers.middle, composers.last, composers.suffix, composers.cae
    FROM composers
    JOIN cue_2_composer
    ON cue_2_composer.composer_id = composers.composer_id
    JOIN pref_rights_org
    ON pref_rights_org.pro_id = composers.pro_id
    JOIN publishers
    ON publishers.publisher_id = composers.publisher_id
    JOIN cues
    ON cue_2_composer.cue_id = cues.cue_id
    WHERE composers.composer_status = 'Active'
    ORDER BY cue_title
    ASC`,
    (err, results) => {
      return err ?
        res.send(err) :
        res.json({
          data: results
        });
    });
})

router.get('/composersBI/batch/:batchID', (req, res) => {
  console.log(151, `fetching BI composers batchID: ${req.params.batchID} for export`)
  catalogDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id,
    publishers.publisher_name, publishers.name_only, publishers.ipi,
    pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split,
    composers.first, composers.middle, composers.last, composers.suffix, composers.cae
    FROM composers
    JOIN cue_2_composer
    ON cue_2_composer.composer_id = composers.composer_id
    JOIN pref_rights_org
    ON pref_rights_org.pro_id = composers.pro_id
    JOIN publishers
    ON publishers.publisher_id = composers.publisher_id
    JOIN cues
    ON cue_2_composer.cue_id = cues.cue_id
    WHERE composers.composer_status = 'Active'
    AND cues.rel_id = ?
    ORDER BY cues.cue_title
    ASC`,
    [req.params.batchID],
    (err, results) => {
      return err ?
        res.send(err) & console.log(170, err) :
        res.json({
          data: results
        });
    });
})

router.get('/composersBI/rel/:releaseID', (req, res) => {
  let releaseArray = req.params.releaseID.split('-').map(x => parseInt(x));
  console.log(179, `fetching BI composers release_id: ${req.params.releaseID} for export`)
  catalogDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id,
    publishers.publisher_name, publishers.name_only, publishers.ipi,
    pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split,
    composers.first, composers.middle, composers.last, composers.suffix, composers.cae
    FROM composers
    JOIN cue_2_composer
    ON cue_2_composer.composer_id = composers.composer_id
    JOIN pref_rights_org
    ON pref_rights_org.pro_id = composers.pro_id
    JOIN publishers
    ON publishers.publisher_id = composers.publisher_id
    JOIN cues
    ON cue_2_composer.cue_id = cues.cue_id
    WHERE composers.composer_status = 'Active'
    AND cues.rel_id >= ?
    AND cues.rel_id <= ?
    ORDER BY cues.cue_title
    ASC`,
    [releaseArray[releaseArray.length - 1], releaseArray[0]],
    (err, results) => {
      return err ?
        res.send(err) & console.log(199, err) :
        res.json({
          data: results
        });
    });
})

// ********************************************************************************************************************************
// IA COMPOSERS ROUTES
// ********************************************************************************************************************************

router.get('/composersIA/', (req, res) => {
  console.log(212, 'fetching all IA composers for export')
  indieDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name, publishers.ipi, publishers.publisher_pro,
    pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split, composers.cae,
    composers.first, composers.middle, composers.last, composers.composer_status, composers.suffix
    FROM composers
    JOIN cue_2_composer
    ON cue_2_composer.composer_id = composers.composer_id
    JOIN pref_rights_org
    ON pref_rights_org.pro_id = composers.pro_id
    JOIN publishers
    ON publishers.publisher_id = composers.publisher_id
    JOIN cues
    ON cue_2_composer.cue_id = cues.cue_id
    WHERE composers.composer_status = 'Active'
    ORDER BY cue_title
    ASC`,
    (err, results) => {
      return err ?
        res.send(err) & console.log(229, err) :
        res.json({
          data: results
        });
    });
})


router.get('/composersIA/rel/:releaseID', (req, res) => {
  let release = parseInt(req.params.releaseID)
  console.log(239, `fetching IA composers releaseID: ${release} for export`)
  indieDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name, publishers.ipi, publishers.publisher_pro,
      pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split, composers.cae,
      composers.first, composers.middle, composers.last, composers.composer_status, composers.suffix
      FROM composers
      JOIN cue_2_composer
      ON cue_2_composer.composer_id = composers.composer_id
      JOIN pref_rights_org
      ON pref_rights_org.pro_id = composers.pro_id
      JOIN publishers
      ON publishers.publisher_id = composers.publisher_id
      JOIN cues
      ON cue_2_composer.cue_id = cues.cue_id
      WHERE cues.rel_id = ?
      AND composers.composer_status = 'Active'
      ORDER BY composer_id
      DESC;`,
    [release],
    (err, results) => {
      return err ?
        res.send(err) & console.log(258, err) :
        res.json({
          data: results
        });
    });
})


module.exports = router;
