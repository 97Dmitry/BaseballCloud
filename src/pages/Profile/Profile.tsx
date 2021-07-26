import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";

import { ProfileInfo } from "UIComponents/ProfileInfo";
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
                <ProfileInfo
                  age={data.current_profile.age}
                  avatar={data.current_profile.avatar}
                  feet={data.current_profile.feet}
                  first_name={data.current_profile.first_name}
                  inches={data.current_profile.inches}
                  last_name={data.current_profile.last_name}
                  position={data.current_profile.position}
                  weight={data.current_profile.weight}
                  userId={data.current_profile.id}
                />
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
  height: 100%;
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
