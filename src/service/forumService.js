import { PrismaClient } from '@prisma/client';
import validate from '../validation/validation.js';
import ResponseError from '../error/responseError.js';
import {
  createForumValidation,
  updateForumValidation,
} from '../validation/forumValidation.js';

const prisma = new PrismaClient();

const createForum = async (req) => {
  const forum = validate(createForumValidation, req);
  const result = await prisma.forum.create({
    data: {
      title: forum.title,
      content: forum.content,
      author_id: forum.author_id,
    },
  });
  return {
    message: 'success',
    data: result,
  };
};
const getAllForum = async () => {
  const forums = await prisma.forum.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author_id: true,
    },
  });
  return {
    message: 'success',
    data: forums,
  };
};
const getForumById = async (id) => {
  const forum = await prisma.forum.findUnique({
    where: {
      id,
    },
  });
  if (!forum) {
    throw new ResponseError(404, ' Forum Tidak Ada!');
  }
  return {
    message: 'succes',
    data: forum,
  };
};
const deleteForum = async (id) => {
  const forum = await prisma.forum.findUnique({
    where: {
      id,
    },
  });
  if (!forum) {
    throw new ResponseError(404, 'Forum tidak ada!');
  }
  await prisma.forum.delete({
    where: {
      id,
    },
  });

  return {
    message: 'Berhasi dihapus',
    data: forum,
  };
};
const updateForum = async (req, id) => {
  const forum = await prisma.forum.findUnique({
    where: { id },
  });
  if (!forum) {
    throw new ResponseError(404, 'Forum tidak ada!');
  }
  const updatedData = validate(updateForumValidation, req);
  const newForum = await prisma.forum.update({
    where: {
      id,
    },
    data: updatedData,
  });
  return { message: 'berhasil memperbarui forum', data: newForum };
};
export default {
  createForum,
  getAllForum,
  getForumById,
  deleteForum,
  updateForum,
};
