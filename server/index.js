const dotenv = require("dotenv").config();
const mongoose = require('mongoose')
const Stripe = require("stripe");
const express = require("express");
const cors = require("cors");
const { addProduct, getAllProduct } = require("./Controllers/productController");
const app = express();

app.use(cors({
  origin: "*",
  credentials: true
}));
app.use(express.json());
app.use(express.static("public"));
const PORT = process.env.PORT || 8080;

const FRONTEND = process.env.DOMAIN

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
app.post('/product',addProduct)
app.get('/product',getAllProduct);
app.post("/create-checkout-session", async (req, res) => {
  console.log(req.body);
    try{
        const params = {
            submit_type: "pay",
            mode: "payment",
            payment_method_types: ["card"],
            billing_address_collection: "auto",
            // shipping_options: [{ shipping_rate: "shr_1MJTX8SHnOGYGLnPO1haAXqp" }],
        
            line_items: req.body.map((item) => {
              return {
                price_data: {
                  currency: "inr",
                  product_data: {
                    name: item.title,
                    images: [item.imgURL],
                  },
                  unit_amount: item.price * 100,
                },
                adjustable_quantity: {
                  enabled: true,
                  minimum: 1,
                },
                quantity: item.qty,
              };
            }),
        
            //mode: "payment",
            success_url: `${FRONTEND}/success`,
            cancel_url: `${FRONTEND}/canceled`,
          };

          const session = await stripe.checkout.sessions.create(params);
          res.status(200).json(session.id)
        //   res.redirect(303, session.url);
    }catch(err){
        console.log(err);
        res.status(err.statusCode || 500).json(err.message);
    }
 
});


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_eb4a5f8d2421cf7cafafc42199c2f362e38a3d53865f35a5c6066cb25c31c439";

app.post('/webhook', express.raw({type: 'application/json'}), (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      console.log("checkoutSessionAsyncPaymentFailed",checkoutSessionAsyncPaymentFailed)
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      console.log("checkoutSessionAsyncPaymentSucceeded",checkoutSessionAsyncPaymentSucceeded)
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      break;
    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      console.log("checkoutSessionCompleted",checkoutSessionCompleted)
      // Then define and call a function to handle the event checkout.session.completed
      break;
    case 'checkout.session.expired':
      const checkoutSessionExpired = event.data.object;
      console.log("checkoutSessionExpired",checkoutSessionExpired)
      // Then define and call a function to handle the event checkout.session.expired
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});


// app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`))
mongoose.connect(`${process.env.MONGO_URL}/RESTAURANT`)
.then(()=>{console.log("Database connected succesfully")
  app.listen(PORT, () => console.log("Running on port " + PORT));

})
.catch((e)=>{"Error to connect DB ",e})


