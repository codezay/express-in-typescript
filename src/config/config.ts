import dotenv from 'dotenv';

dotenv.config();

export const DEVELELOPMENT = process.env.NODE_ENV === 'development';
export const TEST = process.env.NODE_ENV === 'test';

export const SERVER_HOST = process.env.SERVER_HOST || 'localhost';
export const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : '1234';

export const SERVER = {
  DEVELELOPMENT,
  TEST,
  SERVER_HOST,
  SERVER_PORT
};
