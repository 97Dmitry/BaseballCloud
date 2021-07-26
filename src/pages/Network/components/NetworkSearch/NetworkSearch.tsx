import { FC } from "react";
import styled from "styled-components";

import { ReactComponent as Lupa } from "asset/svg/lupa_icon.svg";

interface INetworkSearch {
  playersCount: number;
  playerFilter: string;
  setPlayerFilter: React.Dispatch<React.SetStateAction<string>>;
}

const NetworkSearch: FC<INetworkSearch> = ({
  playersCount,
  playerFilter,
  setPlayerFilter,
}) => {
  return (
    <>
      <Wrapper>
        <PlayersCount>Available Players ({playersCount})</PlayersCount>
        <SearchWrapper>
          <InputButton>
            <span>
              <Lupa />
            </span>
          </InputButton>
          <UserSearch
            value={playerFilter}
            onChange={(event) => setPlayerFilter(event.target.value)}
            placeholder={"Player Name"}
          />
        </SearchWrapper>
      </Wrapper>
    </>
  );
};

export default NetworkSearch;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 70px;
  padding: 16px 0;
`;

const PlayersCount = styled.div`
  font-size: 18px;
`;

const SearchWrapper = styled.div`
  max-width: 250px;
  position: relative;
  display: flex;
  margin-left: 8px;
`;

const UserSearch = styled.input`
  padding-left: 25px;
  min-width: 150px;
  max-width: 175px;
  font-size: 16px;
  line-height: 19px;
  min-height: 38px;
  &::placeholder {
    color: #a3a4a5;
  }
  &:focus {
    border-bottom: 1px solid #48bbff;
    margin-bottom: -1px;
  }
`;

const InputButton = styled.button`
  padding: 0;
  position: absolute;
  background: none;

  left: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
`;
