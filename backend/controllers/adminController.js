const User = require('../models/User');
const Bill = require('../models/Bill');
const Payment = require('../models/Payment');

exports.getDashboardStats = async (req, res) => {
  try {
    const totalReceived = await Payment.aggregate([{ $group: { _id: null, total: { $sum: "$amount" } } }]);
    const pendingBills = await Bill.aggregate([{ $match: { status: 'Unpaid' } }, { $group: { _id: null, total: { $sum: "$amount" } } }]);
    const totalResidents = await User.countDocuments({ role: 'resident' });
    const recentPayments = await Payment.find().populate('residentId', 'name flatNumber').sort({ createdAt: -1 }).limit(5);

    res.json({
      totalReceived: totalReceived[0]?.total || 0,
      pendingAmount: pendingBills[0]?.total || 0,
      totalResidents,
      recentPayments
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllResidents = async (req, res) => {
  try {
    const residents = await User.find({ role: 'resident' }).select('-password');
    res.json(residents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBill = async (req, res) => {
  const { residentId, amount, dueDate, month, year, description } = req.body;
  try {
    const bill = await Bill.create({ residentId, amount, dueDate, month, year, description });
    res.status(201).json(bill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('residentId', 'name flatNumber').sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



