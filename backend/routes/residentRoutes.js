const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getMyBills, payBill, getMyPayments } = require('../controllers/residentController');

router.get('/bills', protect, getMyBills);
router.post('/pay', protect, payBill);
router.get('/payments', protect, getMyPayments);

module.exports = router;
