import axios from 'axios';
import { setAuth } from '../reducers/authSlice';

const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/current_user');
    dispatch(setAuth(res.data || false));
}

export {
    fetchUser
}