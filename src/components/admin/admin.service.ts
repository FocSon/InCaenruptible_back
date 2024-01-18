import AlertModel from '@models/alert.model';
import Post from '@models/post.model';
import { Op } from 'sequelize';
import * as Alerts from '@alerts' 
import { Alert } from 'types';



const updateAlert = async (id: number, alert: Partial<Alert>) => {
  const alertf = await AlertModel.findOne({
    where: { id: id },
  });
  if (alertf === null){
    return false;
  }
  return await AlertModel.update(alert as any, {
      where: {
        id,
      },
   } as any);
}


const createPost = async (id:number, title: string | undefined, description: string | undefined, content: string | undefined) => {
  return await Post.create({
    id: id,
    title: title,
    description: description,
    content: content,
    publishingTime: new Date(),
    alertIds: undefined,
  });
};


const deletePost = async (id: number) => {

    const post = await Post.findOne({
        where: { id: id },
      });

      if (post === null){
        return false;
      }


    await Post.destroy({
        where: {
          id: id,
        },
    });
};
  
  
export default {
  updateAlert,
  createPost,
  deletePost,
};