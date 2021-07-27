import { gql } from "@apollo/client";

export const BattingSummaryQuery = gql`
  query BattingSummary($id: ID!) {
    batting_summary(id: $id) {
      top_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
      average_values {
        id
        distance
        pitch_type
        launch_angle
        exit_velocity
      }
    }
  }
`;

export interface IBattingSummaryQuery {
  batting_summary: {
    top_values: Array<{
      id: number;
      distance: number;
      pitch_type: string;
      launch_angle: number;
      exit_velocity: number;
    }>;
    average_values: Array<{
      id: number;
      distance: number;
      pitch_type: string;
      launch_angle: number;
      exit_velocity: number;
    }>;
  };
}

export interface IBattingSummaryQueryVars {
  id: number;
}
