const express = require('express')

const router = express.Router();


const API = require('../controllers/outlayControllers')
router.get('/', API.fetchAllOutlay)

router.post('/', API.createOutlay)


router.delete('/:id', API.deleteOutlay)


module.exports = router
