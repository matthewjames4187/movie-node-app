const express = require("express");
const { Pool, Client } = require("pg");
const app = express();
const databaseType = process.env.databaseType || "defaultType";
const databaseUser = process.env.databaseUser || "defaultUser";
const databasePassword = process.env.databasePassword || "defaultPassword";
const databaseHost = process.env.databaseHost || "localhost";
const databasePort = process.env.databasePort || 5432;
const databaseName = process.env.databaseName || "defaultName";
const backendPort = process.env.backendPort || 3001;

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
