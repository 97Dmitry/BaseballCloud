import { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  ProfileEventsQuery,
  IProfileEventsQuery,
  IProfileEventsQueryVars,
} from "graphqlQuery/ProfileEventsQuery";

import { Loading } from "../UI/Loading";

interface ISessionReports {
  id: number;
}

const SessionReports: FC<ISessionReports> = ({ id }) => {
  const { data, loading, error } = useQuery<
    IProfileEventsQuery,
    IProfileEventsQueryVars
  >(ProfileEventsQuery, {
    variables: { input: { profile_id: id, count: 10, offset: 0 } },
  });

  return (
    <>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Title>Recent Session Reports</Title>
            <Data>
              {data?.profile_events.total_count ? (
                data.profile_events.events.map((el, id) => {
                  return <p key={id}>{el.event_name}</p>;
                })
              ) : (
                <p>No data currently linked to this profile</p>
              )}
            </Data>
          </>
        )}
      </Wrapper>
    </>
  );
};

export default SessionReports;

const Wrapper = styled.div`
  background: #fff;
  margin: 16px;
  padding: 16px;
  border-radius: 8px;
  height: auto;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 15px;
`;

const Data = styled.div``;
