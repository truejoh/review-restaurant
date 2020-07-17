const express = require('express');
const { validate } = require('express-validation');

const reviewsControllers = require('../controllers/review');
const { create, update } = require('../validations/review.validation');
const { create: createReply, update: updateReply, delete: deleteReply } = require('../validations/reply.validation');
const permissionLayer = require('../middlewares/permission');
const { PERMISSIONS } = require('../config/constants');

const router = express.Router();

router.get('/', reviewsControllers.getAllReviews);

router.post(
  '/',
  [permissionLayer([PERMISSIONS.REGULAR]), validate(create, { context: false, statusCode: 400, keyByField: true })],
  reviewsControllers.createReview,
);

router.get('/:review_id', reviewsControllers.getReview);

router.put(
  '/:review_id',
  [
    permissionLayer([PERMISSIONS.ADMIN, PERMISSIONS.REGULAR]),
    validate(update, { context: false, statusCode: 400, keyByField: true }),
  ],
  reviewsControllers.updateReview,
);

router.delete(
  '/:review_id',
  permissionLayer([PERMISSIONS.ADMIN, PERMISSIONS.REGULAR]),
  reviewsControllers.deleteReview,
);

router.post(
  '/:review_id/reply',
  [permissionLayer([PERMISSIONS.OWNER]), validate(createReply, { context: false, statusCode: 400, keyByField: true })],
  reviewsControllers.addReply,
);

router.put(
  '/:review_id/reply',
  [
    permissionLayer([PERMISSIONS.OWNER, PERMISSIONS.ADMIN]),
    validate(updateReply, { context: false, statusCode: 400, keyByField: true }),
  ],
  reviewsControllers.editReply,
);

router.delete(
  '/:review_id/reply',
  [
    permissionLayer([PERMISSIONS.OWNER, PERMISSIONS.ADMIN]),
    validate(deleteReply, { context: false, statusCode: 400, keyByField: true }),
  ],
  reviewsControllers.DeleteReply,
);

module.exports = router;
