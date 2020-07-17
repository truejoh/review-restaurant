const _ = require('lodash');
const Restaurant = require('../models/restaurant');
const { PERMISSIONS } = require('../config/constants');

exports.createRestaurant = async (req, res) => {
  const { user } = req;
  const { name } = req.body;
  const newRestaurant = _.pickBy(
    { name, owner: user._id, reviews: [] },
    _.identify,
  );

  try {
    const restaurant = await new Restaurant(newRestaurant);
    const result = await restaurant.save();

    if (result) {
      const populateRestaurant = await Restaurant.findOne({ _id: result._id })
        .populate('owner', { _id: true, email: true })
        .exec();
      res.json({ success: true, restaurant: populateRestaurant });
    } else {
      res.status(500).json({ success: false, msg: 'Create Restaurant Failed' });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      msg: 'Create Restaurant Failed',
    });
  }
};

exports.getRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurant_id;

  try {
    const restaurant = await Restaurant.findOne({ _id: restaurantId })
      .populate('owner', { _id: true, email: true })
      .populate([
        {
          path: 'reviews',
          model: 'Review',
          populate: { path: 'from', model: 'User', select: '_id email role' },
        },
      ])
      .exec();

    if (restaurant) {
      res.json({
        success: true,
        restaurant,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: 'Get Restaurant Failed.',
      });
    }
  } catch (error) {
    res.status(400).send({
      success: false,
      msg: 'Get Restaurant Failed.',
    });
  }
};

exports.updateRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurant_id;
  const { name } = req.body;
  const updateData = _.pickBy({ name }, _.identity);

  try {
    const result = await Restaurant.update({ _id: restaurantId }, updateData);

    if (result) {
      res.json({ success: true, msg: 'Success' });
    } else {
      res
        .status(500)
        .json({ success: false, msg: 'Update Restaurant Failed.' });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: 'Update Restaurant Failed.' });
  }
};

exports.deleteRestaurant = async (req, res) => {
  const restaurantId = req.params.restaurant_id;

  try {
    const result = await Restaurant.deleteOne({ _id: restaurantId });

    if (result) {
      res.json({ success: true, msg: 'Success' });
    } else {
      res
        .status(500)
        .json({ success: false, msg: 'Delete Restaurant Failed.' });
    }
  } catch (error) {
    res.status(400).json({ success: false, msg: 'Delete Restaurant Failed.' });
  }
};

exports.getAllRestaurants = async (req, res) => {
  const { user } = req;
  let filterQuery = {};

  if (user.role === PERMISSIONS.OWNER) {
    filterQuery = { owner: user._id };
  }

  try {
    const restaurants = await Restaurant.find(filterQuery)
      .populate('owner', { _id: true, email: true })
      .populate([
        {
          path: 'reviews',
          model: 'Review',
          populate: { path: 'from', model: 'User', select: '_id email role' },
        },
      ])
      .exec();

    if (restaurants) {
      res.json({
        success: true,
        restaurants,
      });
    } else {
      res.status(500).json({
        success: false,
        msg: 'failed',
      });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      msg: `Failed - ${err}`,
    });
  }
};
