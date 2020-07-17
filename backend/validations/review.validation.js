const { Joi } = require('express-validation');

module.exports = {
  create: {
    body: Joi.object({
      rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
      to: Joi.string().required(),
      comment: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      rating: Joi.number()
        .integer()
        .min(1)
        .max(5)
        .required(),
      to: Joi.string().required(),
      comment: Joi.string().required(),
    }),
  },
};
