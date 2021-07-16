import { FC, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";
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

interface ISideBar {}

const SideBar: FC<ISideBar> = () => {
  const [changing, setChanging] = useState(false);
  const { data, loading, error } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

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
        {loading && schoolLoading && teamLoading && facilityLoading ? (
          <Loading />
        ) : (
          data &&
          schoolData &&
          teamData &&
          facilityData &&
          (changing ? (
            <SideBarProfileChangerForm
              profile={data}
              schoolData={schoolData}
              teamData={teamData}
              facilityData={facilityData}
              setChanging={setChanging}
            />
          ) : (
            <>
              <ImgAndName>
                <ProfileImg src={data.current_profile.avatar} />
                <StyledPencil onClick={() => setChanging(true)} />
                <Name>
                  <p>
                    {data.current_profile.first_name +
                      " " +
                      data.current_profile.last_name}
                  </p>
                </Name>
                <Positions>
                  <p>{data.current_profile.position}</p>
                  <p>{data.current_profile.position2}</p>
                </Positions>
              </ImgAndName>
              <SideBarItem
                icon={<Age />}
                label={"Age"}
                value={data.current_profile.age}
              />
              <SideBarItem
                icon={<Height />}
                label={"Height"}
                value={
                  data.current_profile.feet +
                  " ft " +
                  data.current_profile.inches +
                  " in"
                }
              />
              <SideBarItem
                icon={<Weight />}
                label={"Weight"}
                value={data.current_profile.weight + " lbs"}
              />
              <SideBarItem
                icon={<Throws />}
                label={"Throws"}
                value={data.current_profile.throws_hand}
              />
              <SideBarItem
                icon={<Bats />}
                label={"Bats"}
                value={data.current_profile.bats_hand}
              />
              <SchoolInfo>
                <SideBarTextItem
                  title={"School"}
                  subtitle={data.current_profile.school.name}
                  object={false}
                />
                <SideBarTextItem
                  title={"School Year"}
                  subtitle={data.current_profile.school_year}
                  object={false}
                />
                <SideBarTextItem
                  title={"Team"}
                  subtitle={data.current_profile.teams}
                  object={true}
                />
                <SideBarTextItem
                  title={"Facility"}
                  subtitle={data.current_profile.facilities}
                  object={true}
                />
                <SideBarTextItem
                  title={"About"}
                  subtitle={data.current_profile.biography}
                  object={false}
                />
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
`;

const ImgAndName = styled.div`
  position: relative;
`;
const ProfileImg = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background: #000;
  margin: 0 auto;
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
`;
