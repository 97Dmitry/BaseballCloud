import { FC, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { ICurrentProfileQuery } from "graphqlQuery/CurrentProfileQuery";
import {
  ProfileNames,
  IProfileNames,
  IProfileNamesVars,
} from "graphqlQuery/ProfileNamesQuery";
import {
  ProfileByIdQuery,
  IProfileByIdQuery,
  IProfileByIdQueryVars,
} from "graphqlQuery/ProfileByIdQuery";

import { ReactComponent as Lupa } from "asset/svg/lupa_icon.svg";
import { ReactComponent as DefaultProfileImg } from "asset/svg/user_profile_for_header.svg";
import { ComparsionDropDownLink } from "../ComparsionDropDownLink";

interface IComparison {
  userProfile: ICurrentProfileQuery;
}

const Comparison: FC<IComparison> = ({ userProfile }) => {
  const [nameDropDown, setNameDropDown] = useState(false);
  const [filterDropDown, setFilterDropDown] = useState(false);
  const [filterValue, setFilterValue] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUserId, setSelectedUserId] = useState(0);

  const { data: usersDataList, loading: usersDataLoading } = useQuery<
    IProfileNames,
    IProfileNamesVars
  >(ProfileNames, {
    variables: {
      input: {
        player_name: searchInput,
        position: userProfile.current_profile.position,
      },
    },
  });

  const { data: fetchedUser } = useQuery<
    IProfileByIdQuery,
    IProfileByIdQueryVars
  >(ProfileByIdQuery, { variables: { id: selectedUserId } });

  const DropDownValue = ["Distance", "Launch Angle", "Exit Velocity"];

  return (
    <>
      <Wrapper>
        {(filterDropDown || nameDropDown) && (
          <OutsideClick
            onClick={() => {
              setFilterDropDown(false);
              setNameDropDown(false);
            }}
          />
        )}
        <UserWrpper>
          <UserUnit>
            <UserImg src={userProfile.current_profile.avatar} alt={""} />
            <UserName>
              {userProfile.current_profile.first_name +
                " " +
                userProfile.current_profile.last_name}
            </UserName>
          </UserUnit>
          <UserUnit>
            {fetchedUser?.profile.avatar ? (
              <UserImg src={fetchedUser.profile.avatar} alt={""} />
            ) : (
              <DefaultProfileImg width={40} height={40} />
            )}
            <SearchWrapper>
              <UserSearch
                autoComplete={"off"}
                placeholder={"Enter player name"}
                value={searchInput}
                onChange={(event) => {
                  setSearchInput(event.target.value);
                }}
                onFocus={() => {
                  setNameDropDown(true);
                }}
              />
              <InputButton>
                <span>
                  <Lupa />
                </span>
              </InputButton>
              <Dropdown drop={nameDropDown} margin={50}>
                {usersDataList ? (
                  usersDataList.profile_names.profile_names.length ? (
                    usersDataList.profile_names.profile_names.map((el) => (
                      <ComparsionDropDownLink
                        key={el.id}
                        id={el.id}
                        setId={setSelectedUserId}
                        setInputValue={setSearchInput}
                        setDropDown={setNameDropDown}
                        text={el.first_name + " " + el.last_name}
                      />
                    ))
                  ) : (
                    <p>No data</p>
                  )
                ) : null}
              </Dropdown>
            </SearchWrapper>
          </UserUnit>
        </UserWrpper>
        <Table>
          <TableUnit>
            <div>Age: {userProfile.current_profile.age}</div>
            <div>Age: {fetchedUser ? fetchedUser.profile.age : "-"}</div>
          </TableUnit>
          <TableUnit>
            <div>
              Height:{" "}
              {userProfile.current_profile.feet +
                " ft " +
                userProfile.current_profile.inches +
                " in "}
            </div>
            <div>
              Height:{" "}
              {fetchedUser
                ? fetchedUser.profile.feet +
                  " ft " +
                  fetchedUser.profile.inches +
                  " in "
                : "-"}
            </div>
          </TableUnit>
          <TableUnit>
            <div>Weight: {userProfile.current_profile.weight + " lbs"}</div>
            <div>
              Weight: {fetchedUser ? fetchedUser.profile.weight + " lbs" : "-"}
            </div>
          </TableUnit>
          <BattingValueTable>
            <div>
              <BattingValueTableDropDown
                onClick={() => {
                  setFilterDropDown(!filterDropDown);
                }}
              >
                Top Batting Values - {DropDownValue[filterValue]}
                <Dropdown drop={filterDropDown} margin={10}>
                  {DropDownValue.map((el, id) => {
                    return (
                      <DropdownLink
                        onClick={() => {
                          setFilterValue(id);
                        }}
                        key={id}
                      >
                        {el}
                      </DropdownLink>
                    );
                  })}
                </Dropdown>
              </BattingValueTableDropDown>
            </div>
            <BattingValueTableUnitWrapper>
              <BattingValueTableUnit>
                <div>Fastball</div>
                <div>-</div>
                <div>-</div>
              </BattingValueTableUnit>
              <BattingValueTableUnit>
                <div>Curveball</div>
                <div>-</div>
                <div>-</div>
              </BattingValueTableUnit>
              <BattingValueTableUnit>
                <div>Changeup</div>
                <div>-</div>
                <div>-</div>
              </BattingValueTableUnit>
              <BattingValueTableUnit>
                <div>Slider</div>
                <div>-</div>
                <div>-</div>
              </BattingValueTableUnit>
            </BattingValueTableUnitWrapper>
          </BattingValueTable>
        </Table>
      </Wrapper>
    </>
  );
};

export default Comparison;

const Wrapper = styled.div``;

const UserWrpper = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 15px;
`;

const UserUnit = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
`;

const UserName = styled.div`
  margin-left: 8px;
`;

const UserImg = styled.img`
  object-fit: cover;

  width: 40px;
  height: 40px;
  overflow: hidden;
  border-radius: 50%;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  margin-left: 8px;
`;

const InputButton = styled.button`
  padding: 0;
  position: absolute;
  background: none;

  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;

const UserSearch = styled.input`
  width: 155px;
  font-size: 16px;
  line-height: 19px;
  min-height: 38px;
  &::placeholder {
    color: #48bbff;
  }
  &:focus {
    border-bottom: 1px solid #48bbff;
    margin-bottom: -1px;
  }
`;

const Table = styled.div``;

const TableUnit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;

  min-height: 44px;
  margin-bottom: 6px;
`;

const BattingValueTable = styled.div``;

const BattingValueTableUnitWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BattingValueTableUnit = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;

  margin-bottom: 4px;
  min-height: 44px;

  align-items: center;
  border-radius: 4px;
  background-color: #f7f8f9;

  &:hover {
    background-color: #ced7e0;
  }
`;

const BattingValueTableDropDown = styled.div`
  display: inline-block;
  position: relative;
  margin-bottom: 22px;
  color: #48bbff;
  cursor: pointer;
`;

interface IDropdown {
  drop: boolean;
  margin: number;
}
const Dropdown = styled.div<IDropdown>`
  display: ${(props) => (props.drop ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  max-height: 250px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  padding: 8px 0;
  margin-top: ${(props) => props.margin}px;
  z-index: 200;
`;

const DropdownLink = styled.p`
  cursor: pointer;
  margin: 10px 5px 5px;

  &:hover {
    background: #5888b3b5;
    color: black;
  }
`;

const OutsideClick = styled.div`
  position: absolute;
  left: 0;
  /* right: 0; */
  top: 0;
  /* bottom: 0; */
  z-index: 10;
  height: 100%;
  width: 100%;
`;
