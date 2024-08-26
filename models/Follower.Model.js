import mongoose, {Schema} from "mongoose"

const FollowerSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true, 
    },
    channel: {
        type: Schema.Types.ObjectId, 
        ref: "User",
        required: true, 
    }
}, {timestamps: true});



FollowerSchema.index({ follower: 1, channel: 1 }, { unique: true }); 
export const Follower = mongoose.model("Follower", FollowerSchema);