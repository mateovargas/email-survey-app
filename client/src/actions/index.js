import axios from 'axios';
import { FETCH_USER } from './types';

const fetchUser = () => async dispatch => {
    console.log("Thunk started");
    const res = await axios.get('/api/current_user');
    console.log("API response:", res.data);
    dispatch({
        type: FETCH_USER,
        payload: res.data || false
    });
    console.log("Thunk finished");
}

export {
    fetchUser
}