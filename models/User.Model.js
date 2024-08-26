const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');//for encryption
const jwt = require('jsonwebtoken');//for token generation
require('dotenv').config(
    {
        path: "./config/config.env"
    }
)


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, 
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true, 
        
    },
    phone: {
        type: String, 
        required: true,
        index: true, 
        
    },
    password: {
        type: String,
        required: true,
        minlength: 8, 
        
        
    },
    fullName: {
        firstName: {
            type: String,
            required: true,
        },
        middleName: {
            type: String,
            required: false,
        },
        lastName: {
            type: [String], 
            required: false,
        },
    },
    profile_Pic: {
        type: String,
        required: false, 
    },
    refreshToken: {
        type: String,
        required:false,
    },
    isAdmin: {
        type: Boolean,
        default: false, 
    },
    roles:{
        type:[String],
        default: ["user"],
    }
}, {
    timestamps: true, 
});


userSchema.index({ username: 1, email: 1, phone: 1});


userSchema.pre('save',async function(next){//if password is not changed go to next step which is to save data to db next is the next step
    

    console.log("pre method has run before save of ", this, " to the database");
    const user = this;
    
    if(!user.isModified("password")){
        return next();
    }
    try{
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        next();
    }
    catch(error){
        console.error("error in pre save to db in user model");
        return next(error);
    }
});

userSchema.methods.generateToken = async function(){//use the schema.methods.function to enable the instance methods to work in all the controllers
    try {
        return jwt.sign(//await does not work on this type of expression
            {
                userId: this._id.toString(),
                email: this.email,
                isAdmin: this.isAdmin,
                
                
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "30d",
            }
        );
    } catch (error) {
        console.error("Error generating token:", error);
        throw error; 
    }
};




userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "30d"
        }
    )
}

userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model("User", userSchema);