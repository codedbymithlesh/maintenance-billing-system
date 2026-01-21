const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { getDashboardStats, getAllResidents, createBill, getAllBills } = require('../controllers/adminController');


router.get('/stats', protect, admin, getDashboardStats);
router.get('/residents', protect, admin, getAllResidents);
router.post('/bills', protect, admin, createBill);
router.get('/bills', protect, admin, getAllBills);

module.exports = router;
