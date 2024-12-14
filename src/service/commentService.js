import { PrismaClient } from '@prisma/client';
import { createCommentValidation } from '../validation/commentValidation.js';
import validate from '../validation/validation.js';
import ResponseError from '../error/responseError.js';
const prisma = new PrismaClient();

const createComment = async (req) => {
  console.log(req);
  const comment = validate(createCommentValidation, req);
  const { parent_id } = comment;
  if (parent_id) {
    const parentComment = await prisma.comment.findUnique({
      where: {
        id: parent_id,
      },
    });
    if (!parentComment) {
      throw new ResponseError(404, 'Komentar yang dibalas tidak ditemukan');
    }
  }

  const result = await prisma.comment.create({
    data: {
      forum_id: comment.forum_id,
      content: comment.content,
      author_id: comment.author_id,
      parent_id: comment.parent_id || null,
    },
  });
  return {
    message: 'succ es',
    data: result,
  };
};

const getAllComment = async (forum_id) => {
  const comments = await prisma.comment.findMany({
    where: { forum_id },
    include: {
      replies: true,
      parent_comment: true,
    },
  });
  if (!comments) {
    throw new ResponseError(404, 'Komentar tidak ada');
  }
  return {
    message: 'success',
    data: comments,
  };
};

export default { createComment, getAllComment };
