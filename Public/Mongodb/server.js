const express = require('express');
const MongoClient = require('mongodb').MongoClient;

const app = express();
const port = 3000;
const url = "mongodb://localhost:27017/";
const dbName = "DD3";
let db;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public")); // Serves static files

// Connect to MongoDB
MongoClient.connect(url)
    .then(client => {
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    })
    .catch(err => console.error(err));

// Serve HTML file
app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// Create User (Insert)
app.post('/addCustomer', (req, res) => {
    const newUser = { name: req.body.name, email: req.body.email, phone: req.body.phone, address: req.body.address };
    db.collection("Customers").insertOne(newUser)
        .then(() => res.redirect('/'))
        .catch(err => res.send("Error inserting user: " + err));
});


// Start Server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});