import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { setUser } from './store/authSlice';

const rootElement = document.getElementById('root')!;
const root = ReactDOM.createRoot(rootElement);
const userData = localStorage.getItem('user');
if (userData) {
  const user = JSON.parse(userData);
  store.dispatch(setUser(user));
}

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
