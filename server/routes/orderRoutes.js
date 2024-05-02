const express = require('express')
const multer = require('multer')
const router = express.Router();




const API = require('../controllers/orders/clientController')
router.get('/', API.getAllClients)
router.get('/:id', API.fetchClientId)
router.post('/', API.createClient)
router.delete('/:id', API.deleteClient)
router.patch('/update-order', API.updateOrderQuantity)
router.patch('/:id', API.updateClient)



router.post('/post-orders', API.createOrderedProducts)
router.post('/post-returns', API.createReturnProducts)


module.exports = router