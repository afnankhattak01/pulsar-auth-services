require("dotenv").config();
const PORT = process.env.PORT || 3001;
const uri = process.env.CONNECTION_STRING;


const express = require("express");
const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const app = express();

// middleware
app.use(express.json());

const workOutPage = require("./routes/workout");
const User = require("./routes/user");

app.use("/api/workouts", workOutPage);
app.use("/api/user", User);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


async function run() {
  try {
    await client.connect().then(()=>{
      console.log("connected to db");
    });
    const coll = client.db('test').collection('movies');
    const cursor = coll.find();
    await cursor.forEach(console.dir);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
// mongoose
//   .connect(process.env.CONNECTION_STRING)
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`connected to db && server is up and running on ${PORT} !!`);
//     });
//   })
//   .catch((err) => {
//     console.log("error connecting to database", err);
//   });
