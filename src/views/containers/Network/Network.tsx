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

import { Loading } from "views/components/UI/Loading";
import { Header } from "views/components/Header";
import { Footer } from "views/components/Footer";
import { NetworkFilter } from "views/components/NetworkFilter";
import { NetworkSearch } from "views/components/NetworkSearch";
import { NetworkTable } from "views/components/NetworkTable";
import { ReactComponent as Heart } from "asset/svg/heart_icon.svg";
import { ReactComponent as FullHeart } from "asset/svg/full_heart_icon.svg";
import { Pagination } from "views/components/UI/Pagination";

interface INetwork {}

const Network: FC<INetwork> = ({}) => {
  const [showCount, setShowCount] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

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
      input: { offset: currentPageIndex, profiles_count: showCount },
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
              <Header
                username={
                  userProfile.current_profile.first_name +
                  " " +
                  userProfile.current_profile.last_name
                }
                userAvatar={userProfile.current_profile.avatar}
              />
              <Content>
                <NetworkFilter
                  showCount={showCount}
                  setShowCount={setShowCount}
                />
                <NetworkSearch
                  playersCount={
                    profilesData ? profilesData.profiles.total_count : 0
                  }
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
              <Footer />
            </>
          )}
        </Wrapper>
      )}
    </>
  );
};

export default Network;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const Content = styled.div`
  padding: 0 16px;
  overflow-y: auto;
`;

const FullHeartStyled = styled(FullHeart)`
  cursor: pointer;
`;

const HeartStyled = styled(Heart)`
  cursor: pointer;
`;
