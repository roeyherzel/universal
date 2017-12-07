import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom';

import App from './App';


const render = Component => {
  ReactDOM.render(
    <AppContainer>
		<BrowserRouter>
      		<Component />
		</BrowserRouter>
    </AppContainer>,
    document.getElementById('root'),
  )
}

render(App)

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
	  const nextApp = require('./App').default;
	  render(nextApp);
	});
}