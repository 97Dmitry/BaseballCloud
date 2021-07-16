import { FC } from "react";
import styled from "styled-components";

interface ISideBarItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const SideBarItem: FC<ISideBarItem> = ({ icon, label, value }) => {
  return (
    <>
      <Wrapper>
        <LeftUnit>
          <IconWrapper>{icon}</IconWrapper> <span>{label}</span>
        </LeftUnit>
        <span>{value}</span>
      </Wrapper>
    </>
  );
};

export default SideBarItem;

const Wrapper = styled.div`
  padding: 16px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const LeftUnit = styled.div`
  display: flex;
  align-items: center;
  & span {
    display: inline-block;
    margin-left: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  width: 25px;
  justify-content: center;
`;
