const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_USER_PASSWORD}@cluster0.vihvh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
    );
    console.log("mongodb connection success!");
  } catch (error) {
    console.log("mongodb connection failed!", error.message);
  }
};

// dailyBuy
module.exports = dbConnection;
