const Income = require('../models/Income')

const createIncome = async (req, res) => {
  try {
    const incomeItem = await new Income(req.body)
    await incomeItem.save()
    return res.status(201).json({
      incomeItem
    })
  } catch (error) {
    res.json(error)
  }
}

const getAllIncome = async (req, res) => {
  try {
    const incomes = await Income.find()
    return res.status(200).json({ incomes })
  } catch (error) {
    res.json(error)
  }
}

const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params
    const income = await Income.findById(id)
  } catch (error) {
    res.json(error)
  }
}

module.exports = { createIncome, getAllIncome, getIncomeById }
