import { FC, useMemo, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  ProfileEventsQuery,
  IProfileEventsQuery,
  IProfileEventsQueryVars,
} from "graphqlQuery/ProfileEventsQuery";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SessionReportsTable from "./SessionReportsTable";

interface ISessionReports {
  userId: number;
}

const SessionReports: FC<ISessionReports> = ({ userId }) => {
  const [startDate, setStartDate] = useState(new Date());
  //@ts-ignore
  const date = Date.parse(startDate);
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();
  const dateString = day + "-" + month + "-" + year;

  const [drop, setDrop] = useState(false);

  const eventType = ["", "Game", "Practice"];
  const [eventTypeI, setEventTypeI] = useState(0);

  const { data, loading } = useQuery<
    IProfileEventsQuery,
    IProfileEventsQueryVars
  >(ProfileEventsQuery, {
    variables: {
      input: {
        profile_id: userId,
        count: 10,
        offset: 0,
        date: dateString,
        event_type: eventType[eventTypeI],
      },
    },
  });

  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Type",
        accessor: "event_type",
      },
      {
        Header: "Name",
        accessor: "event_name",
      },
      {
        Header: "Purchased",
        accessor: "purchased",
      },
    ],
    []
  );

  let tableData = useMemo(() => data?.profile_events.events, [data]);

  return (
    <>
      <Wrapper>
        {drop && <OutsideClick onClick={() => setDrop(!drop)} />}
        <FiltersWrapper>
          <ResetButton
            onClick={() => {
              setEventTypeI(0);
              setStartDate(new Date());
            }}
          >
            Clear filters
          </ResetButton>
          <Types onClick={() => setDrop(!drop)}>
            Types{" "}
            {eventType[eventTypeI].length ? `(${eventType[eventTypeI]})` : null}
            <Dropdown drop={drop}>
              <DropdownLink
                onClick={() => {
                  setEventTypeI(0);
                }}
              >
                None
              </DropdownLink>
              <DropdownLink onClick={() => setEventTypeI(1)}>Game</DropdownLink>
              <DropdownLink onClick={() => setEventTypeI(2)}>
                Practice
              </DropdownLink>
            </Dropdown>
          </Types>
          <StyledDatePicker
            dateFormat="dd-MM-yyyy"
            selected={startDate}
            //@ts-ignore
            onChange={(date) => setStartDate(date)}
          />
        </FiltersWrapper>
        <SessionReportsTable
          columns={columns}
          loading={loading}
          tableData={tableData}
        />
      </Wrapper>
    </>
  );
};

export default SessionReports;

const Wrapper = styled.div``;

const FiltersWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Types = styled.div`
  position: relative;
  margin: 0 15px;
  cursor: pointer;
  font-size: 16px;
  color: #48bbff;
`;

interface IDropdown {
  drop: boolean;
}
const Dropdown = styled.div<IDropdown>`
  display: ${(props) => (props.drop ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 100%;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  margin-top: 10px;
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

const ResetButton = styled.button`
  padding: 0;
  font-size: 16px;
  color: #48bbff;
  background: none;
`;

const StyledDatePicker = styled(DatePicker)`
  cursor: pointer;
  width: 83px;
  font-size: 16px;
  color: #48bbff;
`;
