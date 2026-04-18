const Joi = require('joi');

const needSchemas = {
  create: Joi.object({
    userId: Joi.string().uuid().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    urgency: Joi.string().valid('critical', 'high', 'medium', 'low').required(),
  }),

  update: Joi.object({
    status: Joi.string().valid('pending', 'in-progress', 'resolved'),
    volunteerId: Joi.string().uuid().allow(null),
    category: Joi.string(),
    description: Joi.string(),
    urgency: Joi.string().valid('critical', 'high', 'medium', 'low'),
  }),
};

module.exports = needSchemas;
