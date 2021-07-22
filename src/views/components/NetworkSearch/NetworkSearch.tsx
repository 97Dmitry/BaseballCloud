import { FC } from "react";
import styled from "styled-components";

interface INetworkSearch {
  playersCount: number;
}

const NetworkSearch: FC<INetworkSearch> = ({ playersCount }) => {
  return (
    <>
      <Wrapper>
        <PlayersCount>Available Players ({playersCount})</PlayersCount>
      </Wrapper>
    </>
  );
};

export default NetworkSearch;

const Wrapper = styled.div`
  height: 70px;
  padding: 16px 0;
`;

const PlayersCount = styled.div`
  font-size: 18px;
`;
