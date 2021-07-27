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

  &:disabled {
    background-color: #1a4d68;
  }
`;

export const Button = styled.div`
  padding: 8px;
  margin: 8px;
  color: #667784;
  font-weight: 700;
  border: 2px solid #667784;
  border-radius: 40px;
  cursor: pointer;

  text-align: center;

  &:hover {
    background: rgba(102, 119, 132, 0.4);
  }

  @media (max-width: 700px) {
    height: 55px;
  }
`;

export const SelectedButton = styled(Button)`
  color: white;
  background: #667784;
`;

// Dropdown

export const DropDownWrapper = styled.div`
  align-self: center;
  cursor: pointer;
  position: relative;

  color: #48bbff;
`;

interface IDropdown {
  drop: boolean;
}
export const Dropdown = styled.div<IDropdown>`
  display: ${(props) => (props.drop ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  margin-top: 10px;
  z-index: 200;
`;

export const DropdownLink = styled.p`
  cursor: pointer;
  margin: 10px 5px 5px;
`;

export const OutsideClick = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  height: 100vh;
  width: 100%;
`;
