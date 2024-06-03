const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
// const jwt = require("jsonwebtoken");
const app = express();
const cors = require("cors");
const port = 5000;

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://mdyasin7636:2LP1KgybXDTswOQb@cluster0.a8edxug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const recipeDB = client.db("recipeDB");
    const userDB = client.db("userDB");
    const recipeCollection = recipeDB.collection("recipeCollection");
    const userCollection = userDB.collection("userCollection");

    // user route

    app.post("/user", async (req, res) => {
      const user = req.body;
      const isUserExist = await userCollection.findOne({ email: user?.email });
      if (isUserExist?._id) {
        return res.send({
          status: "Success",
          message: "Login Success",
        });
      }
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    app.get("/user/get/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/user/:email", async (req, res) => {
      const email = req.params.email;
      const result = await userCollection.findOne({ email });
      res.send(result);
    });

    app.patch("/user/:email", async (req, res) => {
      const email = req.params.email;
      const userData = req.body;
      const result = await userCollection.updateOne(
        { email },
        { $set: userData },
        { upsert: true }
      );
      res.send(result);
    });

    console.log("Database Connected");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("route is working");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
