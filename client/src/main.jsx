import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min.js';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios'; //temporary import to test email sending
window.axios = axios; //temporary assignment to test email sending


import App from './App'
import reducers from './reducers/index';

const store = configureStore({
  reducer: reducers,
  preloadedState: {},
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)