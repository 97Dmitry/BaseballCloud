import { FC } from "react";
import styled from "styled-components";

import { Header } from "views/components/Header";
import { SideBar } from "views/components/SideBar";

interface IProfile {}

const Profile: FC<IProfile> = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <SideBar />
      </Wrapper>
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
`;
