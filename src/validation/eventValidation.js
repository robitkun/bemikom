import Joi from 'joi';

const createEventValidation = Joi.object({
  title: Joi.string().max(255).required(),
  description: Joi.string().optional(),
  event_date: Joi.date().required(),
  location: Joi.string().optional().max(255),
  image_url: Joi.string().optional(),
});

export { createEventValidation };
