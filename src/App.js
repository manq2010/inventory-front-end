import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './pages/AppRoutes';
// styles and assets
import 'bootstrap/dist/css/bootstrap.min.css';
import { Theme } from './assets/styles/Theme';
import GlobalStyles from './assets/styles/GlobalStyles';

const App = () => (
  // <div className="app">
  <Theme>
    <GlobalStyles />
    <Router>
      <AppRoutes />
    </Router>
  </Theme>
  // </div>
);

export default App;
