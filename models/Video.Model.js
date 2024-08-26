import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videoFile: {
            type: String, 
            required: true,
            validate: {
                validator: (v) => /^.*\.(mp4|avi|mov|mkv)$/.test(v), // Example file type validation
                message: props => `${props.value} is not a valid video file format!`
            }

            
        },
        thumbnail: {
            type: String, 
            required: true,
            validate: {
                validator: (v) => /^.*\.(jpg|jpeg|png)$/.test(v), // Example image file type validation
                message: props => `${props.value} is not a valid image file format!`
            }
        },
        title: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 255,
        },
        description: {
            type: String, 
            required: true,
            minlength: 1,
            maxlength: 1024,
        },
        duration: {
            type: Number, 
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        Posts: {
            type: Schema.Types.ObjectId,
            ref: "Posts"
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    }, 
    {
        timestamps: true
    }
)

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)