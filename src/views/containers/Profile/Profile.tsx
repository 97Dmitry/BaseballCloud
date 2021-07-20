import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";

import { Header } from "views/components/Header";
import { Footer } from "views/components/Footer";
import { ProfileInfo } from "views/components/ProfileInfo";
import { Batting } from "views/components/Batting";
import { SessionReports } from "views/components/SessionReports";
import { SideBar } from "views/components/SideBar";
import { Loading } from "views/components/UI/Loading";

interface IProfile {}

const Profile: FC<IProfile> = () => {
  const { data, loading, error } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);
  return (
    <>
      {loading ? (
        <Loading fullScreen={true} />
      ) : (
        <Wrapper>
          {data && (
            <>
              <Header
                username={
                  data.current_profile.first_name +
                  " " +
                  data.current_profile.last_name
                }
              />
              <Content>
                <SideBar profileData={data} />
                <Info>
                  <Batting id={data.current_profile.id} />
                  <SessionReports id={data.current_profile.id} />
                  <ProfileInfo userId={data.current_profile.id} />
                </Info>
              </Content>
              <Footer />
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const Info = styled.main`
  display: flex;
  flex-direction: column;

  width: calc(100vw - 220px);

  overflow-y: auto;

  background: #788b99;
`;
