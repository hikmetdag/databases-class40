import mysql from "mysql";

const conn = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});

conn.connect();

try {
  await getPopulation("country", "Turkey", "TUR", console.log);
} catch (error) {
  console.log(error);
}

conn.end();

async function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? and code = ?;`,
    [name, code],
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) {
        cb(new Error("Not found"));
      } else {
        cb(name, result);
      }
    }
  );
}