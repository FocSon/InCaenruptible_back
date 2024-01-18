import sequelize from './db';
import { DataTypes, InferAttributes, InferCreationAttributes, Model } from 'sequelize';

class Alert extends Model<InferAttributes<Alert>, InferCreationAttributes<Alert>> {
  declare id: number;
  declare title: string;
  declare description: string;
  declare type: any;
  declare category: string;

  declare startTime: Date;
  declare endTime: Date;
}

Alert.init({
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
  type: {
    type: DataTypes.ENUM('video', 'photo', 'data'),
    allowNull: false,
    unique: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'alert',
});


export default Alert;
