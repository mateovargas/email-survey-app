import axios from 'axios';
import { setAuth } from '../reducers/authSlice';

const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch(setAuth(res.data || false));
}

const handleToken = (token) => async dispatch => {
    const res = await axios.post('/api/stripe', token);
    dispatch(setAuth(res.data));
}

export {
    fetchUser,
    handleToken
}