import React, { useState } from 'react';

import Container from './Container';
import Input from './Input';
import Button from './Button';
import Title from './Title';

interface ILoginState {
  email: string;
  password: string;
}

function Login() {
  const [LoginInput, setLoginInput] = useState<ILoginState>({
    email: '',
    password: '',
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'email':
        setLoginInput({
          ...LoginInput,
          email: e.currentTarget.value,
        });
        break;
      case 'password':
        setLoginInput({
          ...LoginInput,
          password: e.currentTarget.value,
        });
        break;
    }
  };

  return (
    <Container>
      <Title />
      <Input
        name='email'
        type='text'
        placeholder='E-mail'
        value={LoginInput.email}
        onChange={onChangeInput}
      />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        value={LoginInput.password}
        onChange={onChangeInput}
      />
      <Button text='로그인' />
    </Container>
  );
}
export default Login;
