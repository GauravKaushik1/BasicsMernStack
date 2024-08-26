require('dotenv').config({
    path: './config/config.env'
});
const mongoose = require('mongoose'); 
const mongo_Db_UrlAmend = (urlString) => {
    if (urlString.includes("<password>")) {
        console.warn("The MongoDB URL in .env file does not contain a password. Attempting to embed it...");

        const password = process.env.Mongo_DB_Password;
        const dbName = process.env.MongoDB_DataBaseName;

        if (password) {
            console.log("\x1b[32mPassword found in env file, embedding it now \x1b[0m");
            let amendedUrl = urlString.replace("<password>", password);

            if (dbName) {
                console.log("Database name found in env file, using your specified db now");
                amendedUrl = amendedUrl.replace("/?", `/${dbName}?`);
            }
            console.log("now the db connection url is: ", amendedUrl);
            return amendedUrl;
        } else {
            console.error("The MongoDB password is not present in the env file...");
            process.exit(1);
        }
    }
    
    return urlString;
};
const mongoUrl = mongo_Db_UrlAmend(process.env.MONGO_URI);
module.exports = {
    connect_db: async function() {
        try {
            const conn = await mongoose.connect(mongoUrl);
            console.log('MongoDb Connected Connection Details:');
            console.log('Connection URL:', conn.connection._connectionString);
            
            console.log(`Host: ${conn.connection.host}`);
            console.log(`Port: ${conn.connection.port}`);

            console.log(`Database Name: ${conn.connection.name}`);
            
        } catch (error) {
            console.error(`Failed to connect to MongoDB: ${error.message}`);
            process.exit(1); 
        }
    }
};