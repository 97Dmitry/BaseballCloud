import { gql } from "@apollo/client";

export const BattingLogQuery = gql`
  query BattingLog($input: FilterBattingLogInput!) {
    batting_log(input: $input) {
      batting_log {
        date
        pitcher_name
        pitcher_handedness
        pitch_type
        pitch_call
        exit_velocity
        launch_angle
        direction
        distance
        hit_spin_rate
        hang_time
        pitcher_datraks_id
      }
      total_count
    }
  }
`;

export interface IBattingLogQuery {
  batting_log: {
    date: Array<string>;
    pitcher_name: string;
    pitcher_handedness: string;
    pitch_type: string;
    pitch_call: string;
    exit_velocity: number;
    launch_angle: number;
    direction: string;
    distance: number;
    hit_spin_rate: number;
    hang_time: number;
    pitcher_datraks_id: number;
  };
  total_count: number;
}

export interface IBattingLogQueryVars {
  input: string;
}
