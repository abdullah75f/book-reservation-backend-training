module.exports = {
  database: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/yourLocalDB",
  secret: "your_jwt_secret",
};
