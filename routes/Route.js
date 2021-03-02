const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')
const ExpenseController = require('../controllers/ExpenseController')

Router.get('/income/:id', IncomeController.getIncomeById)
Router.get('/income', IncomeController.getAllIncome)
Router.post('/income/add', IncomeController.createIncome)

Router.get('/expenses/:id', ExpenseController.getExpenseById)
Router.get('/expenses', ExpenseController.getAllExpenses)
Router.post('/expenses/add', ExpenseController.createExpense)

module.exports = Router
