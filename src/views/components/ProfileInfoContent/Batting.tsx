import { FC } from "react";
import styled from "styled-components";

interface IBatting {
  contentNum: number;
}

const Batting: FC<IBatting> = ({ contentNum }) => {
  return (
    <>
      {contentNum === 1 ? <Wrapper>1-1</Wrapper> : null}
      {contentNum === 2 ? <Wrapper>1-2</Wrapper> : null}
      {contentNum === 3 ? <Wrapper>1-3</Wrapper> : null}
    </>
  );
};

export default Batting;

const Wrapper = styled.div``;
