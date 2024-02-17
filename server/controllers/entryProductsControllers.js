const Product = require('../models/products/entryProducts')
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
    static createProducts = asyncHandler(async (req, res) => {
        const products = req.body

        try {
            await Product.create(products)
            res.status(201).json({ message: 'products created' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })


}
