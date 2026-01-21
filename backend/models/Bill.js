const mongoose = require('mongoose');

const billSchema = mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  month: { type: String, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['Unpaid', 'Paid'], default: 'Unpaid' },
  description: { type: String, default: 'Monthly Maintenance' }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
