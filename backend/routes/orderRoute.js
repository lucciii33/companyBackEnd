const express = require('express')
const {orderCheckout} = require('../controllers/orderController')
const router = express.Router()

router.route('/create-checkout-session').post(orderCheckout)

module.exports = router