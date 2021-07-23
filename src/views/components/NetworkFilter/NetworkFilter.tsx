import { FC, useState } from "react";
import styled from "styled-components";

import { ReactComponent as DownArrow } from "asset/svg/down-arrow.svg";
import { ReactComponent as UpArrow } from "asset/svg/up-arrow.svg";

interface INetworkFilter {
  showCount: number;
  setShowCount: any;

  schoolFilter: string;
  setSchoolFilter: React.Dispatch<React.SetStateAction<string>>;
  teamFilter: string;
  setTeamFilter: React.Dispatch<React.SetStateAction<string>>;
  ageFilter: string;
  setAgeFilter: React.Dispatch<React.SetStateAction<string>>;
  favoriteFilter: 1 | null;
  setFavoriteFilter: React.Dispatch<React.SetStateAction<1 | null>>;
}

const NetworkFilter: FC<INetworkFilter> = ({
  showCount,
  setShowCount,
  schoolFilter,
  setSchoolFilter,
  teamFilter,
  setTeamFilter,
  ageFilter,
  setAgeFilter,
  favoriteFilter,
  setFavoriteFilter,
}) => {
  const [showCountDropDown, setShowCountDropDown] = useState(false);
  const [showFavoriteDropDown, setShowFavoriteDropDown] = useState(false);
  const [schoolFilterDrop, setSchoolFilterDrop] = useState(false);
  const [teamFilterDrop, setTeamFilterDrop] = useState(false);
  const [ageFilterDrop, setAgeFilterDrop] = useState(false);

  const Arrow = [
    <DownArrow width={"17px"} height={"17px"} />,
    <UpArrow width={"17px"} height={"17px"} />,
  ];

  return (
    <>
      <Wrapper>
        {(showCountDropDown || showFavoriteDropDown) && (
          <OutsideClick
            onClick={() => {
              setShowCountDropDown(false);
              setShowFavoriteDropDown(false);
            }}
          />
        )}

        <Titile>Network</Titile>
        <Filters>
          {/* <FiltersUnit> */}
          <InputFilterWrapper>
            <InputFilter
              placeholder={"School"}
              value={schoolFilter}
              onChange={(event) => {
                setSchoolFilter(event.target.value);
              }}
              onFocus={() => {
                setSchoolFilterDrop(true);
              }}
              onBlur={() => {
                setSchoolFilterDrop(false);
              }}
            />
            {!schoolFilterDrop ? Arrow[0] : Arrow[1]}
          </InputFilterWrapper>
          <InputFilterWrapper>
            <InputFilter
              placeholder={"Team"}
              value={teamFilter}
              onChange={(event) => {
                setTeamFilter(event.target.value);
              }}
              onFocus={() => {
                setTeamFilterDrop(true);
              }}
              onBlur={() => {
                setTeamFilterDrop(false);
              }}
            />
            {!teamFilterDrop ? Arrow[0] : Arrow[1]}
          </InputFilterWrapper>
          <InputFilterWrapper>
            <InputFilter
              type={"number"}
              placeholder={"Age"}
              value={ageFilter}
              onChange={(event) => {
                setAgeFilter(event.target.value);
              }}
              onFocus={() => {
                setAgeFilterDrop(true);
              }}
              onBlur={() => {
                setAgeFilterDrop(false);
              }}
            />
            {!ageFilterDrop ? Arrow[0] : Arrow[1]}
          </InputFilterWrapper>
          <DropDownWrapper
            onClick={() => setShowFavoriteDropDown(!showFavoriteDropDown)}
          >
            {favoriteFilter ? "Favorite" : "All"}{" "}
            {!showFavoriteDropDown ? Arrow[0] : Arrow[1]}
            <Dropdown drop={showFavoriteDropDown}>
              <DropdownLink
                onClick={() => {
                  setFavoriteFilter(null);
                }}
              >
                All
              </DropdownLink>
              <DropdownLink
                onClick={() => {
                  setFavoriteFilter(1);
                }}
              >
                Favorite
              </DropdownLink>
            </Dropdown>
          </DropDownWrapper>
          {/* </FiltersUnit> */}
          <DropDownWrapperMargin
            onClick={() => setShowCountDropDown(!showCountDropDown)}
          >
            Show: {showCount} {!showCountDropDown ? Arrow[0] : Arrow[1]}
            <Dropdown drop={showCountDropDown}>
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
          </DropDownWrapperMargin>
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

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 450px) {
    margin-bottom: 25px;
  }
`;

const Titile = styled.h1`
  font-size: 24px;
  margin-right: 20px;
`;

const Filters = styled.div`
  display: flex;
  @media (max-width: 700px) {
    flex-flow: row wrap;
    justify-content: center;
  }
`;

// const FiltersUnit = styled.div`
//   display: flex;
//   margin-right: 28px;
// `;

const DropDownWrapper = styled.div`
  align-self: center;
  cursor: pointer;
  position: relative;

  color: #48bbff;
`;

const DropDownWrapperMargin = styled(DropDownWrapper)`
  margin-left: 20px;
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

const InputFilterWrapper = styled.div`
  width: 120px;

  align-self: center;
  margin-right: 15px;
`;
const InputFilter = styled.input`
  font-size: 16px;
  width: 100px;
  height: 100%;

  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &::placeholder {
    font-size: 16px;
    color: #48bbff;
  }
  &::focus {
    border-bottom: 2px #48bbff solid;
  }
`;
