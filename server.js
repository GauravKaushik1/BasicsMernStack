const express = require('express');
const ApiError = require('./utilities/ApiError.js');
const cors = require('cors');
const errorMiddleware = require("./middleware/error.middleware.js");
require('dotenv').config({
      path: './config/config.env'
});
const app = express();
const {connect_db} = require('./config/db.js');
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'localhost';
app.use(express.json());
const corsOptions = {
    origin:`${process.env.FrontendHost}:${process.env.FrontendPORT}`,

  method:"GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials:true,
}
app.use(cors(corsOptions));

const auth = require("./routes/users.routes.js");
const contactRoute = require("./routes/contact.routes.js");
const serviceRoute = require("./routes/service.routes.js");
const adminRoute = require("./routes/admin.routes.js");
app.use('/', require('./routes/index.routes.js'));
app.use('/api/users', auth);
app.use('/api/form', contactRoute);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRoute);
app.use("/api/shop", require('./routes/shop.routes.js'));

app.use(errorMiddleware);//In Express, the error-handling middleware should be defined after all your route handlers.
app.use((err, req, res, next) => {
    console.error(err.stack);
    // the error handler should send a response instead of throwing an error. You might not want to throw an ApiError here if it’s meant to be caught by your errorMiddleware.
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || 'Something went wrong!',
    });
});

;(async ()=>{
    // connect_db().catch(err => console.error('Database connection error:', err));
    try{
        await connect_db();
    
    } 
    catch(err){    
        console.error('Database connection error:', err);
    }
})();//Immediately Invoked Function Expression (IIFE)

const initializeDefaultServices = require('./utilities/initializeServices.js');
initializeDefaultServices().catch(err => console.error('Error initializing default services:', err));

app.listen(PORT, HOST,() => {
    console.log(`NodeJs Backend Server running on ${(HOST)}:${PORT}/`);
});