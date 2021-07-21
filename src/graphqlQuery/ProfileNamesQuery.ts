import { gql } from "@apollo/client";

export const ProfileNames = gql`
  query ProfileNames($input: FilterProfileNamesInput!) {
    profile_names(input: $input) {
      profile_names {
        id
        position
        first_name
        last_name
        inches
        feet
        weight
        age
      }
    }
  }
`;

export interface IProfileNames {
  profile_names: {
    profile_names: Array<{
      id: number;
      position: string;
      first_name: string;
      last_name: string;
      inches: string;
      feet: number;
      weight: number;
      age: number;
    }>;
  };
}

export interface IProfileNamesVars {
  input: { player_name: string; position: string };
}
