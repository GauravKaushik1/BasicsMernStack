const {Schema, model} = require("mongoose");

const contactSchema = new Schema({
    username:{
        type:String,
        required:true,
        trim: true, 
    },
    
    email:{
        type:String,
        required:true,
        trim: true, 
        lowercase: true, 
        validate: {
            validator: function(v) {
                
                return /^\S+@\S+\.\S+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    message:{
        type:String,
        required:true,
        trim: true, 
    },
}, {
    timestamps: true,
});




module.exports = model("Contact",contactSchema);