require("dotenv").config();

const database = require("./db/connect");
const productModel = require("./models/productModel");

const data = require("./products.json");

const start = async () => {
  try {
    await database(process.env.MONGO_URI);
    await productModel.deleteMany();
    await productModel.create(data);
    console.log("DB connected");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
