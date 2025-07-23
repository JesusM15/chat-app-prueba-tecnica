import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import { AuthProvider, AuthContext } from './context/AuthContext';

import ChatPage from './pages/ChatPage';

const root = ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route path='/chat' component={ChatPage} />
      </Switch>
    </BrowserRouter>
  </AuthProvider>
  , document.getElementById('root'));

