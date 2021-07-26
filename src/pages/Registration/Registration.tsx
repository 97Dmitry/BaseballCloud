import { FC, useState } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Field, Form } from "react-final-form";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { registration, setAuthorized } from "store/user/userSlice";
import {
  selectorAuthorized,
  selectorErrors,
  selectorLoading,
} from "store/user/userSelector";

import {
  AuthContent,
  AuthFormWrapper,
  AuthInput,
  AuthSubmitButton,
} from "styles/generalStyle";

import UserIcon from "asset/svg/user_icon_for_input.svg";
import LockIcon from "asset/svg/lock_icon_for_input.svg";
import ConfirmIcon from "asset/svg/confirm_icon_for_input.svg";
import { ReactComponent as ConfirmToggleIcon } from "asset/svg/confirm_icon_for_toggle.svg";

interface IRegistration {}

const Registration: FC<IRegistration> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const loading = useAppSelector(selectorLoading);
  const errors = useAppSelector(selectorErrors);
  const authorized = useAppSelector(selectorAuthorized);

  const registrationHandler = (value: Record<string, string>) => {
    dispatch(
      registration({
        email: value.email,
        password: value.password,
        password_confirmation: value.password,
      })
    );
  };

  if (authorized) {
    setTimeout(() => {
      history.push("/profile");
    }, 100);
  }

  const [player, setPlayer] = useState(true);
  const [scout, setScout] = useState(false);
  return (
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
            const errors: Record<string, string> = {};
            if (!values.email) {
              errors.email = "Must be required";
            }
            if (!values.password) {
              errors.password = "Must be required";
            } else if (values.password.length < 8) {
              errors.password = "Must contain more than 8 characters";
            }
            if (!values.confirmPassword) {
              errors.confirmPassword = "Must be required";
            } else if (values.confirmPassword !== values.password) {
              errors.confirmPassword = "Must match";
            }
            return errors;
          }}
          render={({ handleSubmit, form }) => (
            <form onSubmit={handleSubmit}>
              <Field name={"email"}>
                {({ input, meta }) => (
                  <InputWrapper>
                    <AuthInput
                      {...input}
                      placeholder={"Email"}
                      bgPath={UserIcon}
                    />
                    {meta.error && meta.touched && (
                      <ConfirmError>{meta.error}</ConfirmError>
                    )}
                  </InputWrapper>
                )}
              </Field>
              <Field name={"password"}>
                {({ input, meta }) => (
                  <InputWrapper>
                    <AuthInput
                      {...input}
                      type={"password"}
                      placeholder={"Password"}
                      bgPath={LockIcon}
                    />
                    {meta.error && meta.touched && (
                      <ConfirmError>{meta.error}</ConfirmError>
                    )}
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
              {errors && <p>{errors}</p>}
              <Rules>
                By clicking Sign Up, you agree to our
                <StyledLink to={""}> Terms of Service</StyledLink> and
                <StyledLink to={""}> Privacy Policy</StyledLink>.
              </Rules>
              <AuthSubmitButton disabled={loading} type={"submit"}>
                Sing Up
              </AuthSubmitButton>
            </form>
          )}
        />
        <SingInLink>
          Already registered? <StyledLink to={"/login"}>Sing In</StyledLink>
        </SingInLink>
      </AuthFormWrapper>
    </AuthContent>
  );
};

export default Registration;

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
