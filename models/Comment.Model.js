import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: true,
            
            trim: true, 
        },
        video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
            required: false, 
    
        },
        Posts: {
            type: Schema.Types.ObjectId,
            ref: "Posts",
            required: false, 
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true, 
        }
    },
    {
        timestamps: true, 
    }
);


commentSchema.plugin(mongooseAggregatePaginate);

export const Comment = mongoose.model("Comment", commentSchema);