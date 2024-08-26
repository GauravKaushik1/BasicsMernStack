import mongoose from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    
    const {videoId} = req.params;
    const {page = 1, limit = 10} = req.query;
    
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    
    if (pageNumber < 1 || limitNumber < 1) {
        throw new ApiError(400, 'Invalid page or limit parameters');
    }

    
    const comments = await Comment.find({ videoId })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber)
        .exec();

    
    res.json(new ApiResponse(200, 'Comments fetched successfully', comments));
})

const addComment = asyncHandler(async (req, res) => {
    
    const { videoId, content } = req.body;

    
    if (!videoId || !content) {
        throw new ApiError(400, 'Video ID and content are required');
    }

    
    const newComment = new Comment({
        videoId,
        content,
        createdAt: new Date(),
    });

    
    const savedComment = await newComment.save();

    
    res.status(201).json(new ApiResponse(201, 'Comment added successfully', savedComment));
})

const updateComment = asyncHandler(async (req, res) => {
    
    const { commentId } = req.params;
    const { content } = req.body;

    
    if (!content) {
        throw new ApiError(400, 'Content is required for update');
    }

    
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content, updatedAt: new Date() },
        { new: true, runValidators: true }
    );

    if (!updatedComment) {
        throw new ApiError(404, 'Comment not found');
    }

    
    res.json(new ApiResponse(200, 'Comment updated successfully', updatedComment));
})

const deleteComment = asyncHandler(async (req, res) => {
    
    const { commentId } = req.params;

    
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
        throw new ApiError(404, 'Comment not found');
    }

    
    res.json(new ApiResponse(200, 'Comment deleted successfully', deletedComment));
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }