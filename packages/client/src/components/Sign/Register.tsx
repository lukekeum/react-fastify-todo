import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';

import Container from './Container';
import Title from './Title';
import Input from './Input';
import Button from './Button';
import api from '../../lib/axios';

interface IRegisterState {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ISignupData {
  message: string;
  toastify?: string;
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

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { email, password, confirmPassword } = RegisterInput;
      if (!email)
        return toast.error('이메일을 입력해주세요', { autoClose: 3000 });
      if (!password)
        return toast.error('비밀번호를 입력해주세요', { autoClose: 3000 });
      if (password !== confirmPassword)
        return toast.error('비밀번호를 다시 확인해주세요', {
          autoClose: 3000,
        });

      api
        .post('/api/auth/signup', {
          email,
          password,
        })
        .then(() => {
          toast.success('성공적으로 회원가입을 하였습니다');
        })
        .catch((err) => {
          toast.error(err.response.data.toastify);
        });
    },
    [RegisterInput]
  );

  return (
    <Container>
      <Title />
      <form css={formStyle} onSubmit={onSubmit}>
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
      </form>
    </Container>
  );
}

const formStyle = css`
  display: flex;
  flex-direction: column;
`;

export default Register;
