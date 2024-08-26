const { Schema, model } = require("mongoose");
const PostSchema = new Schema({
    poster: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    text: {
        
        type: String,
        required: true, 
        trim: true, 
    },
    video: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    image: [{
        type: Schema.Types.ObjectId,
        ref: "Image", 
    }]
}, {
    timestamps: true,
});
const Posts = new model("Posts", PostSchema);

module.exports = Posts;