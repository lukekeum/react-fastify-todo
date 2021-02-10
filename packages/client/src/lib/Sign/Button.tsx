import React from 'react';
import { css } from '@emotion/react';

interface IButtonProps {
  text: string;
}

function Button({ text }: IButtonProps) {
  return <button css={ButtonStyle}>{text}</button>;
}

const ButtonStyle = css`
  margin-top: 1.5rem;
  font-size: 1rem;
  outline: none;
  border: none;
  padding: 1.25rem 2.75rem;
  width: 18rem;
  background: #23211d;
  color: white;
  cursor: pointer;
  &:hover {
    background: #403b33;
  }
`;

export default Button;
