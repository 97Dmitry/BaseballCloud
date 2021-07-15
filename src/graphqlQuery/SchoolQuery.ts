import { gql } from "@apollo/client";
export const SchoolQuery = gql`
  query Schools($search: String!) {
    schools(search: $search) {
      schools {
        id
        name
      }
    }
  }
`;

export interface ISchoolQuery {
  schools: {
    id: number;
    name: string;
  };
}

export interface ISchoolQueryVars {
  search: string;
}
