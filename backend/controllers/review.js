const _ = require('lodash');
const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
const { PERMISSIONS } = require('../config/constants');

exports.createReview = async (req, res) => {
  const { user } = req;
  const { rating, comment, to } = req.body;

  const newReview = {
    rating,
    comment,
    reply: '',
    from: user._id,
    to,
  };

  try {
    const isExist = await Review.findOne({ from: user._id, to });
    if (isExist) {
      return res
        .status(400)
        .send({ success: false, msg: 'Review already exists!' });
    }

    const review = await new Review(newReview);
    const result = await review.save();

    if (result) {
      const restaurantId = to;
      const reviewId = review._id;

      await Restaurant.findOneAndUpdate(
        { _id: restaurantId },
        {
          $addToSet: { reviews: reviewId },
        },
      );
      const populatedReview = await Review.findOne({ _id: reviewId })
        .populate('from', { _id: true, email: true })
        .populate('to', { _id: true, name: true })
        .exec();

      return res.status(200).json({ success: true, review: populatedReview });
    }
    res.status(500).json({ success: false, msg: 'Create Review Failed.' });
  } catch (err) {
    res
      .status(400)
      .send({ success: false, msg: `Create Review Failed - ${err}` });
  }
};

exports.getReview = async (req, res) => {
  const reviewId = req.params.review_id;

  try {
    const review = await Review.findOne({ _id: reviewId })
      .populate('from', { _id: true, email: true })
      .populate('to', { _id: true, name: true })
      .exec();

    if (review) {
      res.status(200).json({ success: true, review });
    } else {
      res.status(500).json({ success: false, msg: 'Get Review Failed.' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Get Review Failed' });
  }
};

exports.updateReview = async (req, res) => {
  const reviewId = req.params.review_id;
  const { rating, comment } = req.body;

  try {
    const result = await Review.update({ _id: reviewId }, { rating, comment });

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Update Review Failed.' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Update Review Failed.' });
  }
};

exports.deleteReview = async (req, res) => {
  const reviewId = req.params.review_id;

  try {
    const review = await Review.findOne({ _id: reviewId });
    const result = await Review.deleteOne({ _id: reviewId });
    const restaurantId = review.to;

    if (result) {
      await Restaurant.findOneAndUpdate(
        { _id: restaurantId },
        {
          $pull: { reviews: reviewId },
        },
      );

      return res.status(200).json({ success: true, msg: 'Success' });
    }
    res.status(500).json({ success: false, msg: 'Delete Review Failed.' });
  } catch (error) {
    res.status(400).json({ success: false, msg: 'Delete Review Failed.' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('from', { _id: true, email: true })
      .populate('to', { _id: true, name: true })
      .exec();

    if (reviews) {
      res.status(200).json({ success: true, reviews });
    } else {
      res.status(500).json({ success: false, msg: 'Get Review Failed.' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Get Review Failed.' });
  }
};

exports.addReply = async (req, res) => {
  const { user } = req;
  const reviewId = req.params.review_id;
  const { reply, restaurantId } = req.body;
  const updateData = { reply };

  try {
    const isExist = await Review.findOne({ _id: reviewId });
    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, msg: 'Review does not exist' });
    }

    if (user.role !== PERMISSIONS.ADMIN) {
      const restaurant = await Restaurant.findOne({ _id: restaurantId });
      if (!restaurant) {
        return res
          .status(400)
          .send({ success: false, msg: 'Restanrant does not exist' });
      }

      if (!user._id.equals(restaurant.owner)) {
        return res
          .status(400)
          .send({ success: false, msg: 'Now allowed to reply' });
      }
    }

    const result = await Review.update({ _id: reviewId }, updateData);

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Create Reply Failed.' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Create Reply Failed.' });
  }
};

exports.editReply = async (req, res) => {
  const { user } = req;
  const reviewId = req.params.review_id;
  const { reply, restaurantId } = req.body;
  const updateData = { reply };

  try {
    const isExist = await Review.findOne({ _id: reviewId });
    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, msg: 'Review does not exist' });
    }

    if (user.role !== PERMISSIONS.ADMIN) {
      const restaurant = await Restaurant.findOne({ _id: restaurantId });
      if (!restaurant) {
        return res
          .status(400)
          .send({ success: false, msg: 'Restanrant does not exist' });
      }

      if (!user._id.equals(restaurant.owner)) {
        return res
          .status(400)
          .send({ success: false, msg: 'Not allowed to reply' });
      }
    }

    const result = await Review.update({ _id: reviewId }, updateData);

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Update Reply Failed' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Update Reply Failed.' });
  }
};

exports.DeleteReply = async (req, res) => {
  const { user } = req;
  const reviewId = req.params.review_id;
  const { restaurantId } = req.body;

  try {
    const isExist = await Review.findOne({ _id: reviewId });
    if (!isExist) {
      return res
        .status(400)
        .send({ success: false, msg: 'Review does not exist' });
    }

    if (user.role !== PERMISSIONS.ADMIN) {
      const restaurant = await Restaurant.findOne({ _id: restaurantId });
      if (!restaurant) {
        return res
          .status(400)
          .send({ success: false, msg: 'Restanrant does not exist' });
      }

      if (!user._id.equals(restaurant.owner)) {
        return res
          .status(400)
          .send({ success: false, msg: 'Not allowed to reply' });
      }
    }

    const result = await Review.update({ _id: reviewId }, { reply: '' });

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Delete Reply Failed.' });
    }
  } catch (error) {
    res.status(400).send({ success: false, msg: 'Delete Reply Failed.' });
  }
};
