const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "crud5"; // fixed typo (dbname -> dbName)

async function main() {
    try {
        await client.connect();
        console.log("Connected successfully to MongoDB");

        const db = client.db(dbName);
        const collection = db.collection("SAKEC");

        await collection.deleteMany({}); // Clear the collection


        // CREATE: Insert Multiple user (fixed typo in 'name')
        const insertManyResult = await collection.insertMany([{ name: "Aayush", age: 23 }, { name: "Anand", age: 22}, { name: "Prem", age: 21}, { name: "Shivansh", age: 14}]);
        console.log("Inserted documents:", insertManyResult.insertedCount);

        // READ: Find and display Single users (fixed variable name)
        const singleUser = await collection.findOne({ name: "Aayush" }, { projection: { _id: 0 } });
        console.log("Single User:", singleUser);

        // READ: Find and display All users (fixed variable name)
        const allUsers = await collection.find({}, { projection : {_id: 0}}).toArray();
        console.log("All Users List:", allUsers);

        //Update: 

        const updateResult = await collection.updateOne({ name: "Shivansh"}, {$set: {age: 15}});
        console.log("Updated documents:", updateResult.modifiedCount);

        // DELETE: Remove "Prem" from the collection
        const deleteResult = await collection.deleteOne({ name: "Prem" });
        console.log("Deleted documents:", deleteResult.deletedCount);

        // READ AGAIN: Show final list
        const updatedUsers = await collection.find({}, { projection : {_id: 0}}).toArray();
        console.log("Final Users List:", updatedUsers);

    } catch (err) {
        console.error("Error:", err);
    } finally {
        await client.close();
    }
}

main();
