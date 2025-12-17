import { useCallback, useMemo, useState } from "react"
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js"

export const useStripePayment = ({ createIntent, onSuccess }) => {
    const stripe = useStripe()
    const elements = useElements()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const [cardComplete, setCardComplete] = useState(false)

    const canPay = useMemo(() => {
        return Boolean(stripe && elements && cardComplete && !isLoading)
    }, [stripe, elements, cardComplete, isLoading])

    const onCardChange = useCallback((e) => {
        setCardComplete(Boolean(e.complete))
        setError(e.error?.message || "")
    }, [])

    const pay = useCallback(async () => {
        setError("")

        if (!stripe || !elements) {
            setError("Stripe has not loaded yet. Try again in a second.")
            return { ok: false }
        }

        setIsLoading(true)

        try {
            const clientSecret = await createIntent()
            const card = elements.getElement(CardElement)

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card },
            })

            if (result.error) {
                setError(result.error.message || "Payment failed")
                setIsLoading(false)
                return { ok: false }
            }

            await onSuccess?.(result.paymentIntent)

            setIsLoading(false)
            return { ok: true, paymentIntent: result.paymentIntent }
        } catch (e) {
            setError(e.message)
            setIsLoading(false)
            return { ok: false }
        }
    }, [stripe, elements, createIntent, onSuccess])

    return {
        isLoading,
        error,
        canPay,
        onCardChange,
        pay,
    }
}
