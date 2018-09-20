import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './configureStore';

import 'semantic-ui-css/semantic.min.css';
// import './css/semantic.united.min.css';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/app">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
