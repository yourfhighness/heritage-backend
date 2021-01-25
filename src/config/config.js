import dotenv from 'dotenv';

dotenv.config();
const generateCredentials = (database, host) => ({
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database,
  host,
  dialect: 'postgres',
  logging: false,
});

const development = generateCredentials(
  process.env.DEV_DATABASE,
  process.env.HOST,
);
const production = generateCredentials(
  process.env.PRO_DATABASE,
  process.env.HOST,
);

export default {
  development,
  production,
};

export { development, production };
