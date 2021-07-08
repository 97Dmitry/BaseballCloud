import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as HeaderIcon } from "asset/svg/headerIcon.svg";

interface IHeader {}

const Header: FC<IHeader> = ({}) => {
  return (
    <>
      <Wrapper>
        <HeaderIcon />
      </Wrapper>
    </>
  );
};

export default Header;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px;
`;
