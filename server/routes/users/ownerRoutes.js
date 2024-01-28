const express = require('express')

const router = express.Router();

const API = require('../../controllers/userControllers/ownerController')
router.get('/get', API.getOwner)
router.post('/register-owner', API.register)
router.post('/login-owner', API.login)
module.exports = router