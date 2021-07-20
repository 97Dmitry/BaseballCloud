import { gql } from "@apollo/client";

export const BattingGraph = gql`
  query BattingGraph($input: FilterGraphInput!) {
    batting_graph(input: $input) {
      graph_rows
    }
  }
`;

export interface IBattingGraph {
  batting_graph: {
    batting_graph: {
      graph_rows: [];
    };
  };
}

export interface IBattingGraphVars {
  variables: { input: { profile_id: number } };
}
