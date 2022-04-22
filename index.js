const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
// user user1
// pssword 5KeUqTFHLNKR9Gbk
// use middleware

const uri =
  "mongodb+srv://user1:5KeUqTFHLNKR9Gbk@cluster0.fdz6q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const userCollections = client.db("express").collection("user");

    app.post('/user',async(req,res)=>{
      const newUser=req.body;
      console.log('ary ready for adding new user',newUser);
      const result=await userCollections.insertOne(newUser);
      res.send(result);
    })
  }
   finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send("anni vala achinnikan");
});

app.listen(port, () => {
  console.log("runung card", port);
});
