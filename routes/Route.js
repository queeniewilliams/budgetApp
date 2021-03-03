const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')
const ExpenseController = require('../controllers/ExpenseController')

Router.get('/income/:income_id', IncomeController.getIncomeById)
Router.get('/income', IncomeController.getAllIncome)
Router.post('/income/add', IncomeController.createIncome)

Router.get('/:expense_id', ExpenseController.getExpenseById)
Router.get('/', ExpenseController.getAllExpenses)
Router.post('/add', ExpenseController.createExpense)
Router.delete('/remove/:expense_id', ExpenseController.deleteExpense)

module.exports = Router
