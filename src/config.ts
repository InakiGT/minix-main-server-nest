import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
  mongo: {
    dbName: process.env.MONGO_DB,
    user: process.env.MONGO_INITDB_ROOT_USERNAME,
    password: process.env.MONGO_INITDB_ROOT_PASSWORD,
    host: process.env.MONGO_HOST,
    connection: process.env.MONGO_CONNECTION,
  },
  jwtSecret: process.env.JWT_SECRET,
}));
