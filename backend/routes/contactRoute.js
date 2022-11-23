const express = require('express')
const {createContactForm, getContactForm} = require('../controllers/contactController')
const router = express.Router()

router.route('/create').post(createContactForm)
router.route('/').get(getContactForm)


module.exports = router
