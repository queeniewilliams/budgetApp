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
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Income.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Income deleted')
    }
    throw new Error('Income not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params
    await Income.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, income) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!income) {
          res.status(500).send('Income not found!')
        }
        return res.status(200).json(income)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createIncome,
  getAllIncome,
  getIncomeById,
  deleteIncome,
  updateIncome
}
