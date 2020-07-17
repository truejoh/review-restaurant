const express = require('express');
const { validate } = require('express-validation');

const userController = require('../controllers/user');
const permissionLayer = require('../middlewares/permission');
const { PERMISSIONS } = require('../config/constants');
const { update } = require('../validations/user.validation');

const router = express.Router();

router.get(
  '/',
  permissionLayer([PERMISSIONS.ADMIN]),
  userController.getAllUsers,
);

router.get(
  '/:user_id',
  permissionLayer([PERMISSIONS.ADMIN]),
  userController.getUser,
);

router.delete(
  '/:user_id',
  permissionLayer([PERMISSIONS.ADMIN]),
  userController.deleteUser,
);

router.put(
  '/:user_id',
  [permissionLayer([PERMISSIONS.ADMIN]), validate(update)],
  userController.updateUser,
);

module.exports = router;
