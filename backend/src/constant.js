import * as dotenv from "dotenv";
dotenv.config();

const origin = ["https://mongo-user-authentication.vercel.app/"];

const PORT = process.env.PORT || 8000;
const DBURL = process.env.DBURL || "mongodb+srv://admin:XCSeJpVTyFiaiYUi@usera.6xice.mongodb.net/users?retryWrites=true&w=majority&appName=userA";
const JWT_SECRET = process.env.JWT_SECRET || I65Knn7lBv;

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET || 0VW3W2door;
const ACCESSTOKEN_EXPIRE = process.env.ACCESSTOKEN_EXPIRE || 1d;

const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET || 0VW3W2door;
const REFRESHTOKEN_EXPIRE = process.env.REFRESHTOKEN_EXPIRE || 30d;

const CLOUD_NAME = process.env.CLOUD_NAME || db2less4s;
const CLOUD_API_KEY = process.env.CLOUD_API_KEY || 159667721886788;
const CLOUD_API_SECRET = process.env.CLOUD_API_SECRET || kCBy5xZ606cBNBL3GoT_ZSnwHLg;

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
