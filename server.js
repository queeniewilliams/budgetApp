const express = require('express')
const db = require('./db/connection')

const ExpenseRoute = require('./routes/ExpenseRoute')
const IncomeRoute = require('./routes/IncomeRoute')
const InvestmentRoute = require('./routes/InvestmentRoute')

const bodyParser = require('body-parser')
const logger = require('morgan')
const cors = require('cors')
const path = require('path')

const PORT = process.env.PORT || 3001

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(cors())

app.use('/expenses', ExpenseRoute)
app.use('/income', IncomeRoute)
app.use('/investments', InvestmentRoute)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/client/build/index.html`))
  })
}

db.on('error', console.error.bind(console, 'MongoDB connection error: '))

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
