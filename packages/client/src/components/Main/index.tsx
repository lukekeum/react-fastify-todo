import React from "react";
import { css } from "@emotion/react";
import Todo from "../Todo";

function MainProvider() {
  return(
    <div css={MainContainer}>
      <Todo />
    </div>
  )
}

const MainContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: #f7f3ee;
  color: black;
`;

export default MainProvider;