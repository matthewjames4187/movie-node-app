const express = require("express");
const { Pool, Client } = require("pg");
const app = express();
const databaseType = "defaultType";
const databaseUser = "defaultUser";
const databasePassword = "defaultPassword";
const databaseHost = "localhost";
const databasePort = 5432;
const databaseName = "defaultName"
const backendPort = 3001;

const pool = new Pool({
  connectionString: `${databaseType}://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`
});

app.get("/data", function (req, res) {
  pool.query("SELECT movie, hero from movie_hero", [], (err, result) => {
    if (err) {
      return res.status(405).jsonp({
        error: err,
      });
    }

    return res.status(200).jsonp({
      data: result.rows,
    });
  });
});

app.listen(backendPort, () =>
  console.log(`Backend rest api listening on port ${backendPort}!`)
);
