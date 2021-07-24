import { FC, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import Select from "react-select";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

import { Loading } from "../../../Loading";

interface ISideBarProfileChangerForm {
  profileData: ICurrentProfileQuery;
  schoolData: ISchoolQuery;
  teamData: ITeamsQuery;
  facilityData: IFacilityQuery;
  setChanging: any;
}

//@ts-ignore
const ReactSelectAdapter = ({ input, ...rest }) => (
  <Select {...input} {...rest} searchable />
);

//@ts-ignore
const InputAdapter = ({ input, ...rest }) => (
  <Input {...input} {...rest} searchable />
);

//@ts-ignore
const TextareaAdapter = ({ input, ...rest }) => (
  <Textarea {...input} {...rest} searchable />
);

const SideBarProfileChangerForm: FC<ISideBarProfileChangerForm> = ({
  profileData,
  schoolData,
  teamData,
  facilityData,
  setChanging,
}) => {
  const schools: { value: number; label: string }[] = [];
  const teams: { value: number; label: string }[] = [];
  const facilities: { value: number; label: string }[] = [];

  const updated = () => toast.success("🦄 Success updated!");

  const [updateProfile, { data: updatedProfileData, loading: updateLoading }] =
    useMutation<IProfileMutation, IProfileMutationVars>(ProfileMutation, {
      onCompleted() {
        updated();
        setChanging(false);
      },
    });

  type SelectFormType = { value: string; label: string };
  type SelectFormTypeWithId = { value: number; label: string };
  type ArraySelectFormType = Array<{ value: string; label: string }>;

  const profileChangeHandler = (value: {
    age: number;
    bats: SelectFormType;
    biography: string;
    facility: ArraySelectFormType;
    feet: number;
    firstName: string;
    inches: number;
    lastName: string;
    positionOne: SelectFormType;
    positionTwo: SelectFormType;
    school: SelectFormTypeWithId;
    schoolsYear: SelectFormType;
    teams: ArraySelectFormType;
    throws: SelectFormType;
    weight: number;
  }) => {
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

  const positions = useMemo(
    () => [
      { value: "catcher", label: "Catcher" },
      { value: "first_base", label: "First Base" },
      { value: "shortstop", label: "Shortstop" },
      { value: "third_base", label: "Third Base" },
      { value: "outfield", label: "Outfield" },
      { value: "pitcher", label: "Pitcher" },
    ],
    []
  );

  const leftRight = useMemo(
    () => [
      { value: "l", label: "L" },
      { value: "r", label: "R" },
    ],
    []
  );

  const schoolYear = useMemo(
    () => [
      { value: "freshman", label: "Freshman" },
      { value: "sophomore", label: "Sophomore" },
      { value: "junior", label: "Junior" },
      { value: "senior", label: "Senior" },
      { value: "", label: "None" },
    ],
    []
  );

  if (schoolData) {
    Object.keys(schoolData.schools.schools).forEach((el) => {
      schools.push({
        value: schoolData.schools.schools[+el].id,
        label: schoolData.schools.schools[+el].name,
      });
    });
  }

  if (teamData) {
    Object.keys(teamData.teams.teams).forEach((el) => {
      teams.push({
        value: teamData.teams.teams[+el].id,
        label: teamData.teams.teams[+el].name,
      });
    });
  }

  if (facilityData) {
    Object.keys(facilityData.facilities.facilities).forEach((el) => {
      facilities.push({
        value: facilityData.facilities.facilities[+el].id,
        label: facilityData.facilities.facilities[+el].u_name,
      });
    });
  }

  type DefSelectType = Array<{ value: string | number; label: string }>;

  const defPosOne: DefSelectType = useMemo(() => [], []);
  const defPosTwo: DefSelectType = useMemo(() => [], []);
  const defThrow: DefSelectType = useMemo(() => [], []);
  const defBats: DefSelectType = useMemo(() => [], []);
  const defSchool: DefSelectType = useMemo(() => [], []);
  const defSchoolYear: DefSelectType = useMemo(() => [], []);
  const defTeams: DefSelectType = useMemo(() => [], []);
  const defFacility: DefSelectType = useMemo(() => [], []);

  //TODO: Сделать функцию
  useEffect(() => {
    console.log("Effect");

    defPosTwo.push({
      value: profileData.current_profile.position,
      label: positions.filter(
        (el) => el.value === profileData.current_profile.position2
      )[0].label,
    });

    defPosOne.push({
      value: profileData.current_profile.position,
      label: positions.filter(
        (el) => el.value === profileData.current_profile.position
      )[0]?.label,
    });

    defThrow.push({
      value: profileData.current_profile.throws_hand,
      label: leftRight.filter(
        (el) => el.value === profileData.current_profile.throws_hand
      )[0]?.label,
    });

    defBats.push({
      value: profileData.current_profile.bats_hand,
      label: leftRight.filter(
        (el) => el.value === profileData.current_profile.bats_hand
      )[0].label,
    });

    if (profileData.current_profile.school.id) {
      defSchool.push({
        value: profileData.current_profile.school.id,
        label: schools.filter(
          (el) => el.value === profileData.current_profile.school.id
        )[0].label,
      });
    }
    if (profileData.current_profile.school_year) {
      defSchoolYear.push({
        value: profileData.current_profile.school_year,
        label: schoolYear.filter(
          (el) => el.value === profileData.current_profile.school_year
        )[0].label,
      });
    }

    if (profileData.current_profile.teams.length) {
      profileData.current_profile.teams.forEach((el) => {
        defTeams.push({
          value: el.id,
          label: el.name,
        });
      });
    }

    if (profileData.current_profile.facilities.length) {
      profileData.current_profile.facilities.forEach((el) => {
        defFacility.push({
          value: el.id,
          label: el.u_name,
        });
      });
    }
  }, [
    defPosOne,
    defPosTwo,
    defThrow,
    defBats,
    defSchool,
    defSchoolYear,
    defTeams,
    defFacility,
    profileData,
    positions,
    leftRight,
    schools,
    schoolYear,
  ]);

  return (
    <>
      <Wrapper>
        <ToastContainer />
        {updateLoading ? (
          <Loading />
        ) : (
          <>
            <Form
              onSubmit={profileChangeHandler}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  <TwoInputUberWrapper>
                    <TwoInputWrapper>
                      <label>First Name</label>
                      <Field
                        name={"firstName"}
                        initialValue={profileData.current_profile.first_name}
                        component={InputAdapter}
                      />
                    </TwoInputWrapper>

                    <TwoInputWrapper>
                      <label>Last Name</label>
                      <Field
                        name={"lastName"}
                        initialValue={profileData.current_profile.last_name}
                        component={InputAdapter}
                      />
                    </TwoInputWrapper>
                  </TwoInputUberWrapper>

                  {defPosTwo.length && (
                    <>
                      <OneInputWrapper>
                        <label>Position One</label>
                        <Field
                          name={"positionOne"}
                          initialValue={defPosOne}
                          component={ReactSelectAdapter}
                          options={positions}
                          placeholder={"Position in Game"}
                        />
                      </OneInputWrapper>
                    </>
                  )}

                  {defPosTwo.length && (
                    <>
                      <OneInputWrapper>
                        <label>Position Two</label>
                        <Field
                          name={"positionTwo"}
                          initialValue={defPosTwo}
                          component={ReactSelectAdapter}
                          options={positions}
                        />
                      </OneInputWrapper>
                    </>
                  )}

                  <Title>Personal Info</Title>

                  <OneInputWrapper>
                    <label>Age</label>
                    <Field<number>
                      name={"age"}
                      initialValue={profileData.current_profile.age}
                      component={InputAdapter}
                    />
                  </OneInputWrapper>

                  <TwoInputUberWrapper>
                    <TwoInputWrapper>
                      <label>Feet</label>
                      <Field
                        name={"feet"}
                        initialValue={profileData.current_profile.feet}
                        component={InputAdapter}
                      />
                    </TwoInputWrapper>

                    <TwoInputWrapper>
                      <label>Inches</label>
                      <Field
                        name={"inches"}
                        initialValue={profileData.current_profile.inches}
                        component={InputAdapter}
                      />
                    </TwoInputWrapper>
                  </TwoInputUberWrapper>

                  <OneInputWrapper>
                    <label>Weight</label>
                    <Field
                      name={"weight"}
                      initialValue={profileData.current_profile.weight}
                      component={InputAdapter}
                    />
                  </OneInputWrapper>

                  <TwoInputUberWrapper>
                    {defThrow.length && (
                      <>
                        <TwoInputWrapper>
                          <label>Throws</label>
                          <Field
                            name={"throws"}
                            initialValue={defThrow}
                            component={ReactSelectAdapter}
                            options={leftRight}
                          />
                        </TwoInputWrapper>
                      </>
                    )}

                    {defThrow.length && (
                      <>
                        <TwoInputWrapper>
                          <label>Bats</label>
                          <Field
                            name={"bats"}
                            initialValue={defBats}
                            component={ReactSelectAdapter}
                            options={leftRight}
                          />
                        </TwoInputWrapper>
                      </>
                    )}
                  </TwoInputUberWrapper>

                  <Title>School</Title>
                  {defSchool.length && (
                    <>
                      <OneInputWrapper>
                        <Field
                          name={"school"}
                          initialValue={defSchool[0]}
                          component={ReactSelectAdapter}
                          options={schools}
                        />
                      </OneInputWrapper>
                    </>
                  )}
                  {defSchoolYear.length && (
                    <>
                      <OneInputWrapper>
                        <label>School Year</label>
                        <Field
                          name={"schoolsYear"}
                          initialValue={defSchoolYear}
                          component={ReactSelectAdapter}
                          options={schoolYear}
                        />
                      </OneInputWrapper>
                    </>
                  )}
                  {defTeams.length && (
                    <>
                      <OneInputWrapper>
                        <label>Teams</label>
                        <Field
                          name={"teams"}
                          initialValue={defTeams}
                          component={ReactSelectAdapter}
                          options={teams}
                          isMulti={true}
                        />
                      </OneInputWrapper>
                    </>
                  )}

                  <Title>Facility</Title>
                  {defFacility.length && (
                    <>
                      <OneInputWrapper>
                        <Field
                          name={"facility"}
                          initialValue={defFacility}
                          component={ReactSelectAdapter}
                          options={facilities}
                          isMulti={true}
                        />
                      </OneInputWrapper>
                    </>
                  )}

                  <Title>About</Title>
                  <OneInputWrapper>
                    <Field
                      name={"biography"}
                      initialValue={profileData.current_profile.biography}
                      component={TextareaAdapter}
                      placeholder={"Description yourself"}
                    />
                  </OneInputWrapper>
                  <Buttons>
                    <SaveButton type={"submit"}>Save</SaveButton>
                    <CloseButton
                      onClick={() => {
                        setChanging(false);
                      }}
                    >
                      Close
                    </CloseButton>
                  </Buttons>
                </form>
              )}
            />
          </>
        )}
      </Wrapper>
    </>
  );
};

export default SideBarProfileChangerForm;

const Wrapper = styled.div``;

const TwoInputUberWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const TwoInputWrapper = styled.div`
  position: relative;
  flex: 0 0 48%;

  width: 48%;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

const OneInputWrapper = styled.div`
  margin-bottom: 15px;
`;
const Input = styled.input`
  background: #eff1f3;
  border-radius: 4px;
  width: 100%;
  height: 40px;
  padding: 0 16px;
  transition: all 0.2s;
  touch-action: manipulation;
  border: 1px solid transparent;
  color: #667784;
`;

const Textarea = styled.textarea`
  display: block;
  width: 100%;
  min-height: 110px;
  resize: none;
  border-radius: 4px;
  background-color: #eff1f3;
  padding: 11px 16px;
  font-size: 16px;
  line-height: 1.13;
  font-weight: 400;
  color: #667784;
  border: 1px solid transparent;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

const SaveButton = styled.button`
  height: 35px;
  border-radius: 8px;
  background: green;
  width: 45%;
`;

const CloseButton = styled.button`
  height: 35px;
  border-radius: 8px;
  background: red;
  width: 45%;
`;
