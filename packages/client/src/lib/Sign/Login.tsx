import React from 'react';

import Container from './Container';
import Input from './Input';
import Button from './Button';
import Title from './Title';

function Login() {
  return (
    <Container>
      <Title />
      <Input type='text' placeholder='E-mail' value={''} />
      <Input type='password' placeholder='Password' value={''} />
      <Button text='로그인' />
    </Container>
  );
}
export default Login;
