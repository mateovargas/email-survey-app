import Stripe from 'stripe';

import { stripeKeys } from '../config/keys.js';

const billingRoutes = (app) => {
    app.post('/api/stripe', (req, res) => {

    })
}

export default billingRoutes;