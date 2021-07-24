import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";

// import { Header } from "UIComponents/Header";
// import { Footer } from "UIComponents/Footer";
import { ProfileInfo } from "./components/ProfileInfo";
import { Batting } from "./components/Batting";
import { SessionReports } from "./components/SessionReports";
import { SideBar } from "UIComponents/SideBar";

interface IProfile {}

const Profile: FC<IProfile> = () => {
  const { data, loading, error } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

  return (
    <>
      <Wrapper>
        {data && (
          <>
            <Content>
              <SideBar profileData={data} />
              <Info>
                <Batting id={data.current_profile.id} />
                <SessionReports id={data.current_profile.id} />
                <ProfileInfo userProfile={data} />
              </Info>
            </Content>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default Profile;

const Wrapper = styled.div`
  //display: flex;
  //flex-direction: column;
  //width: 100%;
  height: 100%;
  //@media (max-width: 700px) {
  //  height: 100%;
  //}
`;

const Content = styled.div`
  display: flex;
  height: 100%;
  overflow: hidden;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: column;
  }
`;

const Info = styled.main`
  display: flex;
  flex-direction: column;

  width: calc(100vw - 220px);

  overflow-y: auto;

  background: #788b99;
  @media (max-width: 700px) {
    width: 100%;
  }
`;
