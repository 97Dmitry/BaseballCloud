import { FC } from "react";
import styled from "styled-components";
import { Form, Field } from "react-final-form";

import { Footer } from "views/components/Footer";
import { Header } from "views/components/Header";

import background from "asset/img/AuthBack.webp";
import UserIcon from "asset/svg/user_icon_for_input.svg";
import LockIcon from "asset/svg/lock_icon_for_input.svg";

interface ILogin {}
const Login: FC<ILogin> = () => {
  const loginHandler = (value: Record<string, string>) => {
    console.log(value);
  };

  return (
    <Wrapper>
      <Header />
      <Content>
        <FormWrapper>
          <FormContent>
            <FormTitle>
              <Title>Welcome to BaseballCloud!</Title>
              <Subtitle>Sign into your account here:</Subtitle>
            </FormTitle>
            <Form
              onSubmit={loginHandler}
              render={({ handleSubmit, form }) => (
                <form onSubmit={handleSubmit}>
                  <Field name={"email"}>
                    {({ input, meta }) => (
                      <InputWrapper>
                        <Input
                          {...input}
                          placeholder={"Email"}
                          bgPath={UserIcon}
                        />
                      </InputWrapper>
                    )}
                  </Field>
                  <Field name={"password"}>
                    {({ input, meta }) => (
                      <InputWrapper>
                        <Input
                          {...input}
                          placeholder={"Password"}
                          bgPath={LockIcon}
                        />
                      </InputWrapper>
                    )}
                  </Field>
                  <SubmitButton type={"submit"}>Sing In</SubmitButton>
                </form>
              )}
            />
            <ForgottenPassword>
              <a href="#">Forgotten password?</a>
            </ForgottenPassword>
            <SingUpLink>
              <span>Don’t have an account?</span>
              <a href="#">Sign Up</a>
            </SingUpLink>
          </FormContent>
        </FormWrapper>
      </Content>
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
const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 auto;

  padding: 16px;

  background: url(${background}) 50% 50% / cover no-repeat;
`;
const FormWrapper = styled.div`
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  border-radius: 8px;
  padding: 16px;

  backdrop-filter: blur(5px);

  width: 100%;
  max-width: 450px;
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

interface IInput {
  bgPath: any;
}
const Input = styled.input<IInput>`
  background: url(${(props) => props.bgPath}) 10px 50%/ 15px 15px no-repeat;

  width: 100%;
  height: 50px;
  padding: 6px 12px 10px 37px;
  border: 1px solid transparent;
  border-radius: 4px;

  background-color: #eff1f3;

  color: #667784;
  font-size: 16px;

  &:focus {
    background-color: #fff;
    border: 1px solid #0099ff;
  }
`;

const SubmitButton = styled.button`
  color: #ffffff;
  font-size: 16px;

  box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  border: solid 1px transparent;
  background-color: #48bbff;

  padding-top: 15px;
  padding-bottom: 17px;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 100%;
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
