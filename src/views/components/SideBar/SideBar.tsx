import { FC, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { ICurrentProfileQuery } from "graphqlQuery/CurrentProfileQuery";
import {
  SchoolQuery,
  ISchoolQuery,
  ISchoolQueryVars,
} from "graphqlQuery/SchoolQuery";
import {
  TeamsQuery,
  ITeamsQuery,
  ITeamsQueryVars,
} from "graphqlQuery/TeamsQuery";
import {
  FacilityQuery,
  IFacilityQuery,
  IFacilityQueryVars,
} from "graphqlQuery/FacilityQuery";

import { ReactComponent as Pencil } from "asset/svg/pencel_icon_for_profile.svg";
import { ReactComponent as Age } from "asset/svg/age_icon.svg";
import { ReactComponent as Height } from "asset/svg/height_icon.svg";
import { ReactComponent as Weight } from "asset/svg/weight_icon.svg";
import { ReactComponent as Throws } from "asset/svg/throws_icon.svg";
import { ReactComponent as Bats } from "asset/svg/bats_icon.svg";
import { SideBarItem } from "../SideBarItem";
import { Loading } from "../UI/Loading";
import { SideBarTextItem } from "../SideBarTextItem";
import { SideBarProfileChangerForm } from "../SideBarProfileChangerForm";

interface ISideBar {
  profileData: ICurrentProfileQuery;
}

const SideBar: FC<ISideBar> = ({ profileData }) => {
  const [changing, setChanging] = useState(false);

  const { data: schoolData, loading: schoolLoading } = useQuery<
    ISchoolQuery,
    ISchoolQueryVars
  >(SchoolQuery, {
    variables: { search: "" },
  });

  const { data: teamData, loading: teamLoading } = useQuery<
    ITeamsQuery,
    ITeamsQueryVars
  >(TeamsQuery, { variables: { search: "" } });

  const { data: facilityData, loading: facilityLoading } = useQuery<
    IFacilityQuery,
    IFacilityQueryVars
  >(FacilityQuery, {
    variables: {
      search: "",
    },
  });

  return (
    <>
      <Wrapper>
        {schoolLoading && teamLoading && facilityLoading ? (
          <Loading />
        ) : (
          schoolData &&
          teamData &&
          facilityData &&
          (changing ? (
            <SideBarProfileChangerForm
              profileData={profileData}
              schoolData={schoolData}
              teamData={teamData}
              facilityData={facilityData}
              setChanging={setChanging}
            />
          ) : (
            <>
              <ImgAndName>
                <ProfileImg src={profileData.current_profile.avatar} />
                <StyledPencil onClick={() => setChanging(true)} />
                <Name>
                  <p>
                    {profileData.current_profile.first_name +
                      " " +
                      profileData.current_profile.last_name}
                  </p>
                </Name>
                <Positions>
                  <p>{profileData.current_profile.position}</p>
                  <p>{profileData.current_profile.position2}</p>
                </Positions>
              </ImgAndName>
              <SideBarItem
                icon={<Age />}
                label={"Age"}
                value={profileData.current_profile.age}
              />
              <SideBarItem
                icon={<Height />}
                label={"Height"}
                value={
                  profileData.current_profile.feet +
                  " ft " +
                  profileData.current_profile.inches +
                  " in"
                }
              />
              <SideBarItem
                icon={<Weight />}
                label={"Weight"}
                value={profileData.current_profile.weight + " lbs"}
              />
              <SideBarItem
                icon={<Throws />}
                label={"Throws"}
                value={profileData.current_profile.throws_hand}
              />
              <SideBarItem
                icon={<Bats />}
                label={"Bats"}
                value={profileData.current_profile.bats_hand}
              />
              <SchoolInfo>
                <SideBarTextItem
                  title={"School"}
                  subtitle={profileData.current_profile.school.name}
                  object={false}
                />
                {profileData.current_profile.school_year.length ? (
                  <SideBarTextItem
                    title={"School Year"}
                    subtitle={profileData.current_profile.school_year}
                    object={false}
                  />
                ) : null}
                <SideBarTextItem
                  title={"Team"}
                  subtitle={profileData.current_profile.teams}
                  object={true}
                />
                {profileData.current_profile.facilities.length ? (
                  <SideBarTextItem
                    title={"Facility"}
                    subtitle={profileData.current_profile.facilities}
                    object={true}
                  />
                ) : null}
                {profileData.current_profile.biography.length ? (
                  <SideBarTextItem
                    title={"About"}
                    subtitle={profileData.current_profile.biography}
                    fatTitleWithLine={true}
                    object={false}
                  />
                ) : null}
              </SchoolInfo>
            </>
          ))
        )}
      </Wrapper>
    </>
  );
};

export default SideBar;

const Wrapper = styled.aside`
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 15px;

  overflow-y: auto;

  flex: 0 0 298px;
  @media (max-width: 700px) {
    display: flex;
    flex: 0 0 auto;
    /* flex-direction: column; */
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

const StyledPencil = styled(Pencil)`
  position: absolute;
  top: 10%;
  right: 10%;
  width: 32px;
  height: 32px;
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
