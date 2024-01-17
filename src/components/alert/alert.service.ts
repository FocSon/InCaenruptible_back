import Alert from '@models/alert.model';
import Post from '@models/post.model';
import { Op, Sequelize } from "sequelize";

const alertsDone = async (n: number, startId: number | undefined) => {
  
  const listAlert = await Alert.findAll({ where: {
    id: startId && {
        [Op.lte]: startId  
    }},
    order: [
      ['id', 'DESC'] 
    ],
    limit: n
  });

  return listAlert;
};

const post = async (id: number) => {
  
  const post = await Post.findOne({ where: {
    id: id,
  }
  });

  return post;
};


const posts = async (n: number, startId: number | undefined) => {
  
  const listPosts = await Post.findAll({ where: {
    id: startId && {
        [Op.lte]: startId  
    }},
    order: [
      ['id', 'DESC'] 
    ],
    attributes: { exclude: ['content'] },
    limit: n
  });

  return listPosts;
};


export default {
  alertsDone,
  post,
  posts,
};