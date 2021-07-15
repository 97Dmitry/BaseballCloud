import { FC } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";
import Select from "react-select";

import { useQuery } from "@apollo/client";
import {
  SchoolQuery,
  ISchoolQuery,
  ISchoolQueryVars,
} from "graphqlQuery/SchoolQuery";

interface ISideBarProfileChangerForm {}

const SideBarProfileChangerForm: FC<ISideBarProfileChangerForm> = ({}) => {
  const { data, loading } = useQuery<ISchoolQuery, ISchoolQueryVars>(
    SchoolQuery,
    {
      variables: { search: "" },
    }
  );

  console.log(data?.schools.schools[2].name);

  const profileChangeHandler = (value: any) => {
    console.log(value);
  };

  const position = [
    { value: "catcher", label: "Catcher" },
    { value: "first_base", label: "First Base" },
    { value: "shortstop", label: "Shortstop" },
    { value: "third_base", label: "Third Base" },
    { value: "outfield", label: "Outfield" },
    { value: "pitcher", label: "Pitcher" },
  ];

  const leftRight = [
    { value: "l", label: "L" },
    { value: "l", label: "R" },
  ];

  return (
    <>
      <Wrapper>
        <Form
          onSubmit={profileChangeHandler}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <TwoInputUberWrapper>
                <Field name={"firstName"}>
                  {({ input, meta }) => (
                    <TwoInputWrapper>
                      <Input {...input} placeholder={"First Name"} />
                    </TwoInputWrapper>
                  )}
                </Field>
                <Field name={"lastName"}>
                  {({ input, meta }) => (
                    <TwoInputWrapper>
                      <Input {...input} placeholder={"Last Name"} />
                    </TwoInputWrapper>
                  )}
                </Field>
              </TwoInputUberWrapper>
              <Field name={"positionOne"}>
                {({ input, meta }) => (
                  <OneInputWrapper>
                    <Select
                      {...input}
                      options={position}
                      placeholder={"Position in Game"}
                    />
                  </OneInputWrapper>
                )}
              </Field>
              <Field name={"positionTow"}>
                {({ input, meta }) => (
                  <OneInputWrapper>
                    <Select
                      {...input}
                      options={position}
                      placeholder={"Secondary position in Game"}
                    />
                  </OneInputWrapper>
                )}
              </Field>
              <Title>Personal Info</Title>
              <OneInputWrapper>
                <Field name={"age"}>
                  {({ input, meta }) => (
                    <Input {...input} placeholder={"Age"} />
                  )}
                </Field>
              </OneInputWrapper>
              <TwoInputUberWrapper>
                <TwoInputWrapper>
                  <Field name={"feet"}>
                    {({ input, meta }) => (
                      <Input {...input} placeholder={"Feet"} />
                    )}
                  </Field>
                </TwoInputWrapper>
                <TwoInputWrapper>
                  <Field name={"inches"}>
                    {({ input, meta }) => (
                      <Input {...input} placeholder={"Inches"} />
                    )}
                  </Field>
                </TwoInputWrapper>
              </TwoInputUberWrapper>
              <OneInputWrapper>
                <Field name={"wight"}>
                  {({ input, meta }) => (
                    <Input {...input} placeholder={"Wight"} />
                  )}
                </Field>
              </OneInputWrapper>
              <TwoInputUberWrapper>
                <Field name={"throws"}>
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
                <Field name={"bats"}>
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
              </TwoInputUberWrapper>
              <Title>School</Title>
              <button type={"submit"}>dewew</button>
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
  width: 100%;
  height: 40px;
  padding: 0 16px;
  transition: all 0.2s;
  touch-action: manipulation;
  border: 1px solid transparent;
  color: #667784;
`;

// const Selector = styled(Select)``;
