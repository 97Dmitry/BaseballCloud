import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { CurrentProfile, ICurrentProfile } from "graphqlQuery/CurrentProfile";

import { Header } from "views/components/Header";
import { Footer } from "views/components/Footer";
import { ProfileInfo } from "views/components/ProfileInfo";
import { Batting } from "views/components/Batting";
import { SessionReports } from "views/components/SessionReports";
import { SideBar } from "views/components/SideBar";
import { Loading } from "views/components/UI/Loading";

interface IProfile {}

const Profile: FC<IProfile> = () => {
  const { data, loading, error } = useQuery<ICurrentProfile>(CurrentProfile);
  return (
    <>
      <Wrapper>
        {data ? (
          <>
            <Header
              username={
                data.current_profile.first_name +
                " " +
                data.current_profile.last_name
              }
            />
            <Content>
              <SideBar />
              <Info>
                <Batting id={data.current_profile.id} />
                <SessionReports id={data.current_profile.id} />
                <ProfileInfo />
              </Info>
            </Content>
            <Footer />
          </>
        ) : (
          <Loading />
        )}
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
  overflow: auto;
  width: calc(100vw - 220px);

  width: 100%;

  background: #788b99;
`;
