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
    const { id } = req.params
    const deleted = await Expense.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Expense deleted')
    }
    throw new Error('Expense not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params
    await Expense.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, expense) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!expense) {
          res.status(500).send('Expense not found!')
        }
        return res.status(200).json(expense)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createExpense,
  getAllExpenses,
  getExpenseById,
  deleteExpense,
  updateExpense
}
