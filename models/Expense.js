const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Expense = new Schema(
  {
    amount: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('expenses', Expense)
