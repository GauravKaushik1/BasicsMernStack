import mongoose, {Schema} from "mongoose";

const SavedSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true, 
    },
    description: {
        type: String,
        required: true,
        trim: true, 
    },
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    
    
    Posts: [{
        type: Schema.Types.ObjectId,
        ref: "Posts"
    }],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },
}, {timestamps: true});



export const Saved = mongoose.model("Saved", SavedSchema);