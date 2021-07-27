import { gql } from "@apollo/client";

export const LeaderBoardBattinQuery = gql`
  query LeaderboardBatting($input: FilterLeaderboardInput!) {
    leaderboard_batting(input: $input) {
      leaderboard_batting {
        batter_name
        exit_velocity
        launch_angle
        distance
        batter_datraks_id
        age
        school {
          id
          name
        }
        teams {
          id
          name
        }
        favorite
      }
    }
  }
`;

export interface ILeaderBoardBattinQuery {
  leaderboard_batting: {
    leaderboard_batting: {
      batter_name: string;
      exit_velocity: string;
      launch_angle: string;
      distance: string;
      batter_datraks_id: number;
      age: number;
      school: {
        id: number;
        name: string;
      };
      teams: {
        id: number;
        name: string;
      };
      favorite: boolean;
    };
  };
}

export interface ILeaderBoardBattinQueryVars {
  input: {
    type: "exit_velocity" | "carry_distance";
    school?: string | null;
    team?: string | null;
    position?: string | null;
    date?: "last_month" | "last_week" | null;
    age?: number | null;
    favorite?: 1 | null;
    player_name?: string | null;
  };
}
