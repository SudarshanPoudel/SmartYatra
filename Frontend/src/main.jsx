import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {App} from './App.jsx';
import { Provider } from 'react-redux';
import { store } from './Redux/store.js';
import axios  from 'axios';

// Setting BaseURl for api Fetching
axios.defaults.baseURL = 'http://127.0.0.1:8000/';
axios.defaults.headers.common["Authorization"] = `Bearer ${import.meta.env.VITE_ACCESS_TOKEN} `

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store} >
       <App />
    </Provider>
  </StrictMode>,
)
