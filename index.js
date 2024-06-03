const express = require("express");
// const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("route is working");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
