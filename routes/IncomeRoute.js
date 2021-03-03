const Router = require('express').Router()
const IncomeController = require('../controllers/IncomeController')

Router.get('/:income_id', IncomeController.getIncomeById)
Router.get('/', IncomeController.getAllIncome)
Router.post('/add', IncomeController.createIncome)
Router.delete('/remove/:id', IncomeController.deleteIncome)
Router.put('/update/:id', IncomeController.updateIncome)

module.exports = Router
