import { FC, useEffect } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import Select from "react-select";

import { ISchoolQuery } from "graphqlQuery/SchoolQuery";
import { ITeamsQuery } from "graphqlQuery/TeamsQuery";
import { IFacilityQuery } from "graphqlQuery/FacilityQuery";
import { ICurrentProfileQuery } from "graphqlQuery/CurrentProfileQuery";

interface ISideBarProfileChangerForm {
  profile: ICurrentProfileQuery;
  schoolData: ISchoolQuery;
  teamData: ITeamsQuery;
  facilityData: IFacilityQuery;
  setChanging: any;
}

const SideBarProfileChangerForm: FC<ISideBarProfileChangerForm> = ({
  profile,
  schoolData,
  teamData,
  facilityData,
  setChanging,
}) => {
  const schools: { value: number; label: string }[] = [];
  const teams: { value: number; label: string }[] = [];
  const facilities: { value: number; label: string }[] = [];

  const profileChangeHandler = (value: any) => {
    console.log(value);
  };

  const positions = [
    { value: "catcher", label: "Catcher" },
    { value: "first_base", label: "First Base" },
    { value: "shortstop", label: "Shortstop" },
    { value: "third_base", label: "Third Base" },
    { value: "outfield", label: "Outfield" },
    { value: "pitcher", label: "Pitcher" },
  ];

  const leftRight = [
    { value: "l", label: "L" },
    { value: "r", label: "R" },
  ];

  const schoolYear = [
    { value: "freshman", label: "Freshman" },
    { value: "sophomore", label: "Sophomore" },
    { value: "junior", label: "junior" },
    { value: "senior", label: "Senior" },
    { value: "", label: "None" },
  ];

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
  const defPosOne: any = [];
  const defPosTwo: any = [];
  const defThrow: any = [];
  const defBats: any = [];
  const defSchool: any = [];
  const defSchoolYear: any = [];
  const defTeam: any = [];
  const defFacility: any = [];
  useEffect(() => {
    console.log("Effect");

    defPosTwo.push({
      value: profile.current_profile.position,
      label: positions.filter(
        (el) => el.value === profile.current_profile.position2
      )[0].label,
    });

    defPosOne.push({
      value: profile.current_profile.position,
      label: positions.filter(
        (el) => el.value === profile.current_profile.position
      )[0].label,
    });

    defThrow.push({
      value: profile.current_profile.throws_hand,
      label: leftRight.filter(
        (el) => el.value === profile.current_profile.throws_hand
      )[0].label,
    });

    defBats.push({
      value: profile.current_profile.bats_hand,
      label: leftRight.filter(
        (el) => el.value === profile.current_profile.bats_hand
      )[0].label,
    });

    if (schools.length) {
      defSchool.push({
        value: profile.current_profile.school,
        label: schools.filter(
          (el) => el.value === profile.current_profile.school.id
        )[0].label,
      });
    }

    defSchoolYear.push({
      value: profile.current_profile.school_year,
      label: schoolYear.filter(
        (el) => el.value === profile.current_profile.school_year
      )[0].label,
    });

    if (profile.current_profile.teams.length) {
      profile.current_profile.teams.forEach((el) => {
        defTeam.push({
          value: el.id,
          label: el.name,
        });
      });
    }

    if (profile.current_profile.facilities.length) {
      profile.current_profile.facilities.forEach((el) => {
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
    defTeam,
    defFacility,
    profile,
    positions,
    leftRight,
    schools,
    schoolYear,
  ]);

  return (
    <>
      <Wrapper>
        <>
          <Form
            onSubmit={profileChangeHandler}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <TwoInputUberWrapper>
                  <Field
                    name={"firstName"}
                    defaultValue={profile.current_profile.first_name}
                  >
                    {({ input, meta }) => (
                      <TwoInputWrapper>
                        <Input {...input} placeholder={"First Name"} />
                      </TwoInputWrapper>
                    )}
                  </Field>

                  <Field
                    name={"lastName"}
                    defaultValue={profile.current_profile.last_name}
                  >
                    {({ input, meta }) => (
                      <TwoInputWrapper>
                        <Input {...input} placeholder={"Last Name"} />
                      </TwoInputWrapper>
                    )}
                  </Field>
                </TwoInputUberWrapper>

                {defPosTwo.length && (
                  <>
                    <Field name={"positionOne"} defaultValue={defPosOne}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={positions}
                            placeholder={"Position in Game"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}

                {defPosTwo.length && (
                  <>
                    <Field name={"positionTow"} defaultValue={defPosTwo}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={positions}
                            placeholder={"Secondary position in Game"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}

                <Title>Personal Info</Title>

                <OneInputWrapper>
                  <Field
                    name={"age"}
                    defaultValue={profile.current_profile.age}
                  >
                    {({ input, meta }) => (
                      <Input {...input} placeholder={"Age"} />
                    )}
                  </Field>
                </OneInputWrapper>

                <TwoInputUberWrapper>
                  <TwoInputWrapper>
                    <Field
                      name={"feet"}
                      defaultValue={profile.current_profile.feet}
                    >
                      {({ input, meta }) => (
                        <Input {...input} placeholder={"Feet"} />
                      )}
                    </Field>
                  </TwoInputWrapper>

                  <TwoInputWrapper>
                    <Field
                      name={"inches"}
                      defaultValue={profile.current_profile.inches}
                    >
                      {({ input, meta }) => (
                        <Input {...input} placeholder={"Inches"} />
                      )}
                    </Field>
                  </TwoInputWrapper>
                </TwoInputUberWrapper>

                <OneInputWrapper>
                  <Field
                    name={"wight"}
                    defaultValue={profile.current_profile.weight}
                  >
                    {({ input, meta }) => (
                      <Input {...input} placeholder={"Wight"} />
                    )}
                  </Field>
                </OneInputWrapper>

                <TwoInputUberWrapper>
                  {defThrow.length && (
                    <>
                      <Field name={"throws"} defaultValue={defThrow}>
                        {({ input, meta }) => (
                          <TwoInputWrapper>
                            <Select
                              {...input}
                              options={leftRight}
                              placeholder={"Throws"}
                            />
                          </TwoInputWrapper>
                        )}
                      </Field>
                    </>
                  )}

                  {defThrow.length && (
                    <>
                      <Field name={"bats"} defaultValue={defBats}>
                        {({ input, meta }) => (
                          <TwoInputWrapper>
                            <Select
                              {...input}
                              options={leftRight}
                              placeholder={"Bats"}
                            />
                          </TwoInputWrapper>
                        )}
                      </Field>
                    </>
                  )}
                </TwoInputUberWrapper>

                <Title>School</Title>
                {defSchool.length && (
                  <>
                    <Field name={"schools"} defaultValue={defSchool}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={schools}
                            placeholder={"School"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}
                {defSchoolYear.length && (
                  <>
                    <Field name={"schoolsYear"} defaultValue={defSchoolYear}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={schoolYear}
                            placeholder={"School Year"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}
                {defTeam.length && (
                  <>
                    <Field name={"team"} defaultValue={defTeam}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={teams}
                            isMulti={true}
                            placeholder={"Team"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}

                <Title>Facility</Title>
                {defFacility.length && (
                  <>
                    <Field name={"facility"} defaultValue={defFacility}>
                      {({ input, meta }) => (
                        <OneInputWrapper>
                          <Select
                            {...input}
                            options={facilities}
                            isMulti={true}
                            placeholder={"Facility"}
                          />
                        </OneInputWrapper>
                      )}
                    </Field>
                  </>
                )}

                <Title>About</Title>

                <Field
                  name={"biography"}
                  defaultValue={profile.current_profile.biography}
                >
                  {({ input, meta }) => (
                    <OneInputWrapper>
                      <Textarea
                        defaultValue={profile.current_profile.biography}
                        placeholder={"Description yourself"}
                      />
                    </OneInputWrapper>
                  )}
                </Field>
                <button type={"submit"}>dewew</button>
                <button
                  onClick={() => {
                    setChanging(false);
                  }}
                >
                  Close
                </button>
              </form>
            )}
          />
        </>
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

// const Selector = styled(Select)``;
