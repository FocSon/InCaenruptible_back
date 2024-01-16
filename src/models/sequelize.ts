import {Sequelize} from 'sequelize';

const setupDatabase = (path: string): Sequelize => {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path,
    logging: false,
  });

  return sequelize;
};

export default setupDatabase;