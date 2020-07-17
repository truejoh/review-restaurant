const express = require('express');
const { validate } = require('express-validation');

const restaurantsControllers = require('../controllers/restaurant');
const permissionLayer = require('../middlewares/permission');
const { create, update } = require('../validations/restaurant.validation');

const { PERMISSIONS } = require('../config/constants');

const router = express.Router();

router.get('/', restaurantsControllers.getAllRestaurants);
router.post(
  '/',
  [permissionLayer([PERMISSIONS.OWNER]), validate(create, { context: false, statusCode: 400, keyByField: true })],
  restaurantsControllers.createRestaurant,
);

router.get('/:restaurant_id', restaurantsControllers.getRestaurant);

router.put(
  '/:restaurant_id',
  [
    permissionLayer([PERMISSIONS.ADMIN, PERMISSIONS.OWNER]),
    validate(update, { context: false, statusCode: 400, keyByField: true }),
  ],
  restaurantsControllers.updateRestaurant,
);

router.delete(
  '/:restaurant_id',
  permissionLayer([PERMISSIONS.ADMIN, PERMISSIONS.OWNER]),
  restaurantsControllers.deleteRestaurant,
);

module.exports = router;
