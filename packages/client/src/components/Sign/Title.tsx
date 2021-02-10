import React, { useCallback } from 'react';
import { css } from '@emotion/react';
import { useRecoilState } from 'recoil';
import { signTypeState as signTypeAtom, ESignState } from '../../atoms/auth';

function Title() {
  const [signType, setSignType] = useRecoilState(signTypeAtom);

  const signTypeOther =
    signType === ESignState.LOGIN ? ESignState.REGISTER : ESignState.LOGIN;

  const onClickRegister = useCallback(() => {
    if (signType === ESignState.LOGIN) {
      setSignType(ESignState.REGISTER);
    } else {
      setSignType(ESignState.LOGIN);
    }
  }, [signType, setSignType]);

  return (
    <div css={TitleContainer}>
      <h1 css={TitleStyle}>{signType}</h1>
      <div css={OtherStyle}>
        or <span onClick={onClickRegister}>{signTypeOther}</span>
      </div>
    </div>
  );
}

const OtherStyle = css`
  margin-top: 0.25rem;
  & span {
    color: #23211d;
    cursor: pointer;
    &:hover {
      color: #60584b;
    }
  }
`;

const TitleContainer = css`
  text-align: center;
  margin-bottom: 3rem;
`;

const TitleStyle = css`
  text-transform: capitalize;
  font-size: 4rem;
  color: #60584b;
  margin: 0;
`;

export default Title;
