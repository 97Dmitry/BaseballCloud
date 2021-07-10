import { FC, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Field, Form } from "react-final-form";

import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Required, { required } from "../../components/UI/Required";

import {
  AuthContent,
  AuthFormWrapper,
  AuthInput,
  AuthSubmitButton,
} from "styles/generalStyle";

import UserIcon from "../../../asset/svg/user_icon_for_input.svg";
import LockIcon from "../../../asset/svg/lock_icon_for_input.svg";
import ConfirmIcon from "../../../asset/svg/confirm_icon_for_input.svg";
import { ReactComponent as ConfirmToggleIcon } from "../../../asset/svg/confirm_icon_for_toggle.svg";

interface IRegistration {}

const Registration: FC<IRegistration> = () => {
  const registrationHandler = (value: Record<string, string>) => {
    console.log(value);
  };

  const [player, setPlayer] = useState(true);
  const [scout, setScout] = useState(false);
  return (
    <Wrapper>
      <Header />
      <AuthContent>
        <AuthFormWrapper>
          <ToggleWrapper>
            <SingAsPlayer
              toggle={player}
              onClick={() => {
                setPlayer(true);
                setScout(false);
              }}
            >
              {player && <ConfirmToggleIcon />} Sign Up as Player
            </SingAsPlayer>
            <SingAsScout
              toggle={scout}
              onClick={() => {
                setPlayer(false);
                setScout(true);
              }}
            >
              {scout && <ConfirmToggleIcon />} Sign Up as Scout
            </SingAsScout>
          </ToggleWrapper>
          <Description>
            <Title>{player ? "Players" : "Scouts"}</Title>
            <Subtitle>
              {player
                ? "Players have their own profile within" +
                  " the system and plan on having data collected."
                : "Coaches and scouts can view players in the system but do not have" +
                  " their own profile."}
            </Subtitle>
          </Description>
          <Form
            onSubmit={registrationHandler}
            validate={(values) => {
              const errors = {
                confirmPassword: "",
              };
              if (values.confirm !== values.password) {
                errors.confirmPassword = "Must match";
              }
              return errors;
            }}
            render={({ handleSubmit, form }) => (
              <form onSubmit={handleSubmit}>
                <Field name={"email"} validate={required}>
                  {({ input, meta }) => (
                    <InputWrapper>
                      <AuthInput
                        {...input}
                        placeholder={"Email"}
                        bgPath={UserIcon}
                      />
                      <Required metaData={meta} />
                    </InputWrapper>
                  )}
                </Field>
                <Field name={"password"} validate={required}>
                  {({ input, meta }) => (
                    <InputWrapper>
                      <AuthInput
                        {...input}
                        type={"password"}
                        placeholder={"Password"}
                        bgPath={LockIcon}
                      />
                      <Required metaData={meta} />
                    </InputWrapper>
                  )}
                </Field>
                <Field name={"confirmPassword"}>
                  {({ input, meta }) => (
                    <InputWrapper>
                      <AuthInput
                        {...input}
                        type={"password"}
                        placeholder={"Confirm Password"}
                        bgPath={ConfirmIcon}
                      />
                      {meta.error && meta.touched && (
                        <ConfirmError>{meta.error}</ConfirmError>
                      )}
                    </InputWrapper>
                  )}
                </Field>
                <Rules>
                  By clicking Sign Up, you agree to our
                  <StyledLink to={""}> Terms of Service</StyledLink> and
                  <StyledLink to={""}> Privacy Policy</StyledLink>.
                </Rules>
                <AuthSubmitButton type={"submit"}>Sing Up</AuthSubmitButton>
              </form>
            )}
          />
          <SingInLink>
            Already registered? <StyledLink to={"/login"}>Sing In</StyledLink>
          </SingInLink>
        </AuthFormWrapper>
      </AuthContent>
      <Footer />
    </Wrapper>
  );
};

export default Registration;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

interface IToggle {
  toggle: boolean;
}

const SingAsPlayer = styled.div<IToggle>`
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
  border: 1px solid #35c32a;

  text-align: center;
  padding: 15px 5px 17px;

  width: ${(props) => (props.toggle ? "52%" : "48%")};
  background: ${(props) => (props.toggle ? "#35c32a" : "white")};
  color: ${(props) => (props.toggle ? "white" : "#35c32a")};
`;
const SingAsScout = styled.div<IToggle>`
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  border: 1px solid #35c32a;

  text-align: center;
  padding: 15px 5px 17px;

  width: ${(props) => (props.toggle ? "52%" : "48%")};
  background: ${(props) => (props.toggle ? "#35c32a" : "white")};
  color: ${(props) => (props.toggle ? "white" : "#35c32a")};
`;

const Description = styled.div`
  background: #48bbff;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
`;

const Title = styled.p`
  font-size: 36px;
  font-weight: 700;
  line-height: 0.78;
  color: #ffffff;
  margin-bottom: 21px;
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: #ffffff;
`;

const Rules = styled.div`
  margin-bottom: 8px;
  margin-top: 8px;
  padding-left: 10px;
  padding-right: 10px;

  font-size: 16px;
  line-height: 1.4;
  color: #333;

  & Link {
    color: aqua;
  }
`;

const StyledLink = styled(Link)`
  color: #459bff;
`;

const SingInLink = styled.div`
  text-align: center;
`;

const ConfirmError = styled.span`
  display: inline-block;
  font-weight: 700;
  font-size: 16px;
  color: #de3b3b;
  margin: 5px 0;
`;