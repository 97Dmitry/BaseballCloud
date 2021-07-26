import { FC } from "react";
import styled from "styled-components";

interface IComparsionDropDownLink {
  id: number;
  setId: any;
  setInputValue: any;
  setDropDown: any;
  text: string;
}

const ComparsionDropDownLink: FC<IComparsionDropDownLink> = ({
  id,
  setId,
  setInputValue,
  setDropDown,
  text,
}) => {
  return (
    <>
      <Wrapper
        onClick={() => {
          setId(id);
          setInputValue(text);
          setDropDown(false);
        }}
      >
        {text}
      </Wrapper>
    </>
  );
};

export default ComparsionDropDownLink;

const Wrapper = styled.div`
  cursor: pointer;
  padding: 10px 15px;
  &:hover {
    background: #5888b3b5;
  }
`;
