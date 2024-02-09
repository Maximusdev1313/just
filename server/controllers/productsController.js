const Product = require('../models/products/products')
var fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");

module.exports = class Products {
    // fetch all posts
    static fetchAllProducts = asyncHandler(async (req, res) => {
        try {
            const products = await Product.find()
            res.status(200).json(products)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    })


    static fetchProductsId = asyncHandler(async (req, res) => {
        const id = req.params.id
        try {
            const products = await Product.findById(id)
            res.status(200).json(products)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    })

    static createProducts = asyncHandler(async (req, res) => {
        const products = req.body
        if (req.file !== undefined) {
            const imagename = req.file.filename

            products.image = imagename
        }

        try {
            await Product.create(products)
            res.status(201).json({ message: 'products created' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })

    static async updateProducts(req, res) {
        const id = req.params.id;
        let new_image = '';
        const old_products = await Product.findById(id);
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
        const newProducts = req.body;
        newProducts.image = new_image;
        newProducts.quantity_in_store = old_products.quantity_in_store + Number(newProducts.quantity_in_store);
        try {
            console.log(req.body);
            await Product.findByIdAndUpdate(id, newProducts);
            res.status(200).json({ message: 'updated successfully' });
        } catch (error) {
            res.status(404).json({ message: error.message });
        }
    }
    static async decrementProductsQuantity(req, res) {
        const id = req.params.id
        const new_Products = req.body
        const old_Products = await Product.findById(id)
        console.log(new_Products.quantity);
        console.log(old_Products, 'old');
        new_Products.quantity_in_store = (old_Products.quantity_in_store - new_Products.quantity).toFixed(1)
        new_Products.quantity = 0
        try {
            let Products = await Product.findByIdAndUpdate(
                id,
                { $set: new_Products },
                { new: true }
            );


            res.status(200).json(Products)
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message })
        }
    }
    static async deleteProducts(req, res) {
        const id = req.params.id;
        try {
            const result = await Product.findByIdAndDelete(id)
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
        const filteredData = await Product.find({ name: { $regex: query, $options: 'i' } });
        res.json(filteredData);

    })
    static filterItemsByBarCode = asyncHandler(async (req, res) => {
        const query = Number(req.query.q);
        const filteredData = await Product.find({ bar_code: query });
        res.json(filteredData);

    })
}