import { gql } from "@apollo/client";

export const CurrentProfile = gql`
  query CurrentProfile {
    current_profile {
      id
      first_name
      last_name
      position
      position2
      avatar
      throws_hand
      bats_hand
      biography
      school_year
      feet
      inches
      weight
      age
      school {
        id
        name
      }
      teams {
        id
        name
      }
      facilities {
        id
        email
        u_name
      }
    }
  }
`;

interface ISchool {
  id: number;
  name: string;
}

interface ITeams {
  id: number;
  name: string;
}

interface IFacilities {
  id: number;
  email: string;
  u_name: string;
}

export interface ICurrentProfile {
  current_profile: {
    id: number;
    first_name: string;
    last_name: string;
    position: string;
    position2: string;
    avatar: string;
    throws_hand: string;
    bats_hand: string;
    biography: string;
    school_year: string;
    feet: string;
    inches: string;
    weight: string;
    age: string;
    school: ISchool;
    teams: ITeams;
    facilities: IFacilities;
  };
}
