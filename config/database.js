const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');
//const dbUrl = "mongodb+srv://mukulOmer:9044%40Mukul@cluster0.a4izb.mongodb.net/CapitalSetu?retryWrites=true&w=majority";
const dbUrl = "mongodb://localhost/imdb";
const client = new MongoClient(dbUrl);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);

// mongoose.connect(dbUrl, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => {
//     console.log("Successfully connected to the database");
// }).catch(err => {
//     console.log('Could not connect to the database. Exiting now...', err);
//     process.exit();
// });