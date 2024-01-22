const Post = require('../models/products')
var fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");

module.exports = class Products {
    // fetch all posts
    static fetchAllPosts = asyncHandler(async (req, res) => {
        try {
            const posts = await Post.find()
            res.status(200).json(posts)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    })


    static fetchPostId = asyncHandler(async (req, res) => {
        const id = req.params.id
        try {
            const post = await Post.findById(id)
            res.status(200).json(post)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    })

    static createPost = asyncHandler(async (req, res) => {
        const post = req.body
        if (req.file !== undefined) {
            const imagename = req.file.filename

            post.image = imagename
        }

        try {
            await Post.create(post)
            res.status(201).json({ message: 'post created' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

    static async updatePost(req, res) {
        const id = req.params.id;
        let new_image = '';
        const old_post = await Post.findById(id);
        if (req.file) {
            // Delete old image file
            // fs.unlink(path.join(__dirname, '../uploads/', old_post.image), err => {
            //     if (err) {
            //         console.error(err);
            //         res.status(200).json({ message: 'Error deleting old image.' });
            //     }
            // });

            // Assign new image file
            new_image = req.file.filename;
        } else {
            new_image = req.body.old_image;
        }
        const newPost = req.body;
        newPost.image = new_image;
        newPost.quantity_in_store = old_post.quantity_in_store + Number(newPost.quantity_in_store);
        try {
            console.log(req.body);
            await Post.findByIdAndUpdate(id, newPost);
            res.status(200).json({ message: 'updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async decrementPostQuantity(req, res) {
        const id = req.params.id
        const new_post = req.body
        const old_post = await Post.findById(id)

        new_post.quantity_in_store = (old_post.quantity_in_store - new_post.quantity).toFixed(1)
        new_post.quantity = 0
        try {
            let post = await Post.findByIdAndUpdate(
                id,
                { $set: new_post },
                { new: true }
            );

            res.status(200).json(post)
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message })
        }
    }
    static async deletePost(req, res) {
        const id = req.params.id;
        try {
            const result = await Post.findByIdAndDelete(id)
            if (result.image != '') {
                try {
                    fs.unlinkSync('./uploads/' + result.image)

                } catch (err) {
                    console.log(err);
                }
            }
            res.status(200).json({ message: 'deleted successfully' })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }
    static filterItemsByName = asyncHandler(async (req, res) => {
        const query = req.query.q;
        const filteredData = await Post.find({ name: { $regex: query, $options: 'i' } });
        res.json(filteredData);

    })
    static filterItemsByBarCode = asyncHandler(async (req, res) => {
        const query = Number(req.query.q);
        const filteredData = await Post.find({ bar_code: query });
        res.json(filteredData);

    })
}