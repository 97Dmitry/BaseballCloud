import { gql } from "@apollo/client";
export const ProfileEventsQuery = gql`
  query ProfileEventsQuery($input: FilterProfileEventsInput!) {
    profile_events(input: $input) {
      events {
        id
        date
        event_type
        event_name
      }
      total_count
    }
  }
`;

export interface IProfileEventsQuery {
  profile_events: {
    events: Array<{
      id: number;
      date: Array<string>;
      event_type: string;
      event_name: string;
    }>;
    total_count: number;
  };
}

export interface IProfileEventsQueryVars {
  input: {
    profile_id: number;
    count: number;
    offset: number;
    date?: string | null;
    event_type?: string;
  };
}
