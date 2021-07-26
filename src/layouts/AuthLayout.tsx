import React, { FC } from "react";
import styled from "styled-components";

import { Header } from "../UIComponents/Header";
import { Footer } from "../UIComponents/Footer";

interface IAuthLayout {
  children: React.ReactNode;
}

const AuthLayout: FC<IAuthLayout> = ({ children }) => {
  return (
    <>
      <React.Fragment>
        <Wrapper>
          <Header />
          <Content>{children}</Content>
          <Footer />
        </Wrapper>
      </React.Fragment>
    </>
  );
};

export default AuthLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
`;
