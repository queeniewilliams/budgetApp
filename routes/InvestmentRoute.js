const Router = require('express').Router()
const InvestmentController = require('../controllers/InvestmentController')

Router.get('/:investment_id', InvestmentController.getInvestmentById)
Router.get('/', InvestmentController.getAllInvestment)
Router.post('/add', InvestmentController.createInvestment)

module.exports = Router
