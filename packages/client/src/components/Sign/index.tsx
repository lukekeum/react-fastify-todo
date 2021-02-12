import React from 'react';
import { useRecoilValue } from 'recoil';
import { signTypeState, ESignState } from '../../atoms/auth';

import Login from './Login';
import Register from './Register';

function SignProvider() {
  const signTypeValue = useRecoilValue(signTypeState);
  return <>{signTypeValue === ESignState.LOGIN ? <Login /> : <Register />}</>;
}

export default SignProvider;
