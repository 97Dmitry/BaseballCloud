import { FC } from "react";
import styled from "styled-components";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

interface IRegistration {}
const Registration: FC<IRegistration> = () => {
  return (
    <Wrapper>
      <Header />
      <Footer />
    </Wrapper>
  );
};

export default Registration;

const Wrapper = styled.div``;
