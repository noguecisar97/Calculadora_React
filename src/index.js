import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Calculadora from './main/calculadora';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <div>
    <h1>Calculadora</h1>
    <Calculadora />
  </div>,
  document.getElementById('root')
);

serviceWorker.unregister();
