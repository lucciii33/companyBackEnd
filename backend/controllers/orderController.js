const stripe = require('stripe')(process.env.STRIPE_KEY)
const asyncHandler = require("express-async-handler")

const orderCheckout = asyncHandler(async (req, res) => {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price_data: {
            currency: 'usd',
            product_data: {
                name: "t-shirt"
            },
            unit_amount: 2000
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}success`,
      cancel_url: `${process.env.CLIENT_URL}cancel`,
    });
  
    res.send({url: session.url});
  });
  
module.exports={
    orderCheckout,
}