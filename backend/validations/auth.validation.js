const { Joi } = require('express-validation');
const { ROLE } = require('../config/constants');

module.exports = {
  register: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .min(6)
        .max(128),
      role: Joi.string().required().valid(...ROLE),
    }),
  },
  login: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .required()
        .max(128),
    }),
  },
};
