const mongoose = require('mongoose');
const db = async (DATABASE_URL) => {
    try {
        const DB_OPTIONS ={
            dbName :"track_lab",
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS); 
        console.log("Database Connected to mongo");
    }catch(err){
        console.log(err); 
    }
}
module.exports = db;