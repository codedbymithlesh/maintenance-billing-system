const Bill = require('../models/Bill');
const Payment = require('../models/Payment');

exports.getMyBills = async (req, res) => {
  try {
    const bills = await Bill.find({ residentId: req.user._id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.payBill = async (req, res) => {
  const { billId } = req.body;
  try {
    const bill = await Bill.findById(billId);
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    if (bill.status === 'Paid') return res.status(400).json({ message: 'Bill already paid' });

    const payment = await Payment.create({
      residentId: req.user._id,
      billId: bill._id,
      amount: bill.amount,
      transactionId: 'TXN' + Math.floor(Math.random() * 1000000),
    });

    bill.status = 'Paid';
    await bill.save();

    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMyPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ residentId: req.user._id }).populate('billId').sort({ createdAt: -1 });
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
