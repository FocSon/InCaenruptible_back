import Alert from '@models/alert.model';
import Post from '@models/post.model';
import { Op } from 'sequelize';

const alertsDone = async (n: number, startId: number | undefined) => {
  if (startId) {
    return await Alert.findAll({
      where: {
        id: {
          [Op.lt]: startId,
        },
      },
      order: [
        ['id', 'DESC'],
      ],
      limit: n,
    });
  }

  return await Alert.findAll({
    order: [
      ['id', 'DESC'],
    ],
    limit: n,
  });
};

const post = async (id: number) => {
  return await Post.findOne({
    where: {
      id: id,
    },
  } as any);
};


const posts = async (n: number, startId: number | undefined) => {
  if (startId) {
    return await Post.findAll({
      where: {
        id: {
          [Op.lt]: startId,
        },
      },
      order: [
        ['id', 'DESC'],
      ],
      attributes: { exclude: ['content'] },
      limit: n,
    });
  }

  return await Post.findAll({
    order: [
      ['id', 'DESC'],
    ],
    attributes: { exclude: ['content'] },
    limit: n,
  });
};


export default {
  alertsDone,
  post,
  posts,
};
