const mysql =  require('mysql');

let indieDB;

if(process.env.JAWSDB_URL){
  indieDB = mysql.createPool(process.env.JAWSDB_URL)
} else {
    indieDB = mysql.createPool({
      host     : 'localhost',
      port     : 8889,
      user     : 'root',
      password : 'root',
      database : 'dlmusic_artist'
    })
}

module.exports = indieDB;
