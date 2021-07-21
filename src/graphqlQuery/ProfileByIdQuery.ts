import { gql } from "@apollo/client";

export const ProfileByIdQuery = gql`
  query Profile($id: String!) {
    profile(id: $id) {
      id
      first_name
      last_name
      position
      position2
      school_year
      avatar
      throws_hand
      bats_hand
      biography
      feet
      inches
      weight
      age
      recent_events {
        id
        event_type
        event_name
        date
        is_pitcher
        data_rows_count
        recent_avatars {
          id
          first_name
          last_name
          avatar
        }
      }
      winsgspan
      grip_right
      grip_left
      wrist_to_elbow
      broad_jump
      grip_left
      act_score
      gpa_score
      sat_score
      batting_top_values {
        pitch_type
        distance
        launch_angle
        exit_velocity
      }
      pitching_top_values {
        velocity
        spin_rate
        pitch_type
      }
      pitcher_summary {
        velocity
        spin_rate
        horizontal_break
      }
      batter_summary {
        exit_velocity
        distance
        launch_angle
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
      favorite
      events_opened
      paid
    }
  }
`;

export interface IProfileByIdQuery {
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
    age: number;
    recent_events: {
      id: number;
      event_type: string;
      event_name: string;
      date: string;
      is_pitcher: boolean;
      data_rows_count: number;
      recent_avatars: {
        id: number;
        first_name: string;
        last_name: string;
        avatar: string;
      };
    };
    winsgspan: string;
    grip_right: string;
    wrist_to_elbow: string;
    broad_jump: string;
    grip_left: string;
    act_score: string;
    gpa_score: string;
    sat_score: string;
    batting_top_values: {
      pitch_type: string;
      distance: string;
      launch_angle: string;
      exit_velocity: string;
    };
    pitching_top_values: {
      velocity: string;
      spin_rate: string;
      pitch_type: string;
    };
    pitcher_summary: {
      velocity: string;
      spin_rate: string;
      horizontal_break: string;
    };
    batter_summary: {
      exit_velocity: string;
      distance: string;
      launch_angle: string;
    };
    school: {
      id: number;
      name: string;
    };
    teams: {
      id: number;
      name: string;
    };
    facilities: {
      id: number;
      name: string;
      u_name: string;
    };
    favorite: string;
    events_opened: string;
    paid: string;
  };
}

export interface IProfileByIdQueryVars {
  id: number;
}
