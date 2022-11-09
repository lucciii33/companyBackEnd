const stripe = require('stripe')(process.env.STRIPE_KEY)
const asyncHandler = require("express-async-handler")
const OrderSchema = require('../models/orderModel')

const orderCheckout = asyncHandler(async (req, res) => {
  const order = req.body.map((item)=>{
      return(
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
                name: item.name
            },
            unit_amount: item.price * 100
          },
          quantity: 1,
        }
      )
  })
    const session = await stripe.checkout.sessions.create({
      line_items: order,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}success`,
      cancel_url: `${process.env.CLIENT_URL}cancel`,
    });
    if(session){
      let price = 0
      const calculateTotalPrice = order.map((item)=>{
          price += (item.price_data.unit_amount * item.quantity)
      })
      const newOrder = OrderSchema.create({
        items: order,
        totalPrice: price
      })
    }
  
    res.send({url: session.url});
  });
  
module.exports={
    orderCheckout,
}