import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app.jsx';

ReactDOM.render(
  React.createElement('div', null, <App />),
  document.getElementById('index')
);