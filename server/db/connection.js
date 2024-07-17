import mongoose from 'mongoose'
import { MongoClient, ServerApiVersion } from "mongodb"
import { MongoMemoryServer } from 'mongodb-memory-server'

// let mongo = null;

// const connectDB = async () => {
//     try {
//         let uri = 'mongodb://127.0.0.1:27017/'
//         if (process.env.NODE_ENV === 'test') {
//             mongo = await MongoMemoryServer.create();
//             uri = mongo.getUri();
//         }

//         const client = await mongoose.connect(uri, {
//             useUnifiedTopology: true,
//             useFindAndModify: false,
//         });

//         console.log(`MongoDB connected: ${client.connection.host}`);
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }

//     return client
// };

// const disconnectDB = async () => {
//     try {
//         await mongoose.connection.close();
//         if (mongo) {
//             await mongo.stop();
//         }
//     } catch (err) {
//         console.log(err);
//         process.exit(1);
//     }
// }

let uri = "mongodb://127.0.0.1:27017/";
let mongo = null;

if (process.env.NODE_ENV === "test") {
    (async () => {
        mongo = new MongoMemoryServer();
        await mongo.start();
        uri = mongo.getUri();
    })
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
    (async () => {
        // Connect the client to the server
        await client.connect();

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    })
  
} catch(err) {
  console.error(err);
}

let db = client.db("employees");

export default db;