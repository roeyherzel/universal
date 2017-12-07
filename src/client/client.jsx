import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom';

import App from '../universal/App';


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
  module.hot.accept('../universal/App', () => {
	  const nextApp = require('../universal/App').default;
	  render(nextApp);
	});
}