const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion } = require("mongodb");
const ObjectId = require('mongodb').ObjectId;
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
// get dat 
app.get('/user',async(req,res) => {
  const query={};
  const cursor=userCollections.find(query)
  const users=await cursor.toArray()
  res.send(users)
})

app.get('/user/:id',async(req,res) => {
  const id=req.params.id
  const query={_id:ObjectId(id)}
  const result=await userCollections.find(query)
  res.send(result)
})

    // Post data 
    app.post('/user',async(req,res)=>{
      const newUser=req.body;
      console.log('ary ready for adding new user',newUser);
      const result=await userCollections.insertOne(newUser);
      res.send(result);
    })
    // delete
    app.delete('/user/:id',async(req,res)=>{
      const id=req.params.id;
      const query={_id:ObjectId(id)}
     const result=await userCollections.deleteOne(query);
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
