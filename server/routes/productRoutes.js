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
router.get('/', API.fetchAllPosts)
router.get('/:id', API.fetchPostId)
router.post('/', upload, API.createPost)
router.patch('/:id', upload, API.updatePost)
router.delete('/:id', API.deletePost)
router.patch('/decrement/:id', API.decrementPostQuantity)
router.post('/filter-name', API.filterItemsByName)
router.post('/filter-qr', API.filterItemsByBarCode)

module.exports = router
