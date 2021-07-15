import { gql } from "@apollo/client";
export const ProfileMutation = gql`
  mutation UpdateProfile($form: UpdateProfileInput!) {
    update_profile(input: $form) {
      profile {
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
        recent_events {
          id
          event_type
          event_name
          date
          recent_avatars {
            id
            first_name
            last_name
            avatar
          }
        }
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

interface IRecentEvents {
  recent_events: {
    id: number;
    event_type: string;
    event_name: string;
    date: Array<string>;
    recent_avatars: {
      id: number;
      first_name: string;
      last_name: string;
      avatar: string;
    };
  };
}

export interface IProfileMutation {
  profile: {
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
    recent_events: IRecentEvents;
    school: ISchool;
    teams: ITeams;
    facilities: IFacilities;
  };
}

export interface IProfileMutationVars {
  profile: {
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
    recent_events: IRecentEvents;
    school: ISchool;
    teams: ITeams;
    facilities: IFacilities;
  };
}
