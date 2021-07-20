import { FC, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  ProfileEventsQuery,
  IProfileEventsQuery,
  IProfileEventsQueryVars,
} from "graphqlQuery/ProfileEventsQuery";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  console.log(dateString);

  const eventType = ["", "Game", "Practice"];
  const [eventTypeI, setEventTypeI] = useState(0);

  const { data } = useQuery<IProfileEventsQuery, IProfileEventsQueryVars>(
    ProfileEventsQuery,
    {
      variables: {
        input: {
          profile_id: userId,
          count: 10,
          offset: 0,
          date: dateString,
          event_type: eventType[eventTypeI],
        },
      },
    }
  );
  console.log(data);

  return (
    <>
      <Wrapper>
        <DatePicker
          dateFormat="dd-MM-yyyy"
          selected={startDate}
          //@ts-ignore
          onChange={(date) => setStartDate(date)}
        />
      </Wrapper>
    </>
  );
};

export default SessionReports;

const Wrapper = styled.div``;
