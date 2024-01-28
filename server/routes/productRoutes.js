const express = require('express')
const multer = require('multer')
const router = express.Router();

//
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + '_' + file.originalname)
    }
})
let upload = multer({
    storage: storage
}).single('image')

const API = require('../controllers/productsController')
router.get('/', API.fetchAllProducts)
router.get('/:id', API.fetchProductsId)
router.post('/', upload, API.createProducts)
router.patch('/:id', upload, API.updateProducts)
router.delete('/:id', API.deleteProducts)
router.patch('/decrement/:id', API.decrementProductsQuantity)
router.post('/filter-name', API.filterItemsByName)
router.post('/filter-qr', API.filterItemsByBarCode)

module.exports = router
