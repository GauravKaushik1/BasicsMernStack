const { Schema, model, Mongoose } = require("mongoose");

const serviceSchema = new Schema({
    service: { 
        type: String, 
        
        required: true, 
        trim: true, /* Trim whitespace*/ 
    },
    description: { 
        type: String, 
        required: true, 
        trim: true, 
    },
    price: { 
        type: String, 
        required: true, 
        min: 0, 
        },
    provider: { 
        type: String, 
        required: true, 
        trim: true, 
    },
}, {
    timestamps: true, 
});
const Services = new model("Service", serviceSchema);

module.exports = Services;