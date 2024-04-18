const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const session = require("express-session");
const registerRoute = require("./routes/clientUserRoute")
const adminRegisterRoute = require("./routes/admin")
const adminProductsRoute = require("./routes/card");
const categoryRoute = require("./routes/categoryRoute");
const orderRouter = require('./routes/order')
const cartRouter = require('./routes/cart')
const path = require("path");
const searchRoute = require("./routes/searchpage")

const app = express();

app.use(cors(
  {
    credentials: true,
    origin: "http://localhost:3000",
    exposedHeaders: ["set-cookie"],
  }
));
app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
  })
);
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/images")));

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "images");
    },
    filename: (req, file, cb) => {
      cb(null, req.body.name);
    },
  }),
});

// Metoda e ruajtjes se imazhit ne DB dhe tek folderi
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {

    return res.status(400).json({ error: "No file uploaded" });
  }

  res.status(200).json("File has been uploaded");
});

// Connect DB
// Database
mongoose.connect(
  "mongodb+srv://petShop:petShopProject@petshop.taymmdw.mongodb.net/PetShop?retryWrites=true&w=majority",

  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
  .then(() => console.log("DB connected"))
  .catch((err) => console.log("Something is wrong", err));

// Therritja e router

app.use(adminRegisterRoute)
app.use(adminProductsRoute);
app.use(categoryRoute);
app.use(registerRoute);
app.use(searchRoute);
app.use(orderRouter)
app.use(cartRouter)

app.use("/", (req, res) => {
  res.send("Hello Node!");
});

app.listen(5000, () => {
  console.log("Server Created");
});
