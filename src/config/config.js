import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  },

  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
  },
};
