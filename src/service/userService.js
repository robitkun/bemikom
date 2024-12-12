import validate from '../validation/validation.js';
import {
  registerValidation,
  loginValidation,
} from '../validation/userValidation.js';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ResponseError from '../error/responseError.js';
const prismaClient = new PrismaClient();
import dotenv from 'dotenv';
dotenv.config();
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
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
  return { result, token };
};

const login = async (req) => {
  const loginReq = validate(loginValidation, req);
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginReq.email,
    },
    select: {
      email: true,
      username: true,
    },
  });
  if (!user) {
    throw new ResponseError(400, 'Email or Password is incorrect');
  }
  const validPassword = bcrypt.compare(loginReq.password, user.password);
  if (!validPassword) {
    throw new ResponseError(400, 'Email or password is incorrect');
  }
  const token = jwt.sign(
    { userId: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};
export default { register, login };
