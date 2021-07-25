import styled from "styled-components";
import background from "../asset/img/AuthBack.webp";

export const AuthContent = styled.div`
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 16px;

  background: url(${background}) 50% 50% / cover no-repeat;
`;

export const AuthFormWrapper = styled.div`
  background: hsla(0, 0%, 100%, 0.8);
  box-shadow: 0 0 20px rgb(0 0 0 / 40%);
  border-radius: 8px;
  padding: 16px;

  backdrop-filter: blur(5px);

  width: 100%;
  max-width: 450px;
`;

interface IInput {
  bgPath: any;
}
export const AuthInput = styled.input<IInput>`
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

export const AuthSubmitButton = styled.button`
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;

  box-shadow: 0 0 4px 0 rgb(72 187 255 / 80%);
  border: solid 1px transparent;
  background-color: #48bbff;

  padding-top: 15px;
  padding-bottom: 17px;
  margin-bottom: 15px;
  border-radius: 4px;
  width: 100%;

  &:active {
    background-color: #246991;
  }
`;
