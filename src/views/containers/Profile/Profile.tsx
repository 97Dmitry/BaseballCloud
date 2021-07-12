import { FC } from "react";
import styled from "styled-components";
import { Batting } from "views/components/Batting";

import { Header } from "views/components/Header";
import { ProfileInfo } from "views/components/ProfileInfo";
import { SessionReports } from "views/components/SessionReports";
import { SideBar } from "views/components/SideBar";

interface IProfile {}

const Profile: FC<IProfile> = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Content>
          <SideBar />
          <Info>
            <Batting />
            <SessionReports />
            <ProfileInfo />
          </Info>
        </Content>
      </Wrapper>
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  width: 100%;
`;

const Content = styled.div`
  display: flex;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  background: #788b99;
`;
