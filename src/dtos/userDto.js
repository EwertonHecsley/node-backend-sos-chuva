const Joi = require('joi');

const userSchemas = {
  register: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().required(),
    type: Joi.string().valid('volunteer', 'need-help').required(),
    location: Joi.string().required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  update: Joi.object({
    name: Joi.string().min(3).max(100),
    email: Joi.string().email(),
    phone: Joi.string(),
    type: Joi.string().valid('volunteer', 'need-help'),
    location: Joi.string(),
  }),
};

module.exports = userSchemas;
