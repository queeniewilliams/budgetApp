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

const deleteInvestment = async (req, res) => {
  try {
    const { id } = req.params
    const deleted = await Investment.findByIdAndDelete(id)
    if (deleted) {
      return res.status(200).send('Investment deleted')
    }
    throw new Error('Investment not found')
  } catch (error) {
    return res.status(500).send(error.message)
  }
}
const updateInvestment = async (req, res) => {
  try {
    const { id } = req.params
    await Investment.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      (err, investment) => {
        if (err) {
          res.status(500).send(err)
        }
        if (!investment) {
          res.status(500).send('Investment not found!')
        }
        return res.status(200).json(investment)
      }
    )
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

module.exports = {
  createInvestment,
  getAllInvestment,
  getInvestmentById,
  deleteInvestment,
  updateInvestment
}
