import axios from 'axios';
import { setAuth } from '../reducers/authSlice';
import { setSurveys } from '../reducers/surveySlice';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch(setAuth(res.data || false));
}

export const fetchSurveys = () => async dispatch => {
    const res = await axios.get('/api/surveys');
    dispatch(setSurveys(res.data));
}

export const handleToken = ({ paymentIntentId }) => async (dispatch) => {
    const res = await axios.post("/api/stripe/fulfill", { paymentIntentId })
    dispatch(setAuth(res.data))
}

export const submitSurvey = (values) => async (dispatch) => {
    const res = await axios.post('/api/surveys', values);
    dispatch(setAuth(res.data));
    dispatch(fetchSurveys());
}