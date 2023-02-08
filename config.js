const MONGO_URI = process.env.NODE_ENV === 'production'
  ? process.env.MONGO_URI_PROD
  : process.env.MONGO_URI_DEV;

const PAGE_URL = process.env.NODE_ENV === 'production'
  ? process.env.PAGE_URL
  : 'http://localhost:3001/';

module.exports = { MONGO_URI, PAGE_URL };