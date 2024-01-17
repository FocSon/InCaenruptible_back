import sequelize from './db';
import {DataTypes, EnumDataType, InferAttributes, InferCreationAttributes, Model} from 'sequelize';


class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare content: any;
  declare publishingTime: Date;
  declare alertIds: number[];

  
}

Post.init({
  id: {
    type: DataTypes.INTEGER, 
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  content: {
    type: DataTypes.BLOB,
    allowNull: false,
    unique: true,
  },
  
  publishingTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  alertIds: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  
  
}, {
  sequelize,
  modelName: 'post',
});



export default Post;