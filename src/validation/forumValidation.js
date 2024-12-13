import Joi from 'joi';

const createForumValidation = Joi.object({
  title: Joi.string().max(255).required(),
  content: Joi.string().required(),
  author_id: Joi.string().required(),
});

const updateForumValidation = Joi.object({
  title: Joi.string().max(255).optional().messages({
    'string.base': 'Title harus berupa string.',
    'string.empty': 'Title tidak boleh kosong.',
    'string.max': 'Title tidak boleh lebih dari 255 karakter.',
  }),

  content: Joi.string().optional().messages({
    'string.base': 'Content harus berupa string.',
    'string.empty': 'Content tidak boleh kosong.',
  }),
});
export { createForumValidation, updateForumValidation };
