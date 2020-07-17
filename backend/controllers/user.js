const bcrypt = require('bcryptjs');
const _ = require('lodash');

const User = require('../models/user');

exports.getUser = (req, res) => {
  const userId = req.params.user_id;

  User.findOne({ _id: userId })
    .then((user) => {
      res.status(200).json({
        success: true,
        user: {
          email: user.email,
          role: user.role,
        },
      });
    })
    .catch(() => {
      res.status(404).send({ message: 'User not found.' });
    });
};

exports.updateUser = async (req, res) => {
  const userId = req.params.user_id;

  const { email, role } = req.body;

  try {
    const result = await User.update({ _id: userId }, { email, role });

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Update User Failed.' });
    }
  } catch (err) {
    res.status(400).send({ success: false, msg: 'Update User Failed.' });
  }
};

exports.deleteUser = async (req, res) => {
  const userId = req.params.user_id;

  try {
    const result = await User.deleteOne({ _id: userId });

    if (result) {
      res.status(200).json({ success: true, msg: 'Success' });
    } else {
      res.status(500).json({ success: false, msg: 'Delete User Failed.' });
    }
  } catch (err) {
    res.status(400).json({ success: false, msg: 'Delete User Failed.' });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });

    if (users) {
      res.status(200).json({ success: true, users });
    } else {
      res.status(500).json({ success: false, msg: 'Get Users Failed.' });
    }
  } catch (err) {
    res.status(400).send({
      success: false,
      msg: 'Get Users Failed.',
    });
  }
};
