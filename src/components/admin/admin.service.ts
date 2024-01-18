import Alert from '@models/alert.model';
import Post from '@models/post.model';
import { Op } from 'sequelize';
import * as Alerts from '@alerts' 

const acceptAlert = async (n: number, startId: number | undefined) => {
  return await Post.findAll({
    where: {
      id: startId && {
        [Op.lte]: startId,
      },
    },
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};


const endAlert = async (n: number, startId: number | undefined) => {
  return await Post.findAll({
    where: {
      id: startId && {
        [Op.lte]: startId,
      },
    },
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};


const updateAlert = async (n: number, startId: number | undefined) => {
  return await Post.findAll({
    where: {
      id: startId && {
        [Op.lte]: startId,
      },
    },
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};


const createPost = async (n: number, startId: number | undefined) => {
  return await Post.findAll({
    where: {
      id: startId && {
        [Op.lte]: startId,
      },
    },
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};


const deletePost = async (n: number, startId: number | undefined) => {
  return await Post.findAll({
    where: {
      id: startId && {
        [Op.lte]: startId,
      },
    },
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};
  
  
export default {
  refuseAlert,
  acceptAlert,
  endAlert,
  updateAlert,
  createPost,
  deletePost,
};