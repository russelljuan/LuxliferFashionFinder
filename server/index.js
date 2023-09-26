const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const Routes = require("./Routes/Routes");

const { connectDB } = require("./db/conn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const cors = require("cors");

const PORT = process.env.PORT || 5000;

// "http://localhost:3000"

app.use(
  cors({
    credentials: true,
    origin: ["https://luxliferfashionfinder.netlify.app"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["*", "Authorization"],
  })
);

app.use(express.json());

app.use(Routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests...");
  });
});