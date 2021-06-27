const express = require('express')
const bodyParser = require('bodyParser')
const app = express()
const port = 3000
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
	})
)

const user_route = require('./route/user')
app.use('/api/user', user_route)

app.listen(port, () => console.log("Server up and running!"));