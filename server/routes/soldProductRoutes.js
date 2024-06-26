const express = require('express')
const router = express.Router();

const API = require('../controllers/soldProducts')
router.get('/', API.fetchAllProducts)
router.post('/', API.postNewProduct)
router.patch('/:id', API.fullyUpdateProduct)
router.get('/:id', API.fetchProductsId)

module.exports = router