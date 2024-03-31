const express = require('express')
const multer = require('multer')
const router = express.Router();

const API = require('../controllers/returnProductsControllers')
router.get('/', API.fetchAllProducts)
router.post('/', API.postNewProduct)
module.exports = router