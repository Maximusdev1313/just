const soldProduct = require('../models/products/soldProducts')
var fs = require('fs');
const path = require('path');
const asyncHandler = require("express-async-handler");


module.exports = class Products {
    // fetch all posts
    static async fetchAllProducts(req, res, next) {
        try {
            const products = await soldProduct.find();
            res.status(200).json(products);
        } catch (err) {
            err.status = 404;
            next(err);
        }
    }
    // get single product by id
    static async getSingleProduct(req, res, next) {
        const prodId = req.params.id;
        try {
            const product = await soldProduct.findById(prodId);
            if (!product) {
                return next({
                    status: 404, message: "No product with that ID"
                });
            } else {
                res.status(200).json(product);
            }
        } catch (err) {
            next(err);
        }
    }
    // create new product
    static postNewProduct = asyncHandler(async (req, res, next) => {
        const product = req.body


        try {
            await soldProduct.create(product)
            res.status(201).json({ message: `${product.name}` })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    static async fullyUpdateProduct(req, res) {
        const id = req.body.id; // get the product id from the request body
        const storeName = req.body.store_name; // get the store name from the request body
        const new_Products = req.body;

        try {
            let Products = await soldProduct.findById(id);

            if (!Products) {
                return res.status(404).json({ message: new_Products });
            }

            if (Products.store_name !== storeName) {
                return res.status(400).json({ message: "Store name does not match" });
            }

            Products = await soldProduct.findByIdAndUpdate(
                id,
                { $set: new_Products },
                { new: true }
            );

            res.status(200).json('sold');
        } catch (error) {
            console.log(error.message);
            res.status(200).json({ message: error.message });
        }
    }
    static fetchProductsId = asyncHandler(async (req, res) => {
        const id = req.params.id
        try {
            const products = await Product.findById(id)
            res.status(200).json(products)
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    })


}