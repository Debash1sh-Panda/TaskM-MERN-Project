const mongoose = require('mongoose');
require('dotenv').config();

const databaseConnection = async () => {
    try {
        await mongoose.connect( process.env.CLOUD_DATA_BASE_URL, 
            // sample statement
        ).then( () => console.log("Database conntected"))
        .catch( (error) => console.log("Database is not Connected", error));
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
}

module.exports = { databaseConnection };