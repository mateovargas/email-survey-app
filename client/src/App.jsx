import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { connect } from 'react-redux';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

import { fetchUser } from './actions/index';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Landing from './components/Landing';

const SurveyNew = () => <h2>SurveyNew</h2>;
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const App = ({ fetchUser }) => {

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="container">
      <Elements stripe={stripePromise}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route path='/surveys' element={<Dashboard />} />
            <Route path='/surveys/new' element={<SurveyNew />} />
          </Routes>
        </BrowserRouter>
      </Elements>
    </div>
  );
};

export default connect(null, { fetchUser })(App);
