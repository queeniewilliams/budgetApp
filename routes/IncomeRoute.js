const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')

Router.get('/:income_id', IncomeController.getIncomeById)
Router.get('/', IncomeController.getAllIncome)
Router.post('/add', IncomeController.createIncome)

module.exports = Router
