const mongoose = require('mongoose')
const mongoDB = 'mongodb://127.0.0.1/my_database'
// require('dotenv').config()

mongoose
  .connect(mongoDB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: true
  })
  .then(() => {
    console.log('Successfully connected to MongoDB.')
  })
  .catch((e) => {
    console.error('Connection error', e.message)
  })
mongoose.set('debug', true)
const db = mongoose.connection

module.exports = db
