const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  billId: { type: mongoose.Schema.Types.ObjectId, ref: 'Bill', required: true },
  amount: { type: Number, required: true },
  paymentDate: { type: Date, default: Date.now },
  transactionId: { type: String, required: true },
  paymentMethod: { type: String, default: 'Online' }
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
