const express = require('express');
const postRouter = express.Router();
const postController = require('./controllers/postController');


// endpoint without parameters
postRouter
    .route('/posts')
    .post(postController.createPost);       // create post endpoint


// endpoint with parameters
postRouter
    .route('/posts/:id')
    .get(postController.getPostById)        // get specific post using of a user endpoint
    .patch(postController.updatePost)       // update post endpoint
    .delete(postController.deletePost);     // delete post endpoint

//like endpoint
postRouter.post('/posts/:id/like', postController.likePost);

// add comment endpoint
postRouter.post('/posts/:id/comment', postController.addComment);

module.exports = postRouter;