import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom'; //routing
import { Provider } from 'react-redux'; //redux
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'; //create store
import burgerBuilderReducer from './store/reducers/burgerBuilder';

import thunk from 'redux-thunk'
import orderReducer from './store/reducers/order'

import authReducer from './store/reducers/auth'


const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;//redux devtool only available in development mode

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  order: orderReducer,
  auth: authReducer
})

//create store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));




const app = (
  <Provider store={store}>{/* connect store with react app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)


ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
