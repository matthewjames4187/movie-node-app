const express = require("express")
const { Pool } = require("pg")
const app = express()

const databaseType = process.env.databaseType
const databaseUser = process.env.databaseUser
const databasePassword = process.env.databasePassword
const databaseHost = process.env.databaseHost
const databasePort = process.env.databasePort
const databaseName = process.env.databaseName
const backendPort = process.env.backendPort

const pool = new Pool({
	connectionString: `${databaseType}://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`,
})

app.get('/data', function (req, res) {
	pool.query('SELECT movie, hero from movie_hero', [], (err, result) => {
		if (err) {
			return res.status(405).jsonp({
				error: err,
			})
		}

		return res.status(200).jsonp({
			data: result.rows,
		})
	})
})

app.listen(backendPort, () => console.log(`Backend rest api listening on port ${backendPort}!`))