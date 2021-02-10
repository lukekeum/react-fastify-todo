import React from 'react';
import { useRecoilValue } from 'recoil';
import { signTypeState as signTypeAtom, ESignState } from '../atoms/auth';

import LoginContainer from '../components/Sign/Login';
import RegisterContainer from '../components/Sign/Register';

function Login() {
  const signType = useRecoilValue(signTypeAtom);
  return signType === ESignState.LOGIN ? (
    <LoginContainer />
  ) : (
    <RegisterContainer />
  );
}

export default Login;
