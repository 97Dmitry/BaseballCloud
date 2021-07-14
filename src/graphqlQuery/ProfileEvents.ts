import { gql } from "@apollo/client";
export const ProfileEvents = gql`
  query ProfileEvents($input: FilterProfileEventsInput!) {
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

export interface IProfileEvents {
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

export interface IProfileEventsVars {
  input: { profile_id: number; count: number; offset: number };
}
