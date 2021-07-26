import { FC } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import { useQuery } from "@apollo/client";
import {
  ProfileByIdQuery,
  IProfileByIdQuery,
  IProfileByIdQueryVars,
} from "graphqlQuery/ProfileByIdQuery";

import { Batting } from "pages/Profile/components/Batting";
import { SessionReports } from "pages/Profile/components/SessionReports";
import { ProfileInfo } from "UIComponents/ProfileInfo";
import { SideBarLight } from "./components/SideBarLight";

interface IUserProfile {}

const UserProfile: FC<IUserProfile> = ({}) => {
  const { id } = useParams<{ id: string }>();

  const { data } = useQuery<IProfileByIdQuery, IProfileByIdQueryVars>(
    ProfileByIdQuery,
    //@ts-ignore
    { variables: { id: id + "" } }
  );

  return (
    <>
      <Wrapper>
        {data && (
          <>
            <Content>
              <SideBarLight userProfile={data} />
              <Info>
                <Batting id={data.profile.id} />
                <SessionReports id={data.profile.id} />
                <ProfileInfo
                  age={data.profile.age}
                  avatar={data.profile.avatar}
                  feet={data.profile.feet}
                  first_name={data.profile.first_name}
                  inches={data.profile.inches}
                  last_name={data.profile.last_name}
                  position={data.profile.position}
                  userId={data.profile.id}
                  weight={data.profile.weight}
                />
              </Info>
            </Content>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default UserProfile;

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
