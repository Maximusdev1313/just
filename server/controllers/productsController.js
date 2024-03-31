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
            if (await Product.exists({ name: products.name, market_name: products.market_name })) {
                return res.status(400).json({ message: "Product with the same name and market name already exists" });
            }

            const createdProduct = await Product.create(products)
            res.status(201).json(createdProduct)
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Internal Server Error' });
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
        newProducts.quantity_in_store = old_products.quantity_in_store + Number(newProducts.quantity);
        newProducts.quantity = 0
        console.log(newProducts.quantity, 'quan');
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
    static async fullyUpdateProduct(req, res) {
        const name = req.params.name; // get the product name from the request parameters
        const new_Products = req.body;
        const storeName = req.body.store_name; // get the store name from the request body

        try {
            let Products = await Product.findOne({ name: name });

            if (!Products) {
                return res.status(404).json({ message: new_Products });
            }

            if (Products.store_name !== storeName) {
                return res.status(400).json({ message: "Store name does not match" });
            }

            Products = await Product.findOneAndUpdate(
                { name: name }, // find the product by its name
                { $set: new_Products },
                { new: true }
            );

            res.status(200).json(Products);
        } catch (error) {
            console.log(error.message);
            res.status(200).json({ message: error.message });
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