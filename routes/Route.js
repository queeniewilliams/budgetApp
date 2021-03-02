const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')
const ExpenseController = require('../controllers/ExpenseController')

Router.get('/income/:income_id', IncomeController.getIncomeById)
Router.get('/income', IncomeController.getAllIncome)
Router.post('/income/add', IncomeController.createIncome)

Router.get('/expenses/:income_id', ExpenseController.getExpenseById)
Router.get('/expenses', ExpenseController.getAllExpenses)
Router.post('/expenses/add', ExpenseController.createExpense)
Router.delete('/expenses/remove/:expense_id', ExpenseController.deleteExpense)

module.exports = Router
