import axios from 'axios';
import { setAuth } from '../reducers/authSlice';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch(setAuth(res.data || false));
}

export const handleToken = ({ paymentIntentId }) => async (dispatch) => {
    const res = await axios.post("/api/stripe/fulfill", { paymentIntentId })
    dispatch(setAuth(res.data))
}

export const submitSurvey = (values) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch(setAuth(res.data));
}