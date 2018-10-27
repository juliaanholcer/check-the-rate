import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import HeaderComponent from './Components/HeaderComponent/HeaderComponent';
import FooterComponent from './Components/FooterComponent/FooterComponent';
import AuxCmp from './Components/AuxComponent/AuxComponent';
import MainComponent from './Containers/Main/Main.cnt';
import { store } from './App.store';

const App = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
          <AuxCmp>
          <HeaderComponent />
          <MainComponent  />
          <FooterComponent />
        </AuxCmp>
      </Router>
    </Provider>
  </MuiThemeProvider>
);

export default App;
