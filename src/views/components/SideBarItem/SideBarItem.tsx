import { FC } from "react";
import styled from "styled-components";

interface ISideBarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SideBarItem: FC<ISideBarItem> = ({ icon, label, value }) => {
  return (
    <>
      <Wrapper>
        <LeftUnit>
          {icon} <span>{label}</span>
        </LeftUnit>
        <span>{value}</span>
      </Wrapper>
    </>
  );
};

export default SideBarItem;

const Wrapper = styled.div`
  margin-top: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const LeftUnit = styled.div`
  display: flex;
  align-items: center;
  & span {
    margin-left: 15px;
  }
`;
