const Expense = require('../models/Expense')

const createExpense = async (req, res) => {
  try {
    const expenseItem = await new Expense(req.body)
    await expenseItem.save()
    return res.status(201).json({
      expenseItem
    })
  } catch (error) {
    res.json(error)
  }
}

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find()
    return res.status(200).json({ expenses })
  } catch (error) {
    res.json(error)
  }
}

const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params
    const expense = await Expense.findById(id)
  } catch (error) {
    res.json(error)
  }
}

const deleteExpense = async (req, res) => {
  try {
    await Expense.deleteOne({ _id: req.params.expenses_id })
    res.send({
      msg: 'Expense Deleted',
      payload: req.params.expenses_id,
      status: 'Ok'
    })
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  deleteExpense
}
