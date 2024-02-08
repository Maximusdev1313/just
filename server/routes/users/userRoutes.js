const express = require('express')

const router = express.Router();

const API = require('../../controllers/userControllers/userController')
router.get('/get', API.getUser)
router.post('/register-user', API.register)
router.post('/login-user', API.login)
module.exports = router