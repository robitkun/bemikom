import Joi from 'joi';

const createCommentValidation = Joi.object({
  content: Joi.string().required().min(1).max(1000).messages({
    'string.empty': 'Content tidak boleh kosong',
    'string.min': 'Content harus lebih dari 1 karakter',
    'string.max': 'Content tidak boleh lebih dari 1000 karakter',
  }),
  author_id: Joi.string().required().uuid().messages({
    'string.empty': 'Author ID tidak boleh kosong',
    'string.uuid': 'Author ID harus dalam format UUID',
  }),
  forum_id: Joi.string().required().uuid().messages({
    'string.empty': 'Forum ID tidak boleh kosong',
    'string.uuid': 'Forum ID harus dalam format UUID',
  }),
  parent_id: Joi.string().optional().uuid().allow(null).messages({
    'string.uuid': 'Parent ID harus dalam format UUID jika diisi',
  }),
});

export { createCommentValidation };
