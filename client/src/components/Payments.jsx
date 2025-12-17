import { useState } from "react"
import { connect } from "react-redux"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"

import { handleToken } from "../actions/index"
import './styles/Payments.css';

const Payments = ({ handleToken }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [isOpen, setIsOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    const createPaymentIntent = async () => {
        const res = await fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
            const text = await res.text()
            throw new Error(text.slice(0, 200))
        }

        const data = await res.json()
        if (!res.ok) throw new Error(data.error || "Failed to create payment intent")

        return data.clientSecret
    }

    const onPay = async () => {
        setError("")

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet. Try again in a second.")
            return
        }

        setIsLoading(true)

        try {
            const clientSecret = await createPaymentIntent()
            const card = elements.getElement(CardElement)

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            })

            if (result.error) {
                setError(result.error.message || "Payment failed")
                setIsLoading(false)
                return
            }

            await handleToken({ paymentIntentId: result.paymentIntent.id })

            setIsLoading(false)
            setIsOpen(false)
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
        }
    }

    return (
        <div className='payments'>
            <button className="btn" onClick={() => setIsOpen((v) => !v)}>
                Add Credits
            </button>

            {isOpen ? (
                <div className='paymentsPopover'>
                    <div className='cardWrap'>
                        <CardElement
                            options={{
                                hidePostalCode: true,
                            }}
                        />
                    </div>

                    {error ? (
                        <div className='paymentsError'>
                            {error}
                        </div>
                    ) : null}

                    <button
                        className="btn"
                        style={{ marginTop: 12 }}
                        onClick={onPay}
                        disabled={!stripe || !elements || isLoading}
                    >
                        {isLoading ? "Processing..." : "Pay $5.00"}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

export default connect(null, { handleToken })(Payments)
