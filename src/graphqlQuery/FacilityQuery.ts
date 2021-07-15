import { gql } from "@apollo/client";
export const FacilityQuery = gql`
  query Facilities($search: String!) {
    facilities(search: $search) {
      facilities {
        id
        email
        u_name
      }
    }
  }
`;

export interface IFacilityQuery {
  facilities: {
    id: number;
    email: string;
    u_name: string;
  };
}

export interface IFacilityQueryVars {
  search: string;
}
