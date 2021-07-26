import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useMutation, useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";
import {
  IProfilesQuery,
  IProfilesQueryVars,
  ProfilesQuery,
} from "graphqlQuery/ProfilesQuery";
import {
  IUpdateFavoriteProfileVars,
  IUpdateFavoriteProfile,
  UpdateFavoriteProfile,
} from "graphqlMutation/UpdateFavoriteProfile";

import { Loading } from "UIComponents/Loading";
import { NetworkFilter } from "pages/Network/components/NetworkFilter";
import { NetworkSearch } from "pages/Network/components/NetworkSearch";
import { NetworkTable } from "pages/Network/components/NetworkTable";
import { ReactComponent as Heart } from "asset/svg/heart_icon.svg";
import { ReactComponent as FullHeart } from "asset/svg/full_heart_icon.svg";
import { Pagination } from "UIComponents/Pagination";

interface INetwork {}

const Network: FC<INetwork> = ({}) => {
  const [showCount, setShowCount] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [schoolFilter, setSchoolFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [favoriteFilter, setFavoriteFilter] = useState<null | 1>(null);
  const [playerNameFilter, setPlayerNameFilter] = useState<string>("");

  const updated = () => toast.success("🦄 Success updated!");

  const { data: userProfile, loading: loadingProfile } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const {
    data: profilesData,
    loading: loadingProfiles,
    refetch: refetchProfiles,
  } = useQuery<IProfilesQuery, IProfilesQueryVars>(ProfilesQuery, {
    variables: {
      input: {
        offset: currentPageIndex,
        profiles_count: showCount,
        school: (() => (schoolFilter.length ? schoolFilter : null))(),
        team: (() => (teamFilter.length ? teamFilter : null))(),
        age: (() => (ageFilter.length ? +ageFilter : null))(),
        favorite: favoriteFilter,
        player_name: (() =>
          playerNameFilter.length ? playerNameFilter : null)(),
      },
    },
  });

  const [
    changeFavorite,
    { data: mutatedFavorite, loading: mutatedFavoriteLoading },
  ] = useMutation<IUpdateFavoriteProfile, IUpdateFavoriteProfileVars>(
    UpdateFavoriteProfile,
    {
      onCompleted() {
        updated();
        refetchProfiles();
      },
    }
  );
  useEffect(() => {
    if (profilesData) {
      setTotalPages(Math.ceil(profilesData.profiles.total_count / showCount));
    }
  }, [profilesData, showCount, setTotalPages]);

  const columns = useMemo(
    () => [
      {
        Header: "Player Name",
        accessor: (data: any) => `${data.first_name} ${data.last_name}`,
      },
      {
        Header: "Sessions",
        accessor: () => "-",
      },
      {
        Header: "School",
        accessor: (data: any) => {
          const schoolYear = [
            { value: "freshman", label: "Freshman" },
            { value: "sophomore", label: "Sophomore" },
            { value: "junior", label: "Junior" },
            { value: "senior", label: "Senior" },
          ];
          const value = schoolYear.filter(
            (el: any) => el.value === data.school_year
          )[0]?.label;
          if (value) {
            return value;
          } else {
            return "-";
          }
        },
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
        Header: "Age",
        accessor: "age",
      },
      {
        Header: "Favorite",
        accessor: (data) => {
          if (data.favorite) {
            return (
              <FullHeartStyled
                onClick={() => {
                  changeFavorite({
                    variables: {
                      form: { favorite: false, profile_id: data.id },
                    },
                  });
                  refetchProfiles();
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
                    form: { favorite: true, profile_id: data.id },
                  },
                });
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
    () => profilesData?.profiles.profiles,
    [profilesData]
  );
  return (
    <>
      {loadingProfile ? (
        <Loading fullScreen={true} />
      ) : (
        <Wrapper>
          <ToastContainer />
          {userProfile && (
            <>
              <Content>
                <NetworkFilter
                  showCount={showCount}
                  setShowCount={setShowCount}
                  schoolFilter={schoolFilter}
                  setSchoolFilter={setSchoolFilter}
                  teamFilter={teamFilter}
                  setTeamFilter={setTeamFilter}
                  ageFilter={ageFilter}
                  setAgeFilter={setAgeFilter}
                  favoriteFilter={favoriteFilter}
                  setFavoriteFilter={setFavoriteFilter}
                />
                <NetworkSearch
                  playersCount={
                    profilesData ? profilesData.profiles.total_count : 0
                  }
                  playerFilter={playerNameFilter}
                  setPlayerFilter={setPlayerNameFilter}
                />
                <NetworkTable
                  columns={columns}
                  tableData={tableData}
                  loadingData={loadingProfiles}
                />
              </Content>
              {totalPages && (
                <Pagination
                  currentIndex={currentPageIndex}
                  totalPages={totalPages}
                  setIndex={setCurrentPageIndex}
                />
              )}
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Network;

const Wrapper = styled.div``;

const Content = styled.div`
  padding: 0 16px;
  overflow-y: auto;

  @media (max-width: 700px) {
    padding: 0 5px;
  }
`;

const FullHeartStyled = styled(FullHeart)`
  cursor: pointer;
`;

const HeartStyled = styled(Heart)`
  cursor: pointer;
`;
