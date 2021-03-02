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

module.exports = { createExpense, getAllExpenses, getExpenseById }
