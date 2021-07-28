import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { useMutation, useQuery } from "@apollo/client";
import {
  IUpdateFavoriteProfileVars,
  IUpdateFavoriteProfile,
  UpdateFavoriteProfile,
} from "graphqlMutation/UpdateFavoriteProfile";
import {
  ILeaderBoardBattinQuery,
  ILeaderBoardBattinQueryVars,
  LeaderBoardBattinQuery,
} from "graphqlQuery/LeaderBoardBattingQuery";

import { LeaderBoardFilter } from "./components/LeaderBoardFilter";
import { LeaderTableSwitcher } from "./components/LeaderTableSwitcher";
import { LeaderBoardTable } from "./components/LeaderBoardTable";
import { ReactComponent as Heart } from "asset/svg/heart_icon.svg";
import { ReactComponent as FullHeart } from "asset/svg/full_heart_icon.svg";
import { reverseLabelConverter } from "services/labelConverter";
import positionConst from "constants/positionConst";

interface ILeaderBoard {}

const LeaderBoard: FC<ILeaderBoard> = ({}) => {
  const [schoolFilter, setSchoolFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<
    "last_month" | "last_week" | null
  >(null);
  const [typeFilter, setTypeFilter] = useState<
    "exit_velocity" | "carry_distance"
  >("exit_velocity");
  const [teamFilter, setTeamFilter] = useState<string>("");
  const [positionFilter, setPositionFilter] = useState<string | null>(null);
  const [ageFilter, setAgeFilter] = useState("");
  const [favoriteFilter, setFavoriteFilter] = useState<null | 1>(null);

  const updated = () => toast.success("🦄 Success updated!");

  const {
    data: boardData,
    loading: loadingBoard,
    refetch: refetchBoard,
  } = useQuery<ILeaderBoardBattinQuery, ILeaderBoardBattinQueryVars>(
    LeaderBoardBattinQuery,
    {
      variables: {
        input: {
          school: (() => (schoolFilter.length ? schoolFilter : null))(),
          team: (() => (teamFilter.length ? teamFilter : null))(),
          age: (() => (ageFilter.length ? +ageFilter : null))(),
          favorite: favoriteFilter,
          date: dateFilter,
          type: typeFilter,
          position: reverseLabelConverter(positionFilter, positionConst),
        },
      },
    }
  );

  const [
    changeFavorite,
    { data: mutatedFavorite, loading: mutatedFavoriteLoading },
  ] = useMutation<IUpdateFavoriteProfile, IUpdateFavoriteProfileVars>(
    UpdateFavoriteProfile,
    {
      onCompleted() {
        updated();
        refetchBoard();
      },
    }
  );

  const columns = useMemo(
    () => [
      {
        Header: "Rank",
        accessor: (_: any, id: any) => id + 1,
      },
      {
        Header: "Batter Name",
        accessor: (data: any) => (
          <Link to={`/profile/${data.batter_datraks_id}`}>
            {data.batter_name}
          </Link>
        ),
      },
      {
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "School",
        accessor: (data: any) => data.school.name,
      },
      {
        Header: "Teams",
        accessor: (data: any) => {
          if (!data.teams.length) {
            return "-";
          }
          return data.teams.map((el: any) => el.name).join(", ");
        },
      },
      {
        Header: "Exit Velocity",
        accessor: (data: any) => {
          if (!data.exit_velocity) {
            return "-";
          }
          return data.exit_velocity;
        },
      },
      {
        Header: "Launch Angle",
        accessor: (data: any) => {
          if (!data.launch_angle) {
            return "-";
          }
          return data.launch_angle;
        },
      },
      {
        Header: "Distance",
        accessor: (data: any) => {
          if (!data.distance) {
            return "-";
          }
          return data.distance;
        },
      },
      {
        Header: "Favorite",
        accessor: (data: any) => {
          if (data.favorite) {
            return (
              <FullHeartStyled
                onClick={() => {
                  changeFavorite({
                    variables: {
                      form: {
                        favorite: false,
                        profile_id: data.batter_datraks_id,
                      },
                    },
                  });
                  refetchBoard();
                }}
                height={"15px"}
              />
            );
          }
          return (
            <HeartStyled
              onClick={() => {
                changeFavorite({
                  variables: {
                    form: {
                      favorite: true,
                      profile_id: data.batter_datraks_id,
                    },
                  },
                });
                refetchBoard();
              }}
              height={"15px"}
            />
          );
        },
      },
    ],
    []
  );

  let tableData = useMemo(
    () => boardData?.leaderboard_batting.leaderboard_batting,
    [boardData]
  );

  return (
    <>
      <Wrapper>
        <LeaderBoardFilter
          ageFilter={ageFilter}
          setAgeFilter={setAgeFilter}
          favoriteFilter={favoriteFilter}
          setFavoriteFilter={setFavoriteFilter}
          schoolFilter={schoolFilter}
          setSchoolFilter={setSchoolFilter}
          teamFilter={teamFilter}
          setTeamFilter={setTeamFilter}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
          positionFilter={positionFilter}
          setPositionFilter={setPositionFilter}
        />
        <LeaderTableSwitcher
          tableTypeFilter={typeFilter}
          setTableTypeFilter={setTypeFilter}
        />
        <LeaderBoardTable
          columns={columns}
          tableData={tableData}
          loadingData={loadingBoard}
        />
      </Wrapper>
    </>
  );
};

export default LeaderBoard;

const Wrapper = styled.div``;

const FullHeartStyled = styled(FullHeart)`
  cursor: pointer;
`;

const HeartStyled = styled(Heart)`
  cursor: pointer;
`;
