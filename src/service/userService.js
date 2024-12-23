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
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
  const token = jwt.sign(
    {
      userId: result.id,
      username: result.username,
      role: result.role,
      email: result.email,
      created_at: result.created_at,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
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
      id: true,
      email: true,
      username: true,
      password: true,
      role: true,
      created_at: true,
    },
  });
  if (!user) {
    throw new ResponseError(400, 'Email or Password is incorrect');
  }
  const validPassword = await bcrypt.compare(loginReq.password, user.password);
  if (!validPassword) {
    throw new ResponseError(400, 'Email or password is incorrect');
  }
  const token = jwt.sign(
    {
      userId: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
      created_at: user.created_at,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  return { user, token };
};
const getAllUsers = async () => {
  const result = await prismaClient.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      role: true,
      created_at: true,
    },
  });
  if (result.length === 0) {
    throw new ResponseError(404, 'Users Not Found');
  }
  return result;
};

export default { register, login, getAllUsers };
