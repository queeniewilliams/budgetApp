const express = require('express')
const db = require('./db/connection')

const route = require('./routes/Route')
const IncomeRoute = require('./routes/IncomeRoute')

const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
// const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.use('/expenses', route)
app.use('/income', IncomeRoute)

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
