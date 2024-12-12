import validate from '../validation/validation.js';
import { registerValidation } from '../validation/userValidation.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import ResponseError from '../error/responseError.js';
const prismaClient = new PrismaClient();

const register = async (req) => {
  const user = validate(registerValidation, req);
  const countUsername = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });
  const countEmail = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });
  if (countUsername > 0) {
    throw new ResponseError(400, 'Username Already Exist');
  }
  if (countEmail > 0) {
    throw new ResponseError(400, 'Email Already Exist');
  }
  user.password = await bcrypt.hash(user.password, 10);
  const result = await prismaClient.user.create({
    data: user,
    select: {
      username: true,
      email: true,
    },
  });
  return result;
};

export default { register };
