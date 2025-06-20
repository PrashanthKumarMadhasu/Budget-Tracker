const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  salary: Number,
  estimatedBudget: Number,
  month: Number,
  year: Number
});

module.exports = mongoose.model('Budget', budgetSchema);
