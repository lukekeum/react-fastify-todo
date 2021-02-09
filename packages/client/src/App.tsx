import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route exact path='/login'>
          <Login />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
