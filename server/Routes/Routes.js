require("dotenv").config();
const cookieParser = require("cookie-parser");
const express = require("express");
const DataUriParser = require("datauri/parser.js");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const bcrypt = require("bcryptjs");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const router = express.Router();

router.use(cookieParser());

const Products = require("../db/models/products");
const Users = require("../db/models/users");

const auth = require("../db/middleware/auth");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/createproduct", upload.single("file"), async (req, res) => {
  try {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;
    const quantity = 1;
    const price = req.body.price;
    console.log(title,category,description,price)

    const parser = new DataUriParser();
    console.log("This is the name of file", req.file.originalname);
    const extName = path.extname(req.file.originalname).toString();
    const getDataUri = parser.format(extName, req.file.buffer);

    const fileInfo = await cloudinary.uploader.upload(getDataUri.content, {
      resource_type: "auto",
    });

    await Products.insertMany({
      title,
      category,
      description,
      quantity,
      price,
      media: {
        fileId: fileInfo.public_id,
        url: fileInfo.secure_url,
        contentType: req.file.mimetype,
      },
    });

    console.log("New Product Created Successfully!");

    res.status(200).json({ message: "New Product Created Successfully!" });
  } catch (error) {
    console.log("not stored to db", error);
    res.status(400).json({ message: "Invalid Details" });
  }
});

//get a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Products.find({ _id: req.params.id });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

// get all products.
router.get("/products", async (req, res) => {
  try {
    const products = await Products.find({}).sort({ _id: -1 });
    
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

//login handling, getting token stored in registeration and storingn that in browser cookies for authentication
router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    res.status(450).json({ message: "Please Fill The Details" });
  }

  try {
    const signInData = await Users.findOne({ email: email });
    if (signInData) {
      const token = signInData.tokens[0].token;

      res.cookie("jwtoken", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      const isMatch = await bcrypt.compare(password, signInData.password);

      if (!isMatch) {
        res.status(400).json({ message: "Password is not matching" });
      } else {
        res
          .status(200)
          .json({ message: "Login Successfull!", userData: signInData });
      }
    } else {
      res.status(420).json({ message: "Email Does Not Exist!" });
    }
  } catch (error) {
    console.log(error);
  }
});

//logout handling
router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken");
  res.status(200).json({ message: "user logout" });
});

//register and storing token of user
router.post("/register", async (req, res) => {
  const name = req.body.username;
  const email = req.body.email;
  const city = req.body.city;
  const address = req.body.address;
  const password = req.body.password;
  const cpassword = req.body.cpassword;

  if (!name || !city || !email || !address || !password || !cpassword) {
    res.status(400).json({ message: "Please fill all the details!" });
  }

  try {
    const check = await Users.findOne({ email: email });
    if (check) {
      res.status(420).json({
        message: "The email already exists!",
      });
    }

    if (password == cpassword) {
      const userData = new Users({
        name: name,
        email: email,
        city: city,
        address: address,
        password: password,
        cpassword: cpassword,
      });

      await userData.generateAuthToken();
      await userData.save();
      res.status(200).json({
        message: "Registration Successfull!",
      });
    } else {
      res.status(450).json({
        message: "Password are not matching",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

//checkout authentication
router.get("/cart", auth, (req, res) => {
  res.send(req.rootUser);
});

//check authentication
router.get("/check", auth, (req, res) => {
  res.send(req.rootUser);
});

// checkout stripe payment api
router.post("/create-checkout-session",async(req,res)=>{
  const {products} = req.body;

  const lineItems = products.map((product)=>({
      price_data:{
          currency:"usd",
          product_data:{
              name:product.name,
              images:[product.img]
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"https://luxliferfashionfinder.netlify.app/success",
      cancel_url:"https://luxliferfashionfinder.netlify.app/cancel",
  });

  res.json({id:session.id})
})

module.exports = router;
