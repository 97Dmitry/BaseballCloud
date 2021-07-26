import { FC } from "react";
import styled from "styled-components";

import { IProfileByIdQuery } from "graphqlQuery/ProfileByIdQuery";

import { ReactComponent as Age } from "asset/svg/age_icon.svg";
import { ReactComponent as Height } from "asset/svg/height_icon.svg";
import { ReactComponent as Weight } from "asset/svg/weight_icon.svg";
import { ReactComponent as Throws } from "asset/svg/throws_icon.svg";
import { ReactComponent as Bats } from "asset/svg/bats_icon.svg";
import { SideBarItem } from "./components/SideBarItem";
import { SideBarTextItem } from "./components/SideBarTextItem";

import useWindowDimensions from "hooks/useWindowDimensions";

interface ISideBarLight {
  userProfile: IProfileByIdQuery;
}

const SideBarLight: FC<ISideBarLight> = ({ userProfile }) => {
  const { width, height } = useWindowDimensions();

  return (
    <>
      <Wrapper>
        <ImgAndName>
          <ProfileImg src={userProfile.profile.avatar} />
          <Name>
            <p>
              {userProfile.profile.first_name +
                " " +
                userProfile.profile.last_name}
            </p>
          </Name>
          <Positions>
            <p>{userProfile.profile.position}</p>
            <p>{userProfile.profile.position2}</p>
          </Positions>
        </ImgAndName>
        <SideBarItem
          icon={<Age />}
          label={"Age"}
          value={userProfile.profile.age}
          width={width}
        />
        <SideBarItem
          icon={<Height />}
          label={"Height"}
          value={
            userProfile.profile.feet +
            " ft " +
            userProfile.profile.inches +
            " in"
          }
          width={width}
        />
        <SideBarItem
          icon={<Weight />}
          label={"Weight"}
          value={userProfile.profile.weight + " lbs"}
          width={width}
        />
        <SideBarItem
          icon={<Throws />}
          label={"Throws"}
          value={userProfile.profile.throws_hand}
          width={width}
        />
        <SideBarItem
          icon={<Bats />}
          label={"Bats"}
          value={userProfile.profile.bats_hand}
          width={width}
        />
        <SchoolInfo>
          {userProfile.profile.school ? (
            <SideBarTextItem
              title={"School"}
              subtitle={userProfile.profile.school.name}
              object={false}
            />
          ) : null}

          {userProfile.profile.school_year?.length ? (
            <SideBarTextItem
              title={"School Year"}
              subtitle={userProfile.profile.school_year}
              object={false}
            />
          ) : null}
          {userProfile.profile.teams?.length ? (
            <SideBarTextItem
              title={"Team"}
              subtitle={userProfile.profile.teams}
              object={true}
            />
          ) : null}

          {userProfile.profile.facilities?.length ? (
            <SideBarTextItem
              title={"Facility"}
              subtitle={userProfile.profile.facilities}
              object={true}
            />
          ) : null}
          {userProfile.profile.biography.length ? (
            <SideBarTextItem
              title={"About"}
              subtitle={userProfile.profile.biography}
              fatTitleWithLine={true}
              object={false}
            />
          ) : null}
        </SchoolInfo>
      </Wrapper>
    </>
  );
};

export default SideBarLight;

const Wrapper = styled.aside`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px;

  overflow-y: auto;

  flex: 0 0 298px;
  @media (max-width: 700px) {
    display: flex;
    flex: 0 0 auto;
  }
`;

const ImgAndName = styled.div`
  position: relative;
  @media (max-width: 700px) {
    text-align: center;
    align-items: flex-start;
  }
`;
const ProfileImg = styled.img`
  object-fit: cover;

  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #000;
  margin: 0 auto;
  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
  }
`;

const Name = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  @media (max-width: 700px) {
    word-wrap: normal;
    min-width: 150px;
  }
`;

const Positions = styled.div`
  text-align: center;
  &:last-child {
    border-top: 1px solid #cbcccd;
  }
`;

const SchoolInfo = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: 700px) {
    display: flex;
    flex-direction: row;
    align-items: flex-start;

    margin: 0 15px;
  }
`;
