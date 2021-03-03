const Router = require('express').Router()
const InvestmentController = require('../controllers/InvestmentController')

Router.get('/:investment_id', InvestmentController.getInvestmentById)
Router.get('/', InvestmentController.getAllInvestment)
Router.post('/add', InvestmentController.createInvestment)
Router.delete('/remove/:id', InvestmentController.deleteInvestment)
Router.put('/update/:id', InvestmentController.updateInvestment)

module.exports = Router
