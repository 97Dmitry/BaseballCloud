import { FC, useMemo, useState } from "react";
import styled from "styled-components";
import ReactPaginate from "react-paginate";

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

interface INetwork {}

const Network: FC<INetwork> = ({}) => {
  const [showCount, setShowCount] = useState(10);

  const { data: userProfile, loading: loadingProfile } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

  const [pageCount, setPageCount] = useState(0);
  const { data: profilesData, loading: loadingProfiles } = useQuery<
    IProfilesQuery,
    IProfilesQueryVars
  >(ProfilesQuery, {
    variables: { input: { offset: pageCount, profiles_count: showCount } },
  });

  let pages;
  if (profilesData) {
    pages = Math.ceil(profilesData.profiles.total_count / showCount);
  }
  console.log(pages);

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
              <NetworkFilter
                showCount={showCount}
                setShowCount={setShowCount}
              />
              {profilesData ? (
                <Content>
                  <NetworkSearch
                    playersCount={profilesData.profiles.total_count}
                  />
                  <NetworkTable
                    columns={columns}
                    tableData={tableData}
                    loading={loadingProfiles}
                  />
                </Content>
              ) : (
                <Loading />
              )}
              {pages && (
                <ReactPaginate
                  pageCount={pages}
                  pageRangeDisplayed={3}
                  marginPagesDisplayed={3}
                  previousLabel={<span>{"<<"}</span>}
                  nextLabel={<span>{">>"}</span>}
                  onPageChange={(i) => setPageCount(i.selected)}
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
  width: 100%;
`;

const Content = styled.div`
  padding: 0 16px;
`;

const Pagination = styled.div`
  display: flex !important;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 16px 0;
  position: sticky;
  bottom: 0;
`;
