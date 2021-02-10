import React, { useState } from 'react';

import Container from './Container';
import Title from './Title';
import Input from './Input';
import Button from './Button';

interface IRegisterState {
  email: string;
  password: string;
  confirmPassword: string;
}

function Register() {
  const [RegisterInput, setRegisterInput] = useState<IRegisterState>({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.currentTarget.name) {
      case 'email':
        setRegisterInput({
          ...RegisterInput,
          email: e.currentTarget.value,
        });
        break;
      case 'password':
        setRegisterInput({
          ...RegisterInput,
          password: e.currentTarget.value,
        });
        break;
      case 'confirmPassword':
        setRegisterInput({
          ...RegisterInput,
          confirmPassword: e.currentTarget.value,
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
        value={RegisterInput.email}
        onChange={onChangeInput}
      />
      <Input
        name='password'
        type='password'
        placeholder='Password'
        value={RegisterInput.password}
        onChange={onChangeInput}
      />
      <Input
        name='confirmPassword'
        type='password'
        placeholder='Confirm password'
        value={RegisterInput.confirmPassword}
        onChange={onChangeInput}
      />
      <Button text='회원가입' />
    </Container>
  );
}

export default Register;
