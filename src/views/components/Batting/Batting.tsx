import { FC } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";

import { Loading } from "views/components/Loading";

import BattingColumn from "./BattingColumn";
import { BattingSummary } from "graphqlQuery/BattingSummary";

interface IBatting {}

const Batting: FC<IBatting> = () => {
  const { data, loading, error } = useQuery(BattingSummary, {
    variables: { id: "157" },
  });
  return (
    <>
      <Wrapper>
        <Title>Top Batting Values</Title>
        {loading ? (
          <Loading />
        ) : (
          <Content>
            <BattingColumn title={"Exit Velocity"} load={15} />
            <BattingColumn title={"Carry Distance"} load={35} />
            <BattingColumn title={"Launch Angle"} load={75} />
          </Content>
        )}
      </Wrapper>
    </>
  );
};

export default Batting;

const Wrapper = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;
