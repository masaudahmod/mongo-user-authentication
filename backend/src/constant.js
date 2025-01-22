import * as dotenv from "dotenv";
dotenv.config();

const origin = process.env.NODE_ENV === "production" ? process.env.PRODUCTION : process.env.DEVELOPMENT;

const PORT = process.env.PORT;
const DBURL = process.env.PRODUCTION;
const JWT_SECRET = process.env.JWT_SECRET;

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const ACCESSTOKEN_EXPIRE = process.env.ACCESSTOKEN_EXPIRE;

const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;
const REFRESHTOKEN_EXPIRE = process.env.REFRESHTOKEN_EXPIRE;

const CLOUD_NAME = process.env.CLOUD_NAME;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET;

export {
  PORT,
  DBURL,
  JWT_SECRET,
  ACCESSTOKEN_SECRET,
  ACCESSTOKEN_EXPIRE,
  REFRESHTOKEN_SECRET,
  REFRESHTOKEN_EXPIRE,
  CLOUD_NAME,
  CLOUD_API_KEY,
  CLOUD_API_SECRET,
  origin,
};
