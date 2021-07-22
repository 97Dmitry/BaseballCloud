import { FC, useState } from "react";
import styled from "styled-components";

import { ReactComponent as DownArrow } from "asset/svg/down-arrow.svg";
import { ReactComponent as UpArrow } from "asset/svg/up-arrow.svg";

interface INetworkFilter {
  showCount: number;
  setShowCount: any;
}

const NetworkFilter: FC<INetworkFilter> = ({ showCount, setShowCount }) => {
  const [dropCount, setDropCount] = useState(false);

  const Arrow = [
    <DownArrow width={"17px"} height={"17px"} />,
    <UpArrow width={"17px"} height={"17px"} />,
  ];

  return (
    <>
      <Wrapper>
        {dropCount && <OutsideClick onClick={() => setDropCount(!dropCount)} />}

        <Titile>Network</Titile>
        <Filters>
          <CountDropDown onClick={() => setDropCount(!dropCount)}>
            Show: {showCount} {!dropCount ? Arrow[0] : Arrow[1]}
            <Dropdown drop={dropCount}>
              <DropdownLink
                onClick={() => {
                  setShowCount(10);
                }}
              >
                10
              </DropdownLink>
              <DropdownLink
                onClick={() => {
                  setShowCount(15);
                }}
              >
                15
              </DropdownLink>
              <DropdownLink
                onClick={() => {
                  setShowCount(25);
                }}
              >
                25
              </DropdownLink>
            </Dropdown>
          </CountDropDown>
        </Filters>
      </Wrapper>
    </>
  );
};

export default NetworkFilter;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 16px;
`;

const Titile = styled.h1`
  font-size: 24px;
`;

const Filters = styled.div`
  display: flex;
`;

const CountDropDown = styled.div`
  justify-self: center;
  cursor: pointer;
  position: relative;

  color: #48bbff;
`;

interface IDropdown {
  drop: boolean;
}
const Dropdown = styled.div<IDropdown>`
  display: ${(props) => (props.drop ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  margin-top: 10px;
  z-index: 200;
`;

const DropdownLink = styled.p`
  cursor: pointer;
  margin: 10px 5px 5px;
`;

const OutsideClick = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
  height: 100vh;
  width: 100%;
`;
