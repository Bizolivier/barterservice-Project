import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Auth0ProviderAndHistory from './auth/Auth0ProviderAndHistory ';

const baseUrl = document.getElementsByTagName('base')[0].getAttribute('href');
const rootElement = document.getElementById('root');

ReactDOM.render(
  <BrowserRouter basename={baseUrl}>
    <Auth0ProviderAndHistory>
       <App />
    </Auth0ProviderAndHistory>
   
  </BrowserRouter>,
  rootElement);

registerServiceWorker();

