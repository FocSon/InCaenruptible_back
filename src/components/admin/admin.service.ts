import AlertModel from '@models/alert.model';
import Post from '@models/post.model';
import { Alert } from 'types';


const updateAlert = async (id: number, alert: Partial<Alert>) => {
  const [affected] =  await AlertModel.update(alert as any, {
    where: {
      id,
    },
  } as any);

  return affected > 0;
};


const createPost = async (id: number, title: string | undefined, description: string | undefined, content: string | undefined) => {
  return await Post.create({
    id: id,
    title: title,
    description: description,
    content: content,
    publishingTime: new Date(),
    alertIds: [],
  } as any);
};


const deletePost = async (id: number) => {
  const affected = await Post.destroy({
    where: {
      id: id,
    },
  });
  return affected > 0;
};


export default {
  updateAlert,
  createPost,
  deletePost,
};
