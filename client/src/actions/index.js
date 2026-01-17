import axios from 'axios';
import { setAuth } from '../reducers/authSlice';

const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch(setAuth(res.data || false));
}

const handleToken = ({ paymentIntentId }) => async (dispatch) => {
    const res = await axios.post("/api/stripe/fulfill", { paymentIntentId })
    dispatch(setAuth(res.data))
}

const submitSurvey = (values, navigate) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch(setAuth(res.data));
    navigate('/surveys');
}

export {
    fetchUser,
    handleToken,
    submitSurvey
}