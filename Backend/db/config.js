import dotenv from "dotenv";

dotenv.config();

const { HOST, PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } =
  process.env;

export const sqlConfig = {
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  server: DB_HOST,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};
