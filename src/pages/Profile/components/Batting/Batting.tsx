import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  BattingSummaryQuery,
  IBattingSummaryQuery,
  IBattingSummaryQueryVars,
} from "graphqlQuery/BattingSummaryQuery";

import { Loading } from "UIComponents/Loading";

import BattingColumn from "./BattingColumn";

interface IBatting {
  id: number;
}

const Batting: FC<IBatting> = ({ id }) => {
  const { data, loading, error } = useQuery<
    IBattingSummaryQuery,
    IBattingSummaryQueryVars
  >(BattingSummaryQuery, {
    skip: !id,
    variables: { id: id },
  });

  return (
    <>
      <Wrapper>
        <Title>Top Batting Values</Title>
        {loading ? (
          <Loading />
        ) : (
          data && (
            <Content>
              <BattingColumn
                title={"Exit Velocity"}
                load={data.batting_summary.top_values[0]?.exit_velocity}
                value={data.batting_summary.top_values[0]?.exit_velocity}
              />
              <BattingColumn
                title={"Carry Distance"}
                load={data.batting_summary.top_values[0]?.distance}
                value={data.batting_summary.top_values[0]?.distance}
              />
              <BattingColumn
                title={"Launch Angle"}
                load={data.batting_summary.top_values[0]?.launch_angle}
                value={data.batting_summary.top_values[0]?.launch_angle}
              />
            </Content>
          )
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
