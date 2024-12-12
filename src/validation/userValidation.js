import Joi from 'joi';
const registerValidation = Joi.object({
  username: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string()
    .valid('ADMIN', 'ANGGOTA', 'MAHASISWA')
    .default('MAHASISWA'),
});

export { registerValidation };
