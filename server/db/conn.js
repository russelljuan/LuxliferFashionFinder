require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbURL = process.env.dbURL;

const connectDB = async () => {
  try {
    mongoose.connect(dbURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection to database has been successful");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = { connectDB };