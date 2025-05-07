const express = require('express'); 
const MongoClient = require('mongodb').MongoClient; 
 
const app = express(); 
const port = 3000; 
const url = "mongodb://localhost:27017"; 
const dbName = "Students_detail_db"; 
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
 
 
app.post('/addStudent', (req, res) => { 
    const newUser = { name: req.body.name, rollno: req.body.rollno, prn: 
req.body.prn, branch: req.body.branch, email: req.body.email }; 
    db.collection("students").insertOne(newUser) 
        .then(() => res.redirect('/')) 
        .catch(err => res.send("Error inserting student: " + err)); 
}); 
 
 
app.get('/getStudents', (req, res) => { 
    db.collection("students").find().toArray() 
        .then(students => res.send(students)) 
        .catch(err => res.send("Error fetching users: " + err)); 
}); 
 
 
app.post('/updateStudent', (req, res) => { 
    const query = { prn: req.body.prn }; 
    const newValues = { $set: { name: req.body.name, rollno: 
req.body.rollno, branch: req.body.branch, email: req.body.email } }; 
    db.collection("students").updateOne(query, newValues) 
        .then(() => res.redirect('/')) 
        .catch(err => res.send("Error updating student details: " + err)); 
}); 
 
 
app.post('/deleteStudent', (req, res) => { 
    const query = { prn: req.body.prn }; 
    db.collection("students").deleteOne(query) 
        .then(() => res.redirect('/')) 
        .catch(err => res.send("Error deleting student: " + err)); 
}); 
 
// Start Server 
app.listen(port, () => { 
    console.log(`Server running at http://localhost:${port}`); 
}); 