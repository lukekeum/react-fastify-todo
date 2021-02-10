import React from 'react';
import { css } from '@emotion/react';

interface IInputProps {
  value: string;
  placeholder: string;
  type: string;
}

function Input({ type, placeholder }: IInputProps) {
  return <input type={type} css={InputStyle} placeholder={placeholder} />;
}

const InputStyle = css`
  outline: none;
  border: none;
  background-color: #d2b48c;
  padding: 1.5rem 1.5rem;
  width: 15rem;
  font-size: 1rem;
  margin-top: 2rem;
`;

export default Input;
