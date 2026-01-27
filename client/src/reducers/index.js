import { combineReducers } from 'redux';

import authReducer from './authSlice';
import surveyReducer from './surveySlice';

export default combineReducers({
    auth: authReducer,
    surveys: surveyReducer
});