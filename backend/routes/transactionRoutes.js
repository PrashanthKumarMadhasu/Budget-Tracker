const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(auth);

// GET - all transactions
router.get('/', async (req, res) => {
  const { category, amount, date, page = 1 } = req.query;
  const filter = { userId: req.userId };
  if (category) filter.category = category;
  if (amount) filter.amount = { $gte: Number(amount) };
  if (date) filter.date = { $gte: new Date(date) };

  const limit = 7;
  const skip = (page - 1) * limit;

  const total = await Transaction.countDocuments(filter);
  const transactions = await Transaction.find(filter).sort({ date: -1 }).skip(skip).limit(limit);

  res.json({ transactions, total });
});

// POST - create transaction
router.post('/', async (req, res) => {
  const { name, amount, category } = req.body;
  const newTx = new Transaction({ userId: req.userId, name, amount, category });
  await newTx.save();
  res.json(newTx);
});

// PUT - update transaction
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, amount, category } = req.body;
  const updated = await Transaction.findOneAndUpdate(
    { _id: id, userId: req.userId },
    { name, amount, category },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Transaction not found' });
  res.json(updated);
});

// DELETE - delete transaction
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Transaction.findOneAndDelete({ _id: id, userId: req.userId });
  if (!deleted) return res.status(404).json({ message: 'Transaction not found' });
  res.json({ message: 'Transaction deleted' });
});

module.exports = router;

module.exports = router;
