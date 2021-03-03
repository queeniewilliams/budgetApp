const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')
const ExpenseController = require('../controllers/ExpenseController')

Router.get('/:expense_id', ExpenseController.getExpenseById)
Router.get('/', ExpenseController.getAllExpenses)
Router.post('/add', ExpenseController.createExpense)
Router.delete('/remove/:expense_id', ExpenseController.deleteExpense)

module.exports = Router
