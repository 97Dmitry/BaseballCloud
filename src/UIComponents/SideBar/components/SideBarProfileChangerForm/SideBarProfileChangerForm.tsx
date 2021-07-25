import { FC, useMemo } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import Select from "react-select";

import { ICurrentProfileQuery } from "graphqlQuery/CurrentProfileQuery";

import positionConst from "constants/positionConst";
import leftRightConst from "constants/leftRightConst";
import schoolYearConst from "constants/schoolYearConst";
import IProfileChangeHandler from "interfaces/IProfileChangeHandler";

interface ISideBarProfileChangerForm {
  profileData: ICurrentProfileQuery;
  sideBarFormInitialValue: any;
  facilities: any;
  teams: any;
  schools: any;
  profileChangeHandler: (value: IProfileChangeHandler) => void;
  setChanging: React.Dispatch<React.SetStateAction<boolean>>;
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
  profileChangeHandler,
  setChanging,
  sideBarFormInitialValue,
  facilities,
  schools,
  teams,
}) => {
  const positions = useMemo(() => positionConst, []);
  const leftRight = useMemo(() => leftRightConst, []);
  const schoolYear = useMemo(() => schoolYearConst, []);

  return (
    <>
      <Wrapper>
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

              {/* {defPosTwo.length && (
                <> */}
              <OneInputWrapper>
                <label>Position One</label>
                <Field
                  name={"positionOne"}
                  initialValue={sideBarFormInitialValue.defPosOne}
                  component={ReactSelectAdapter}
                  options={positions}
                  placeholder={"Position in Game"}
                />
              </OneInputWrapper>
              {/* </>
              )} */}

              {/* {defPosTwo.length && (
                <> */}
              <OneInputWrapper>
                <label>Position Two</label>
                <Field
                  name={"positionTwo"}
                  initialValue={sideBarFormInitialValue.defPosTwo}
                  component={ReactSelectAdapter}
                  options={positions}
                />
              </OneInputWrapper>
              {/* </>
              )} */}

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
                {/* {defThrow.length && (
                  <> */}
                <TwoInputWrapper>
                  <label>Throws</label>
                  <Field
                    name={"throws"}
                    initialValue={sideBarFormInitialValue.defThrow}
                    component={ReactSelectAdapter}
                    options={leftRight}
                  />
                </TwoInputWrapper>
                {/* </>
                )} */}

                {/* {defBats.length && (
                  <> */}
                <TwoInputWrapper>
                  <label>Bats</label>
                  <Field
                    name={"bats"}
                    initialValue={sideBarFormInitialValue.defBats}
                    component={ReactSelectAdapter}
                    options={leftRight}
                  />
                </TwoInputWrapper>
                {/* </>
                )} */}
              </TwoInputUberWrapper>

              <Title>School</Title>
              {/* {defSchool.length && (
                <> */}
              <OneInputWrapper>
                <Field
                  name={"school"}
                  initialValue={sideBarFormInitialValue.defSchool[0]}
                  component={ReactSelectAdapter}
                  options={schools}
                />
              </OneInputWrapper>
              {/* </>
              )} */}
              {/* {defSchoolYear.length && (
                <> */}
              <OneInputWrapper>
                <label>School Year</label>
                <Field
                  name={"schoolsYear"}
                  initialValue={sideBarFormInitialValue.defSchoolYear}
                  component={ReactSelectAdapter}
                  options={schoolYear}
                />
              </OneInputWrapper>
              {/* </>
              )} */}
              {/* {defTeams.length && (
                <> */}
              <OneInputWrapper>
                <label>Teams</label>
                <Field
                  name={"teams"}
                  initialValue={sideBarFormInitialValue.defTeams}
                  component={ReactSelectAdapter}
                  options={teams}
                  isMulti={true}
                />
              </OneInputWrapper>
              {/* </>
              )} */}

              <Title>Facility</Title>
              {/* {defFacility.length && (
                <> */}
              <OneInputWrapper>
                <Field
                  name={"facility"}
                  initialValue={sideBarFormInitialValue.defFacility}
                  component={ReactSelectAdapter}
                  options={facilities}
                  isMulti={true}
                />
              </OneInputWrapper>
              {/* </>
              )} */}

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
