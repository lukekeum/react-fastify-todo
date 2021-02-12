import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { signInState as signInAtom } from './atoms/auth';
import axios from 'axios';

import Main from './pages/Main';
import Login from './pages/Login';

axios.defaults.withCredentials = true;

function App() {
  const { isSignedIn } = useRecoilValue(signInAtom);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={isSignedIn ? Main : Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
