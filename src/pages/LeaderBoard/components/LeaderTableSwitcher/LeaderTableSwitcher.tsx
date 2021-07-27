import { FC, useState } from "react";
import styled from "styled-components";

import { ReactComponent as DownArrow } from "asset/svg/down-arrow.svg";
import { ReactComponent as UpArrow } from "asset/svg/up-arrow.svg";
import {
  Button,
  Dropdown,
  DropdownLink,
  DropDownWrapper,
  OutsideClick,
} from "styles/generalStyle";

interface ILeaderTableSwitcher {
  tableTypeFilter: "exit_velocity" | "carry_distance";
  setTableTypeFilter: React.Dispatch<
    React.SetStateAction<"exit_velocity" | "carry_distance">
  >;
}

const LeaderTableSwitcher: FC<ILeaderTableSwitcher> = ({
  tableTypeFilter,
  setTableTypeFilter,
}) => {
  const [showTableTypeDropDown, setShowTableTypeDropDown] = useState(false);

  const currentFilter = (() => {
    if (tableTypeFilter === "exit_velocity") return "Exit Velocity";
    return "Carry Distance";
  })();

  const Arrow = [
    <SvgWrapper>
      <DownArrow width={"17px"} height={"17px"} />
    </SvgWrapper>,
    <SvgWrapper>
      <UpArrow width={"17px"} height={"17px"} />
    </SvgWrapper>,
  ];

  return (
    <>
      <Wrapper>
        {showTableTypeDropDown && (
          <OutsideClick
            onClick={() => {
              setShowTableTypeDropDown(false);
            }}
          />
        )}
        <Buttons>
          <Button>Batting</Button>
          <Button>Pitching</Button>
        </Buttons>
        <div>
          <DropDownButton
            onClick={() => setShowTableTypeDropDown(!showTableTypeDropDown)}
          >
            {currentFilter}
            {!showTableTypeDropDown ? Arrow[0] : Arrow[1]}
            <Dropdown drop={showTableTypeDropDown}>
              <DropdownLink
                onClick={() => {
                  setTableTypeFilter("exit_velocity");
                }}
              >
                Exit Velocity
              </DropdownLink>
              <DropdownLink
                onClick={() => {
                  setTableTypeFilter("carry_distance");
                }}
              >
                Carry Distance
              </DropdownLink>
            </Dropdown>
          </DropDownButton>
        </div>
      </Wrapper>
    </>
  );
};

export default LeaderTableSwitcher;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  padding: 16px 0;
`;

const DropDownButton = styled(DropDownWrapper)`
  padding-right: 45px;
  margin-right: 20px;

  @media (max-width: 450px) {
    margin-right: 8px;
    padding: 0;
  }
`;

const SvgWrapper = styled.span`
  display: inline-block;
  padding-left: 4px;
`;

const Buttons = styled.div`
  display: flex;
`;
