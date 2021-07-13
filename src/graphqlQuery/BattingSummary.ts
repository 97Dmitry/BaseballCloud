import { gql } from "@apollo/client";

export const BattingSummary = gql`
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
