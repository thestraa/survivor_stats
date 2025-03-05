const mysql = require("mysql2");

const config = {
  host: "survivor_mysql",
  user: "root",
  password: "root",
  database: "survivor_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

function connectWithRetry(retries = 5, delay = 5000) {
  const pool = mysql.createPool(config);

  pool.getConnection((err, connection) => {
    if (err) {
      console.error("Greška pri povezivanju sa bazom:", err);
      if (retries > 0) {
        console.log(`Pokušavam ponovo (${retries} preostalih)...`);
        setTimeout(() => connectWithRetry(retries - 1, delay), delay);
      } else {
        console.error("Nije moguće povezati se sa bazom.");
      }
    } else {
      console.log("Uspešno povezan sa MySQL bazom!");
      connection.release();
    }
  });

  return pool;
}

const db = connectWithRetry();
module.exports = db;
