import React from 'react';

import Container from './Container';
import Title from './Title';
import Input from './Input';
import Button from './Button';

function Register() {
  return (
    <Container>
      <Title />
      <Input type='text' placeholder='E-mail' value='' />
      <Input type='password' placeholder='Password' value='' />
      <Input type='password' placeholder='Confirm password' value='' />
      <Button text='회원가입' />
    </Container>
  );
}

export default Register;
