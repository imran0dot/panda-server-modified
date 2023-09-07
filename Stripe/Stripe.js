const Stripe = require('stripe');
const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);
require('dotenv').config()

const paymentsFunc = {};

paymentsFunc.getPaidCources = async (req, res) => {
    const { email } = req.decoded;
    const query = { email: email };
    const result = await req.paymentHistoryCollections.findOne(query);
    if (email === result.email) {
        res.send(result);
    }
    res.status(404).send()
}

// stripe payment intent create 
paymentsFunc.paymentIntentStipe = async (req, res) => {
    const { amount } = req.body;
    const amountSent = amount * 100;
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountSent,
            currency: "usd",
            payment_method_types: ['card']
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error("Error creating payment intent:", error);
        res.status(500).send("Error creating payment intent");
    }
}

//stripe payment store in db
paymentsFunc.paymentStore = async(req, res) => {
    const { paymentInfo } = req.body;
    const result = await req.paymentHistoryCollections.insertOne(paymentInfo);
    res.send(result);
}

module.exports = paymentsFunc;
