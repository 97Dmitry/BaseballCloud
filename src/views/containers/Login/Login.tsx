import { FC } from "react";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Form, Field } from "react-final-form";

import { useAppDispatch } from "store/hooks";
import { authorization } from "store/user/userSlice";

import { Footer } from "views/components/Footer";
import { Header } from "views/components/Header";
import Required, { required } from "views/components/UI/Required";

import {
  AuthContent,
  AuthFormWrapper,
  AuthInput,
  AuthSubmitButton,
} from "styles/generalStyle";

import UserIcon from "asset/svg/user_icon_for_input.svg";
import LockIcon from "asset/svg/lock_icon_for_input.svg";

interface ILogin {}
const Login: FC<ILogin> = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const error = null;
  const loginHandler = (value: { email: string; password: string }) => {
    dispatch(authorization({ email: value.email, password: value.password }));
    history.push("/profile");
  };

  return (
    <Wrapper>
      <Header />
      <AuthContent>
        <AuthFormWrapper>
          <FormContent>
            <FormTitle>
              <Title>Welcome to BaseballCloud!</Title>
              <Subtitle>Sign into your account here:</Subtitle>
            </FormTitle>
            <Form
              onSubmit={loginHandler}
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
                  {error && <p>{error}</p>}
                  <AuthSubmitButton type={"submit"}>Sing In</AuthSubmitButton>
                </form>
              )}
            />
            <ForgottenPassword>
              <Link to="#">Forgotten password?</Link>
            </ForgottenPassword>
            <SingUpLink>
              <span>Don’t have an account?</span>
              <Link to="/registration"> Sign Up</Link>
            </SingUpLink>
          </FormContent>
        </AuthFormWrapper>
      </AuthContent>
      <Footer />
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FormContent = styled.div``;

const FormTitle = styled.div`
  text-align: center;
  margin-bottom: 48px;
  color: #333;
`;
const Title = styled.div`
  font-size: 24px;
  margin-bottom: 8px;
`;
const Subtitle = styled.div``;

const InputWrapper = styled.div`
  margin-bottom: 15px;
`;

const ForgottenPassword = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 20px;

  & a {
    color: #1972bb;
  }
`;

const SingUpLink = styled.div`
  font-size: 16px;
  text-align: center;
  & a {
    color: #48bbff;
    text-decoration: underline;
  }
`;
