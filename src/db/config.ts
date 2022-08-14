import { Sequelize } from 'sequelize-typescript';
import { Todos } from '../models/todos';
import { Users } from '../models/users';
import dotenv from 'dotenv';

dotenv.config();

const connection = new Sequelize({
  username: process.env.SEQUELIZE_USERNAME,
  password: process.env.SEQUELIZE_PASSWORD,
  database: process.env.SEQUELIZE_DATABASE,
  host: process.env.SEQUELIZE_HOST,
  dialect: 'mysql',
  logging: false,
  models: [Todos, Users],
});

export default connection;
