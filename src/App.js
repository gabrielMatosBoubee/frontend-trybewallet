import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import store from './redux/store';

function App() {
  return (
    <Provider store={ store }>
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
