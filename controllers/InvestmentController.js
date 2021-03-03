const Investment = require('../models/Investment')

const createInvestment = async (req, res) => {
  try {
    const investmentItem = await new Investment(req.body)
    await investmentItem.save()
    return res.status(201).json({
      investmentItem
    })
  } catch (error) {
    res.json(error)
  }
}

const getAllInvestment = async (req, res) => {
  try {
    const investments = await Investment.find()
    return res.status(200).json({ investments })
  } catch (error) {
    res.json(error)
  }
}

const getInvestmentById = async (req, res) => {
  try {
    const { id } = req.params
    const investment = await Investment.findById(id)
  } catch (error) {
    res.json(error)
  }
}

module.exports = { createInvestment, getAllInvestment, getInvestmentById }
