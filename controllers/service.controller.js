const Service = require("../models/Service.Model.js");

const getServices = async (req, res) => {
    try {
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        

        
        const existingServices = await Service.find();

        
        
        
        

        
        
        
        
        
        

        
        return res.status(200).json({
            message: existingServices,
            successMessage:"Service retrived successfully.",
            activityDone: "Fetched services from the database."
        });

    } catch (error) {
        console.error(`services: ${error.message}`);
        return res.status(500).json({
            message: `An error occurred while processing the request.`,
            error: error
        });
    }
};

module.exports = getServices;