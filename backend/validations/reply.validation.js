const { Joi } = require('express-validation');

module.exports = {
  create: {
    body: Joi.object({
      reply: Joi.string().required(),
      restaurantId: Joi.string().required(),
    }),
  },
  update: {
    body: Joi.object({
      reply: Joi.string().required(),
      restaurantId: Joi.string().required(),
    }),
  },
  delete: {
    body: Joi.object({
      restaurantId: Joi.string().required(),
    }),
  },
};
