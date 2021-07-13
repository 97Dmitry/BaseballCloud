import { FC } from "react";
import { useQuery } from "@apollo/client";
import styled from "styled-components";

import { CurrentProfile } from "graphqlQuery/CurrentProfile";

import { Loading } from "../Loading";

interface ISessionReports {}

const SessionReports: FC<ISessionReports> = () => {
  const { data, loading, error } = useQuery(CurrentProfile);

  return (
    <>
      <Wrapper>
        {loading ? (
          <Loading />
        ) : (
          <>
            <Title>Recent Session Reports</Title>
            <Data>
              {data ? (
                <p>data</p>
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
