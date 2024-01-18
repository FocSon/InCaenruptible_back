import Alert from '@models/alert.model';
import Post from '@models/post.model';
import { Op } from 'sequelize';

const alertsDone = async (n: number, startId: number | undefined) => {
  return await Alert.findAll({
    where: {
      id: startId && {
        [Op.lt]: startId,
      },
    },
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
  });
};


const posts = async (n: number, startId: number | undefined) => {
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
  alertsDone,
  post,
  posts,
};
