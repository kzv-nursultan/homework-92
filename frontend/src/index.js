import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {NotificationContainer} from "react-notifications";
import 'react-notifications/lib/notifications.css';
import App from './App';
import store from "./store/configureStore";
import './index.css';



const app = (
  <Provider store={store}>
    <NotificationContainer/>
    <App/>
  </Provider>
)

ReactDOM.render( app, document.getElementById('root'));
