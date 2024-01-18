import sequelize from './db';
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import Alert from '@models/alert.model';
import Post from '@models/post.model';

class AlertPost extends Model<InferAttributes<AlertPost>, InferCreationAttributes<AlertPost>> {
  declare alertId: number;
  declare postId: number;

}

AlertPost.init({
  alertId: {
    type: DataTypes.INTEGER,
    references: {
      model: Alert,
      key: 'id',
    },
  },
  postId: {
    type: DataTypes.INTEGER,
    references: {
      model: Post,
      key: 'id',
    },
  },

}, {
  sequelize,
  modelName: 'alertPost',
});

Alert.belongsToMany(Post, {
  through: AlertPost,
  foreignKey: 'alertId',
  otherKey: 'postId',
});

Post.belongsToMany(Alert, {
  through: AlertPost,
  foreignKey: 'postId',
  otherKey: 'alertId',
});


export default AlertPost;
