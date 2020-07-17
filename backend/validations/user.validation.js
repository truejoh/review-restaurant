const { Joi } = require('express-validation');
const { ROLE } = require('../config/constants');

module.exports = {
  update: {
    body: Joi.object({
      email: Joi.string()
        .email()
        .required(),
      role: Joi.string().valid(...ROLE),
    }),
  },
};
