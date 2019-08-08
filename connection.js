const mysql =  require("mysql");
const env = require("dotenv").config();
let indieDB;

if(process.env.JAWSDB_URL){
  indieDB = mysql.createPool(process.env.JAWSDB_URL);
} else {
  indieDB = mysql.createPool({
    host     : env.DB_HOST,
    port     : 8889,
    user     : env.DB_USER,
    password : env.DB_PASS,
    database : "dlmusic_artist"
  });
}

module.exports = indieDB;
