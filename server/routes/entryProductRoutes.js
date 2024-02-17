const express = require('express')
const multer = require('multer')
const router = express.Router();

const API = require('../controllers/entryProductsControllers')
router.get('/', API.fetchAllProducts)
router.post('/', API.createProducts)
module.exports = router