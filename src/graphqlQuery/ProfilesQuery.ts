import { gql } from "@apollo/client";

export const ProfilesQuery = gql`
  query Profiles($input: FilterProfilesInput!) {
    profiles(input: $input) {
      profiles {
        id
        first_name
        last_name
        position
        position2
        school_year
        feet
        inches
        weight
        age
        events {
          id
        }
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
      total_count
    }
  }
`;

export interface IProfilesQuery {
  profiles: {
    profiles: {
      id: number;
      first_name: string;
      last_name: string;
      position: string;
      position2: string;
      school_year: string;
      feet: number;
      inches: number;
      weight: number;
      age: number;
      events: {
        id: number;
      };
      school: {
        id: number;
        name: string;
      };
      teams: {
        id: number;
        name: string;
      };
      favorite: string;
    };
    total_count: number;
  };
}

export interface IProfilesQueryVars {
  input: { profiles_count: number; offset: number };
}
