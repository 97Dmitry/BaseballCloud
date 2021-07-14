import { FC, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useAppSelector } from "store/hooks";
import { selectorUserToken } from "store/user/userSelector";

import { ReactComponent as HeaderIcon } from "asset/svg/headerIcon.svg";
import { ReactComponent as UserProfile } from "asset/svg/user_profile_for_header.svg";

interface IHeader {
  username?: string;
}

const Header: FC<IHeader> = ({ username }) => {
  const user = useAppSelector(selectorUserToken);
  const history = useHistory();

  const [drop, setDrop] = useState(false);
  return (
    <Wrapper>
      <HeaderIcon />
      {user && (
        <RightUnit>
          <Clickable>Leaderboard</Clickable>
          <Clickable>Network</Clickable>
          <UserImg />
          <ProfileDrop onClick={() => setDrop(!drop)}>
            {username ? username : null}
            <Dropdown drop={drop}>
              <DropdownLink
                onClick={() => {
                  history.push("/profile");
                }}
              >
                Profile
              </DropdownLink>
              <DropdownLink>Logout</DropdownLink>
            </Dropdown>
          </ProfileDrop>
        </RightUnit>
      )}
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;

  border-bottom: 1px solid #979494;

  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 8px;

  @media (max-width: 650px) {
    justify-content: center;
  }
  grid-area: hd;
  grid-column-end: span 2;
`;

const RightUnit = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
`;

const Clickable = styled.div`
  margin-right: 15px;
  cursor: pointer;
`;

const UserImg = styled(UserProfile)`
  width: 32px;
  height: 32px;
  margin-right: 15px;
`;

const ProfileDrop = styled.div`
  position: relative;
  display: inline-block;
  cursor: pointer;
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
  margin-top: 20px;
  z-index: 1;
`;

const DropdownLink = styled.p`
  cursor: pointer;
  margin: 10px 5px 5px;
`;
