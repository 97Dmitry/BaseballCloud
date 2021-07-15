import { gql } from "@apollo/client";
export const TeamsQuery = gql`
  query Teams($search: String!) {
    teams(search: $search) {
      teams {
        id
        name
      }
    }
  }
`;

export interface ITeamsQuery {
  teams: {
    id: number;
    name: string;
  };
}

export interface ITeamsQueryVars {
  search: string;
}
