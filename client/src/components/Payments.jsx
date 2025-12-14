import { connect } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout'

import { handleToken } from '../actions/index';

const Payments = () => {
    return (
        <StripeCheckout
            amount={500}
            billingAddress
            currency="USD"
            description="$5 for 5 email credits"
            key='stripe_checkout'
            image="https://svgshare.com/i/CUz.svg"
            name="Emaily"
            stripeKey={import.meta.env.VITE_STRIPE_KEY}
            token={token => console.log(token)}
        >
            <button className="btn">Add Credits</button>
        </StripeCheckout>
    )
}

export default connect(null, { handleToken })(Payments)