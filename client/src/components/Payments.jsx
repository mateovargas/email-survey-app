import { useState } from "react"
import { connect } from "react-redux"
import { CardElement } from "@stripe/react-stripe-js"
import M from "materialize-css"
import { handleToken } from "../actions/index"
import { useStripePayment } from "../hooks/useStripePayment"
import "./styles/Payments.css"

const Payments = ({ handleToken }) => {
    const [isOpen, setIsOpen] = useState(false)

    const createIntent = async () => {
        const res = await fetch("/api/stripe/create-payment-intent", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        })

        if (!res.ok) {
            const text = await res.text()
            throw new Error(text)
        }

        const data = await res.json()
        return data.clientSecret
    }

    const { isLoading, error, canPay, onCardChange, pay } = useStripePayment({
        createIntent,
        onSuccess: async (paymentIntent) => {
            await handleToken({ paymentIntentId: paymentIntent.id })
            M.toast({ html: "Payment successful. 5 credits added.", displayLength: 2500 })
            setIsOpen(false)
        },
    })

    return (
        <div className="payments">
            <button className="btn" onClick={() => setIsOpen((v) => !v)}>
                Add Credits
            </button>

            {isOpen ? (
                <div className="paymentsPopover">
                    <div className="paymentsTitle">Pay $5 for 5 credits</div>

                    <div className="cardWrap">
                        <CardElement
                            onChange={onCardChange}
                            options={{
                                hidePostalCode: true,
                                style: stripeElementStyle,
                            }}
                        />
                    </div>

                    {error ? <div className="paymentsError">{error}</div> : null}

                    <button className="btn paymentsPayBtn" onClick={pay} disabled={!canPay}>
                        {isLoading ? "Processing..." : "Pay $5.00"}
                    </button>
                </div>
            ) : null}
        </div>
    )
}

const stripeElementStyle = {
    base: {
        fontSize: "var(--stripe-font-size)",
        fontFamily: "var(--stripe-font-family)",
        color: "var(--stripe-text-color)",
        iconColor: "var(--stripe-icon-color)",
        "::placeholder": { color: "var(--stripe-placeholder-color)" },
    },
    invalid: {
        color: "var(--stripe-error-color)",
        iconColor: "var(--stripe-error-color)",
    },
}

export default connect(null, { handleToken })(Payments)
