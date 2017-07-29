import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import rapid from 'rapid-io';
import registerServiceWorker from './registerServiceWorker';

//const client = rapid.createClient('NDA1OWE0MWo1b3AzYmI2LnJhcGlkLmlv'); 

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
