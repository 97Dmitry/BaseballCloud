import { FC, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "store/hooks";
import { removeUser } from "store/user/userSlice";
import { selectorUserToken } from "store/user/userSelector";

import { ReactComponent as HeaderIcon } from "asset/svg/headerIcon.svg";
import { ReactComponent as UserProfile } from "asset/svg/user_profile_for_header.svg";

interface IHeader {
  username?: string;
  userAvatar?: string;
}

const Header: FC<IHeader> = ({ username, userAvatar }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectorUserToken);
  const history = useHistory();

  const logout = () => {
    dispatch(removeUser());
  };

  const [drop, setDrop] = useState(false);
  return (
    <Wrapper>
      {drop && <OutsideClick onClick={() => setDrop(!drop)} />}
      <HeaderIcon />
      {user && (
        <RightUnit>
          <Clickable>Leaderboard</Clickable>
          <Clickable
            onClick={() => {
              history.push("/network");
            }}
          >
            Network
          </Clickable>
          {userAvatar ? <Avatar src={userAvatar} alt="" /> : <UserImg />}

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
              <DropdownLink onClick={logout}>Logout</DropdownLink>
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

const Avatar = styled.img`
  object-fit: cover;
  display: block;

  width: 32px;
  height: 32px;
  margin-right: 15px;
  border-radius: 50%;
`;
