const express = require('express');
const Budget = require('../models/Budget');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.use(auth);

router.post('/', async (req, res) => {
  const { salary, estimatedBudget } = req.body;
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const budget = await Budget.findOneAndUpdate(
    { userId: req.userId, month, year },
    { salary, estimatedBudget },
    { new: true, upsert: true }
  );
  res.json(budget);
});

router.get('/', async (req, res) => {
  const now = new Date();
  const budget = await Budget.findOne({
    userId: req.userId,
    month: now.getMonth(),
    year: now.getFullYear()
  });
  res.json(budget || {});
});

module.exports = router;
