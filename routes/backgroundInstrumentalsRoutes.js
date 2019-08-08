// const express = require('express');
// const moment = require('moment');
// // const catalogDB = require('../catalogDBconnection');
// let router = express.Router()
//
// // ********************************************************************************************************************************
// // BACKGROUND INSTRUMENTAL ROUTER
// // ********************************************************************************************************************************
// // BACKGROUND INSTRUMENTAL CUES ROUTES
// // ********************************************************************************************************************************
// // WHERE cues.cue_status = 'PENDING'
// // WHERE cue_status != 'Pulled'
//
// // WHERE rel_id > 130  this will limit less data for dev purposes
// // fetches all cues
// router.get('/cuesBI/', (req, res) => {
//   console.log(14, 'fetching all BI cues')
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, rel_id, key_id_arry, cue_status
//     FROM cues
//     ORDER BY cue_title
//     ASC`,
//     (err, results) => {
//       return err ?
//         res.send(err) & console.log(21, err) :
//         res.json({
//           data: results
//         });
//     });
// });
//
// // fetches a single cue
// router.get('/cuesBI/:id/', (req, res) => {
//   console.log(30, 'fetching metadata for cue_id:', req.params.id)
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, cue_desc, cue_status,
//     cue_duration, cue_duration_sec, cue_duration_id, rel_id, tempo_id, cue_instrus_edit, cue_rating,
//     sounds_like_band_edit, sounds_like_film_edit, sounds_like_composer_edit, cue_reldate_h, key_id_arry
//     FROM cues
//     WHERE cue_id = ?`,
//     [req.params.id],
//     (err, results) => {
//       // console.log(37, results)
//       return err ?
//         res.send(err) & console.log(39, err) :
//         res.json({
//           data: results
//         });
//     });
// });
// // updates a cue
// // add key_id_arry to this query on front end
// router.post('/cuesBI/update/:id', (req, res) => {
//   let updatedCue = req.body.updatedCue;
//   catalogDB.query(`UPDATE cues SET cat_id = ?, style_id = ?, cue_title = ?, cue_desc = ?,
//     tempo_id = ?, cue_instrus_edit = ?, sounds_like_band_edit = ?,
//     sounds_like_film_edit = ?, sounds_like_composer_edit = ?,
//     date_modified = ?, cue_rating = ?, cue_status = ? WHERE cue_id = ?`,
//     [
//       updatedCue.cat_id,
//       updatedCue.style_id,
//       updatedCue.cue_title,
//       updatedCue.cue_desc,
//       updatedCue.tempo_id,
//       updatedCue.cue_instrus_edit,
//       updatedCue.sounds_like_band_edit,
//       updatedCue.sounds_like_film_edit,
//       updatedCue.sounds_like_composer_edit,
//       moment().format('YYYY-MM-DD HH:mm:ss'),
//       updatedCue.cue_rating,
//       updatedCue.cue_status,
//       req.params.id
//     ],
//     (err) => {
//       const responseMessage = err ?
//         'There was an error processing the request.' :
//         `${updatedCue.cue_id} '${updatedCue.cue_title}' successfully updated.`;
//       res.statusMessage = responseMessage;
//       err ?
//         console.log(75, err) :
//         console.log(76, responseMessage) & res.send()
//     })
// })
//
// // WHERE cue_status != 'Pulled'
// // fetches cues from a specific release
// router.get('/cuesBI/rel/:releaseID', (req, res) => {
//   console.log(73, `fetching BI cues release_id ${req.params.releaseID}`)
//   catalogDB.query(`SELECT cue_id, cat_id, style_id, cue_title, rel_id, key_id_arry, cue_status
//     FROM cues
//     WHERE rel_id = ?
//     ORDER BY cue_title`, [req.params.releaseID], (err, results) => {
//     // console.log(88, results)
//     return err ?
//       res.send(err) :
//       res.json({
//         data: results
//       });
//   });
// });
//
// // ********************************************************************************************************************************
// // BI COMPOSERS
// // ********************************************************************************************************************************
// // WHERE cues.cue_status = 'PENDING'
// // composers.cae, publishers.ipi,
// router.get('/composersBI/', (req, res) => {
//   catalogDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name, publishers.name_only,
//     pref_rights_org.pro_name, pref_rights_org.pro_id, cue_2_composer.composer_split
//     FROM composers
//     JOIN cue_2_composer
//     ON cue_2_composer.composer_id = composers.composer_id
//     JOIN pref_rights_org
//     ON pref_rights_org.pro_id = composers.pro_id
//     JOIN publishers
//     ON publishers.publisher_id = composers.publisher_id
//     JOIN cues
//     ON cue_2_composer.cue_id = cues.cue_id
//     WHERE composers.composer_status = 'Active'
//     ORDER BY cue_title
//     ASC;`,
//     (err, results) => {
//       return err ?
//         res.send(err) :
//         res.json({
//           data: results
//         });
//     });
// })
//
//
// router.get('/composersBI/:cueId', (req, res) => {
//   console.log(127, 'fetching composers for cue_id: ', req.params.cueId);
//   catalogDB.query(`SELECT cues.cue_id, cues.cue_title, composers.composer_name, composers.composer_id, publishers.publisher_name,
//     publishers.name_only, publishers.publisher_pro, pref_rights_org.pro_name, cue_2_composer.composer_split
//     FROM composers
//     JOIN cue_2_composer
//     ON cue_2_composer.composer_id = composers.composer_id
//     JOIN pref_rights_org
//     ON pref_rights_org.pro_id = composers.pro_id
//     JOIN publishers
//     ON publishers.publisher_id = composers.publisher_id
//     JOIN cues
//     ON cue_2_composer.cue_id = cues.cue_id
//     WHERE cues.cue_id = ?`,
//     [req.params.cueId],
//     (err, results) => {
//       // console.log(142, results)
//       return err ?
//         res.send(err) :
//         res.json({
//           data: results
//         });
//     })
// })
//
// // ********************************************************************************************************************************
// // BI Instruments Routes
// // ********************************************************************************************************************************
// // WHERE instru_status = "show"
//
// router.get('/instrumentsBI', (req, res) => {
//   catalogDB.query(`SELECT instru_id, instru_name, instru_cnt
//     FROM instruments
//     WHERE instru_name != ''
//     ORDER BY instru_cnt DESC`,
//     (err, results) => {
//       let data = results.map(result => ({
//         ...result,
//         selected: false
//       }));
//       return err ?
//         res.send(err) :
//         res.json({
//           data: data
//         });
//     })
// })
//
// router.post('/instrumentsBI/new', (req, res) => {
//   let newInstrument = {
//     instru_name: req.body.instrument,
//     instru_cnt: 0,
//     instru_status: 'show'
//   }
//   catalogDB.query(`INSERT INTO instruments SET ?`,
//     newInstrument,
//     (err, results) => {
//       if (err) {
//         console.log(184, err)
//       } else {
//         let insertId = results.insertId;
//         console.log(187, ` new BI Instrument '${newInstrument.instru_name}' inserted at instur_id = ${insertId}`)
//         newInstrument.instru_id = insertId;
//         res.statusMessage = JSON.stringify(newInstrument);
//         res.send();
//       }
//     })
// })
//
// router.post('/instrumentsBI/update/:id', (req, res) => {
//   let instrument = req.body.instrument;
//   // console.log(197, instrument);
//   // console.log(198, req.params.id);
//   catalogDB.query(`UPDATE instruments
//     SET instru_cnt = ?
//     WHERE instru_id = ?`,
//     [instrument.instru_cnt, req.params.id],
//     (err, results) => {
//       if (err) {
//         console.log(204, err)
//       } else {
//         console.log(206, `BI instru '${instrument.instru_name}' instru_cnt set to ${instrument.instru_cnt}`)
//       }
//     })
// })
//
// // ********************************************************************************************************************************
// // BI master_key Routes
// // ********************************************************************************************************************************
// // AND key_cnt > 5
//
// router.get('/masterKeywordsBI/',
//   (req, res) => {
//   catalogDB.query(`SELECT key_name, key_cnt, key_id
//     FROM master_keys
//     WHERE key_name <> ""
//     ORDER BY key_cnt DESC`,
//     (err, results) => {
//       return err ?
//         res.send(err) :
//         res.json({
//           data: results
//         });
//     })
// })
//
// // need to create front end redux dispatch for this:
// router.post('/masterKeywordsBI/new', (req, res) => {
//   let newMasterKey = {
//     key_name: req.body.keyword,
//     key_cnt: 0
//   }
//   catalogDB.query(`INSERT INTO master_keys SET ?`, newMasterKey, (err, results) => {
//     if (err) {
//       console.log(err)
//     } else {
//       let insertId = results.insertId;
//       console.log(241, ` new BI master_keyword '${newMasterKey.key_name}' inserted at key_id = `, insertId)
//       newMasterKey.instru_id = insertId;
//       res.statusMessage = JSON.stringify(newMasterKey);
//       res.send();
//     }
//   })
// })
//
// router.post('/masterKeywordsBI/update/:id', (req, res) => {
//   let keyword = req.body.keyword;
//   catalogDB.query(
//     `UPDATE master_keys SET key_cnt = ? WHERE key_id = ?`,
//     [ keyword.key_cnt, keyword.key_id ],
//     (err) => {
//       const responseMessage = err ?
//         'There was an error processing the request.' :
//         `BI master_key ${keyword.key_name} updated key_cnt to ${keyword.key_cnt}`;
//       res.statusMessage = responseMessage;
//       err ?
//         console.log(260, err) :
//         console.log(261, `BI master_key '${keyword.key_name}' updated key_cnt to ${keyword.key_cnt}`) & res.send()
//     }
//   )
// })
//
// // ********************************************************************************************************************************
// // BI keywords Routes
// // ********************************************************************************************************************************
// // AND key_cnt > 5
// router.get('/keywordsBI/', (req, res) => {
//   catalogDB.query(`SELECT keyword_name, key_cnt, keyword_id FROM keywords WHERE keyword_name <> "" AND key_cnt > 5 ORDER BY key_cnt DESC`, (err, results) => {
//     const keywords = results.map(keyword => ({
//       ...keyword,
//       selected: false
//     }))
//     return err ?
//       res.send(err) :
//       res.json({
//         data: keywords
//       });
//   })
// })
//
// // need to create front end redux dispatch for this:
// router.post('/keywordsBI/new', (req, res) => {
//   let newKeyword = {
//     keyword_name: req.body.keyword,
//     key_cnt: 0
//   }
//   catalogDB.query(`INSERT INTO keywords SET ?`, newKeyword, (err, results) => {
//     if (err) {
//       console.log(285, err)
//     } else {
//       let insertId = results.insertId;
//       console.log(288, ` new BI keyword '${newKeyword.keyword_name}' inserted at keyword_id = ${insertId}`)
//       newKeyword.keyword_id = insertId;
//       res.statusMessage = JSON.stringify(newKeyword);
//       res.send();
//     }
//   })
// })
//
// router.post('/keywordsBI/update/:id', (req, res) => {
//   let keyword = req.body.keyword;
//   catalogDB.query(
//     `UPDATE keywords SET key_cnt = ? WHERE keyword_id = ?`,
//     [keyword.key_cnt, keyword.keyword_id],
//     (err) => err ?
//     console.log(302, err) :
//     console.log(303, `BI keyword '${keyword.keyword_name}' key_cnt set to ${keyword.key_cnt}`) & res.send())
// })
//
// // ********************************************************************************************************************************
// // BI Misc.
// // ********************************************************************************************************************************
//
// router.get('/categoriesBI/', (req, res) => {
//   catalogDB.query(`SELECT cat_id, cat_name
//     FROM categories
//     WHERE cat_name != ''`,
//     (err, results) => {
//       const categories = results.map(cat => ({
//         ...cat,
//         selected: false
//       }))
//
//       return err ?
//         res.send(err) :
//         res.json({
//           data: categories
//         })
//     })
// })
//
// router.get('/stylesBI/', (req, res) => {
//   catalogDB.query(`SELECT styles.style_id, styles.style_name, styles.style_img, categories.cat_id, categories.cat_name
//     FROM categories JOIN styles
//     ON styles.cat_id = categories.cat_id
//     AND styles.style_name != ''
//     ORDER BY style_name ASC`,
//     (err, results) => {
//       const styles = results.map(style => ({
//         ...style,
//         selected: false
//       }))
//       return err ?
//         res.send(err) :
//         res.json({
//           data: styles
//         });
//     });
// })
//
// router.get('/temposBI/', (req, res) => {
//   catalogDB.query(`SELECT tempo_id, tempo_name FROM tempos WHERE tempo_name != ''`, (err, results) => {
//     const tempos = results.map(tempo => ({
//       ...tempo,
//       selected: false
//     }))
//     return err ?
//       res.send(err) :
//       res.json({
//         data: tempos
//       });
//   })
// })
//
// router.get('/releasesBI/', (req, res) => {
//   catalogDB.query(`SELECT rel_id, rel_num, rel_num_only FROM releases ORDER BY rel_id DESC`, (err, results) => {
//     return err ?
//       res.send(err) :
//       res.json({
//         data: results
//       });
//   });
// })
//
// router.get('/master-id/', (req, res) => {
//   catalogDB.query(`SELECT master_cue_id, cue_id, cue_title FROM master_cues_id`,
//     (err, masterKeywords) => {
//       return err ?
//         res.send(err) :
//         res.json({
//           data: masterKeywords
//         })
//     })
// })
//
// module.exports = router;
