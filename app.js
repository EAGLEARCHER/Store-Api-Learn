// console.log('04 Store API')

require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const uri = process.env.MONGO_URI;

const database = require("./db/connect");
const productRoutes = require("./routes/productsRoute");

const notFoundRoute = require("./middleware/not-found");
const errorMiddleware = require("./middleware/error-handler");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello");
});
app.use("/api/v1/products", productRoutes);
app.use(notFoundRoute);
app.use(errorMiddleware);

const start = async () => {
  try {
    await database(uri).then(() => console.log("database connected"));
    app.listen(port, console.log(`Server started ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
