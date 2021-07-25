import { FC, useMemo } from "react";
import { toast } from "react-toastify";

import { useMutation } from "@apollo/client";
import {
  ProfileMutation,
  IProfileMutation,
  IProfileMutationVars,
} from "graphqlMutation/ProfileMutation";
import { ISchoolQuery } from "graphqlQuery/SchoolQuery";
import { ITeamsQuery } from "graphqlQuery/TeamsQuery";
import { IFacilityQuery } from "graphqlQuery/FacilityQuery";
import { ICurrentProfileQuery } from "graphqlQuery/CurrentProfileQuery";

import SideBarProfileChangerForm from "./SideBarProfileChangerForm";
import IProfileChangeHandler from "interfaces/IProfileChangeHandler";
import { labelConverter, labelConverterArray } from "services/labelConverter";
import schoolYearConst from "constants/schoolYearConst";
import leftRightConst from "constants/leftRightConst";
import positionConst from "constants/positionConst";

interface ISideBarProfileChangerFormContainer {
  profileData: ICurrentProfileQuery;
  schoolData: ISchoolQuery;
  teamData: ITeamsQuery;
  facilityData: IFacilityQuery;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
}

const SideBarProfileChangerFormContainer: FC<ISideBarProfileChangerFormContainer> =
  ({ profileData, schoolData, teamData, facilityData, setChanging }) => {
    const updated = () => toast.success("🦄 Success updated!");

    const [
      updateProfile,
      { data: updatedProfileData, loading: updateLoading },
    ] = useMutation<IProfileMutation, IProfileMutationVars>(ProfileMutation, {
      onCompleted() {
        updated();
        setChanging(false);
      },
    });

    const profileChangeHandler = (value: IProfileChangeHandler) => {
      updateProfile({
        variables: {
          form: {
            id: profileData.current_profile.id,
            age: +value.age,
            bats_hand: value.bats.value,
            biography: value.biography,
            facilities: value.facility
              ? value.facility.map((el) => {
                  return { id: +el.value, u_name: el.label };
                })
              : [],
            feet: +value.feet,
            first_name: value.firstName,
            school: { id: value.school.value, name: value.school.label },
            inches: +value.inches,
            last_name: value.lastName,
            position: value.positionOne.value,
            position2: value.positionTwo.value,
            school_year: value.schoolsYear.value,
            teams: value.teams
              ? value.teams.map((el) => {
                  return { id: +el.value, name: el.label };
                })
              : [],
            throws_hand: value.throws.value,
            weight: +value.weight,
          },
        },
      });
    };

    const positions = useMemo(() => positionConst, []);
    const leftRight = useMemo(() => leftRightConst, []);
    const schoolYear = useMemo(() => schoolYearConst, []);

    type DefSelectType = Array<{ value: string | number; label: string }>;

    const schools: DefSelectType = useMemo(() => [], []);
    const teams: { value: number; label: string }[] = useMemo(() => [], []);
    const facilities: { value: number; label: string }[] = useMemo(
      () => [],
      []
    );

    labelConverterArray(schoolData.schools.schools, schools);
    labelConverterArray(teamData.teams.teams, teams);
    labelConverterArray(facilityData.facilities.facilities, facilities);

    const defPosOne: DefSelectType = useMemo(() => [], []);
    const defPosTwo: DefSelectType = useMemo(() => [], []);
    const defThrow: DefSelectType = useMemo(() => [], []);
    const defBats: DefSelectType = useMemo(() => [], []);
    const defSchool: DefSelectType = useMemo(() => [], []);
    const defSchoolYear: DefSelectType = useMemo(() => [], []);
    const defTeams: DefSelectType = useMemo(() => [], []);
    const defFacility: DefSelectType = useMemo(() => [], []);

    defPosTwo.push(
      labelConverter(profileData.current_profile.position2, positions)
    );
    defPosOne.push(
      labelConverter(profileData.current_profile.position, positions)
    );
    defThrow.push(
      labelConverter(profileData.current_profile.throws_hand, leftRight)
    );
    defBats.push(
      labelConverter(profileData.current_profile.bats_hand, leftRight)
    );
    defSchool.push(
      labelConverter(profileData.current_profile.school.id, schools)
    );
    defSchoolYear.push(
      labelConverter(profileData.current_profile.school_year, schoolYear)
    );
    labelConverterArray(profileData.current_profile.teams, defTeams);
    labelConverterArray(profileData.current_profile.facilities, defFacility);

    return (
      <SideBarProfileChangerForm
        profileChangeHandler={profileChangeHandler}
        profileData={profileData}
        setChanging={setChanging}
        sideBarFormInitialValue={{
          defPosOne,
          defPosTwo,
          defThrow,
          defBats,
          defSchool,
          defSchoolYear,
          defTeams,
          defFacility,
        }}
        facilities={facilities}
        schools={schools}
        teams={teams}
      />
    );
  };

export default SideBarProfileChangerFormContainer;
