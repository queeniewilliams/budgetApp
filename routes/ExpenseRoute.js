const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')
const ExpenseController = require('../controllers/ExpenseController')

Router.get('/:id', ExpenseController.getExpenseById)
Router.get('/', ExpenseController.getAllExpenses)
Router.post('/add', ExpenseController.createExpense)
Router.delete('/remove/:id', ExpenseController.deleteExpense)
Router.put('/update/:id', ExpenseController.updateExpense)

module.exports = Router
