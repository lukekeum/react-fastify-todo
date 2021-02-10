import React from 'react';
import { css } from '@emotion/react';

interface IContainerProps {
  children: React.ReactNode;
}

function Container({ children }: IContainerProps) {
  return <div css={ContainerStyle}>{children}</div>;
}

const ContainerStyle = css`
  display: flex;
  height: 100vh;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7f3ee;
  & input:nth-of-type(1) {
    margin-top: 0;
  }
`;

export default Container;
