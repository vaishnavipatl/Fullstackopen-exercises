import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.PORT||3001;
export const MONGODB_URL =
  process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URL : process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error('MONGODB_URL is undefined. Check your .env file.');
    process.exit(1);
}