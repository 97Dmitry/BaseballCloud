import { FC } from "react";
import styled from "styled-components";

interface ISideBarItem {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  width: number;
}

const SideBarItem: FC<ISideBarItem> = ({ icon, label, value, width }) => {
  return (
    <>
      <Wrapper>
        {width < 701 ? (
          <>
            <IconWrapper>{icon}</IconWrapper>
            <TextSpan>{label}</TextSpan>
            <TextSpan>{value}</TextSpan>
          </>
        ) : (
          <>
            <LeftUnit>
              <IconWrapper>{icon}</IconWrapper> <TextSpan>{label}</TextSpan>
            </LeftUnit>
            <TextSpan>{value}</TextSpan>
          </>
        )}
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
  @media (max-width: 700px) {
    flex: 0 0 75px;
    flex-direction: column;
    justify-content: flex-start;
  }
`;

const TextSpan = styled.span`
  display: inline-block;
  padding: 5px 0;
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
  height: 25px;
  justify-content: center;
`;
