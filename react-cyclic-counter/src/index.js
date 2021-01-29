import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const cycle = 20;

ReactDOM.render(<App cycle={cycle}/>, document.getElementById('root'));
registerServiceWorker();
