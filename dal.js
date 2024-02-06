

// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://marlesays:<password>@atlascluster.uomnlq7.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);





const { MongoClient } = require('mongodb');

// Connection URL
const url = "mongodb+srv://marlesays:HelloMeow1#@atlascluster.uomnlq7.mongodb.net/?retryWrites=true&w=majority";
// Replace '<password>' with the actual password for your MongoDB Atlas user

// Database Name
const db = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

async function connectToMongoDB() {
    try {
        // Connect the client to the server
        await client.connect();

        console.log("Connected successfully to db server");

        // Connect to the specific database
        return client.db(db);
    } catch (err) {
        console.error("Error connecting to the database:", err);
        throw err;
    }
}

module.exports = connectToMongoDB;



//
// const MongoClient = require('mongodb').MongoClient;
// const url         = "mongodb+srv://marlesays:<password>@atlascluster.uomnlq7.mongodb.net/?retryWrites=true&w=majority";
// // const url         = 'mongodb://localhost:5000';
// let db            = null;
 
// // connect to mongo
// MongoClient.connect(url, {useUnifiedTopology: true}, function(err, client) {
//     console.log("Connected successfully to db server");

//     // connect to myproject database
//     db = client.db('myproject');
// });



// create user account
function create(name, email, password){
    return new Promise((resolve, reject) => {    
        const collection = db.collection('users');
        const doc = {name, email, password, balance: 0};
        collection.insertOne(doc, {w:1}, function(err, result) {
            err ? reject(err) : resolve(doc);
        });    
    })
}

// find user account
function find(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({email: email})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}

// find user account
function findOne(email){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .findOne({email: email})
            .then((doc) => resolve(doc))
            .catch((err) => reject(err));    
    })
}

// update - deposit/withdraw amount
function update(email, amount){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')            
            .findOneAndUpdate(
                {email: email},
                { $inc: { balance: amount}},
                { returnOriginal: false },
                function (err, documents) {
                    err ? reject(err) : resolve(documents);
                }
            );            


    });    
}

// all users
function all(){
    return new Promise((resolve, reject) => {    
        const customers = db
            .collection('users')
            .find({})
            .toArray(function(err, docs) {
                err ? reject(err) : resolve(docs);
        });    
    })
}


module.exports = {create, findOne, find, update, all};