import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  BattingLogQuery,
  IBattingLogQuery,
  IBattingLogQueryVars,
} from "graphqlQuery/BattingLogQuery";

import { BattingTable } from "views/components/BattingTable";
import { ReactComponent as Lupa } from "asset/svg/lupa_icon.svg";

interface IBatting {
  contentNum: number;
  userId: number;
}

const Batting: FC<IBatting> = ({ contentNum, userId }) => {
  const [inputData, setInputData] = useState("");
  const { data, loading } = useQuery<IBattingLogQuery, IBattingLogQueryVars>(
    BattingLogQuery,
    {
      variables: {
        input: {
          profile_id: userId,
          count: 10,
          offset: 0,
          pitcher_name: inputData,
        },
      },
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Pitcher Name",
        accessor: "pitcher_name",
      },
      {
        Header: "Pitcher Handedness",
        accessor: "pitcher_handedness",
      },
      {
        Header: "Pitch Type",
        accessor: "pitch_type",
      },
      {
        Header: "Pitch Call",
        accessor: "pitch_call",
      },
    ],
    []
  );

  let tableData = useMemo(() => data?.batting_log.batting_log, [data]);

  return (
    <>
      {contentNum === 1 ? (
        <Wrapper>
          <NoData>There's no info yet!</NoData>
        </Wrapper>
      ) : null}
      {contentNum === 2 ? (
        <Wrapper>
          <NoData>There's no info yet!</NoData>
        </Wrapper>
      ) : null}
      {contentNum === 3 ? (
        <>
          <InputWrapper>
            <InputButton>
              <span>
                <Lupa />
              </span>
            </InputButton>

            <Input
              placeholder={"Search"}
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
          </InputWrapper>
          {/* {tableData ? (
            <> */}
          <BattingTable
            columns={columns}
            tableData={tableData}
            loading={loading}
          />
          {/* </>
          ) : (
            <Loading />
          )} */}
        </>
      ) : null}
    </>
  );
};

export default Batting;

const Wrapper = styled.div``;

const NoData = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  min-height: 300px;
  height: 100%;
  color: #667784;
  font-size: 16px;
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
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

const Input = styled.input`
  display: block;
  width: 200px;
  padding: 5px 5px 5px 24px;
  font-size: 16px;
  line-height: 19px;
  font-weight: 400;
  color: #788b99;
  border-bottom: 1px solid #48bbff;
`;
