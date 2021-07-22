import { FC, useEffect, useMemo, useState } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "graphqlQuery/CurrentProfileQuery";
import {
  IProfilesQuery,
  IProfilesQueryVars,
  ProfilesQuery,
} from "graphqlQuery/ProfilesQuery";

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

  const { data: userProfile, loading: loadingProfile } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  const { data: profilesData, loading: loadingProfiles } = useQuery<
    IProfilesQuery,
    IProfilesQueryVars
  >(ProfilesQuery, {
    variables: {
      input: { offset: currentPageIndex, profiles_count: showCount },
    },
  });
  useEffect(() => {
    if (profilesData) {
      setTotalPages(Math.ceil(profilesData.profiles.total_count / showCount));
    }
  }, [profilesData, showCount, setTotalPages]);
  // const totalPages = useMemo(() => {
  //   if (profilesData) {
  //     return Math.ceil(profilesData.profiles.total_count / showCount);
  //   }
  //   return null;
  // }, [profilesData, showCount]);

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
            return <FullHeart height={"15px"} />;
          }
          return <Heart height={"15px"} />;
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
                  loading={loadingProfiles}
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
