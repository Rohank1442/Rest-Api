const { validationResult } = require('express-validator/check');

const Post = require('../models/post');

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [
            { 
                _id: '1',
                title: 'First Post', 
                content: 'This is the first post!', 
                imageUrl: 'images/Messi.jpg',
                creator: {
                    name: 'Rohan'
                },
                createdAt: new Date()
            }
        ]
    });
};

exports.createPost = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        // console.log('hi2')
        return res
        .status(422)
        .json({
            message: 'Validation failed, entered data is incorrect',
            errors: errors.array()
        });
    }
    const title = req.body.title;
    const content = req.body.content;
    console.log("hii")
    const post = new Post({
        title: title,
        content: content,
        imageUrl: 'images/Messi.jpg',
        creator: { name: 'Rohan' },
    });
    post
    .save()
    .then(result => {
        console.log(err);
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    })
    .catch(err => {
        console.log(err);
    });
};