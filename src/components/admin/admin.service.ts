import Alert from '@models/alert.model';
import Post from '@models/post.model';
import { Op } from 'sequelize';
import {createAlert, getAlert, removeAlert, endAlert,  }


const setMainAlert = async (n: number, startId: number | undefined) => {
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


const refuseAlert = async (n: number, startId: number | undefined) => {
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


const deleteAlert = async (n: number, startId: number | undefined) => {
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
  setMainAlert,
  refuseAlert,
  acceptAlert,
  deleteAlert,
  endAlert,
  updateAlert,
  createPost,
  deletePost,
};