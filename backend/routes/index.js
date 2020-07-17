const express = require('express');
const authRouter = require('./auth');
const userRouter = require('./user');
const reviewRouter = require('./review');
const restaurantRouter = require('./restaurant');
const { requireAuth } = require('../middlewares/auth');

require('../config/passport');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ success: true, message: 'restaurant review rest api' });
});

router.use('/auth', authRouter);
router.use('/users', requireAuth, userRouter);
router.use('/reviews', requireAuth, reviewRouter);
router.use('/restaurants', requireAuth, restaurantRouter);

module.exports = router;
