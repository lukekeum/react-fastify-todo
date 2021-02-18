import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';
import { css } from '@emotion/react';
import { useSetRecoilState } from 'recoil';

import Container from './Container';
import Input from './Input';
import Button from './Button';
import Title from './Title';

import api from '../../lib/axios';
import { signInState } from '../../atoms/auth';

interface ILoginState {
  email: string;
  password: string;
}

function Login() {
  const [LoginInput, setLoginInput] = useState<ILoginState>({
    email: '',
    password: '',
  });
  const setSignInState = useSetRecoilState(signInState);

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

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const { email, password } = LoginInput;
      if (!email)
        return toast.error('이메일을 입력해주세요', { autoClose: 3000 });
      if (!password)
        return toast.error('비밀번호를 입력해주세요', { autoClose: 3000 });

      try {
        await api.post('/api/auth/signin', { email, password });

        toast.success('성공적으로 로그인 하였습니다');

        setSignInState({
          isLoading: false,
          isSignedIn: true,
          attributes: { email },
        });
      } catch (err) {
        toast.error(err.response.data.toastify);
      }
    },
    [LoginInput, setSignInState],
  );

  return (
    <Container>
      <Title />
      <form css={formStyle} onSubmit={onSubmit}>
        <Input
          name="email"
          type="text"
          placeholder="E-mail"
          value={LoginInput.email}
          onChange={onChangeInput}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          value={LoginInput.password}
          onChange={onChangeInput}
        />
        <Button text="로그인" />
      </form>
    </Container>
  );
}

const formStyle = css`
  display: flex;
  flex-direction: column;
`;

export default Login;
