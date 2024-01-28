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
            await soldProducts.create(product)
            res.status(201).json({ message: 'product created' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })



}