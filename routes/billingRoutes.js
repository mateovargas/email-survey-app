import Stripe from "stripe"
import { stripeKeys } from "../config/keys.js"
import requireLogin from "../middleware/requireLogin.js"

const stripe = new Stripe(stripeKeys.secretKey)

const billingRoutes = (app) => {
    app.post("/api/stripe/create-payment-intent", requireLogin, async (req, res) => {
        try {
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 500,
                currency: "usd",
                description: "Five dollars for 5 credits",
                automatic_payment_methods: { enabled: true },
            })

            res.send({ clientSecret: paymentIntent.client_secret })
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    })

    app.post("/api/stripe/fulfill", requireLogin, async (req, res) => {
        try {
            const { paymentIntentId } = req.body

            const pi = await stripe.paymentIntents.retrieve(paymentIntentId)

            if (pi.status !== "succeeded") {
                return res.status(400).send({ error: "Payment not completed" })
            }

            req.user.credits += 5
            const user = await req.user.save()
            res.send(user)
        } catch (err) {
            res.status(500).send({ error: err.message })
        }
    })
}

export default billingRoutes