const Posts = require('./../model/postModel');
const Comments = require('./../model/commentModel');

exports.createPost = async (req, res) => {
    try {
        const { postContent, postImage } = req.body;
        if (!postContent) {
            return res.status(400).json({
                status: 'error',
                message: 'post content cant be empty.'
            });
        }
        const post = await Posts.create({ postedByUser: req.user.id, postContent: req.body.postContent, image: req.body.postImage });
        if (post) {
            res.status(200).json({
                status: 'success',
                data: {
                    post
                }
            });
        }
    }
    catch (err) {
        console.log(err);
    }
};

exports.getPostById = async (req, res) => {
    try {
        const posts = await Posts.find({ postedByUser: req.params.id }).populate('comments').populate('likedBy');
        if (!posts) {
            res.status(404).json({
                status: 'error',
                message: 'Can\'t find any post.'
            });
        }
        res.status(200).json({
            status: 'success',
            data: {
                posts
            }
        });
    } catch (err) {
        console.log(err);
    }
};

exports.updatePost = async (req, res) => {
    try {
        console.log('reached');
        if (req.body.postImage) {
            const updatePost = await Posts.findByIdAndUpdate(req.params.id, {
                postContent: req.body.postContent,
                image: req.body.postImage
            }, { new: true });
            if (updatePost) {
                res.status(200).json({
                    status: 'success',
                    data: {
                        updatePost
                    }
                });
            }
        } else {
            const updatePost = await Posts.findByIdAndUpdate(req.params.id, { postContent: req.body.postContent });
            console.log(updatePost);
            if (updatePost) {
                res.status(200).json({
                    status: 'success',
                    data: {
                        updatePost
                    }
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
};

exports.deletePost = async (req, res) => {
    try {
        console.log(req.params.id);
        const delPost = await Posts.findByIdAndDelete(req.params.id);
        console.log(delPost);
        if (delPost) {
            res.status(200).json({
                status: 'success',
                message: 'post deleted successfully'
            });
        }
    } catch (err) {
        console.log('err');
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Posts.findOne({ id: req.params.id });
        if (!post) {
            res.status(404).json({
                status: 'error',
                message: 'Post not found'
            });
        }
        const findUser = post.likedBy.find((el) => {
            if (el == req.user.id) {
                return true;
            }
        });
        if (findUser) {
            return res.status(200).json({
                status: 'success',
                message: 'you already liked the post'
            });
        }
        post.likes = post.likes + 1;
        post.likedBy.push(req.user.id);
        await post.save()
        res.status(200).json({
            status: 'success',
            message: 'post liked'
        });

    } catch (err) {
        console.log(err);
    }
};

exports.addComment = async (req, res) => {
    try {
        const comment = await Comments.create({
            commentBy: req.user.id,
            post: req.params.id,
            mainContent: req.body.comment
        });
        if (comment) {
            const saveComment = await Posts.findOne({ id: req.params.id });
            saveComment.comments.push(comment.id);
            if (await saveComment.save()) {
                res.status(200).json({
                    status: 'success',
                    message: 'Comment added successfully'
                });
            }
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Some error occured'
            });
        }
    } catch (err) {
        console.log(err);
    }
};