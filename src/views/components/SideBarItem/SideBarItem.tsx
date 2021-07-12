import { gql, useQuery } from "@apollo/client";
import { FC } from "react";
import styled from "styled-components";

interface ISideBarItem {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const SideBarItem: FC<ISideBarItem> = ({ icon, label, value }) => {
  const GEt = gql`
    query LeaderboardBatting($input: FilterProfileEventsInput!) {
      leaderboard_batting(input: $input) {
        batter_name
        exit_velocity
        launch_angle
        distance
        batter_datraks_id
        age
        school
        id
      }
    }
  `;

  const { data } = useQuery(GEt, {
    variables: { input: { profile_id: "157", count: 10, offset: 0 } },
  });
  console.log(data);
  return (
    <>
      <Wrapper>
        <LeftUnit>
          <IconWrapper>{icon}</IconWrapper> <span>{label}</span>
        </LeftUnit>
        <span>{value}</span>
      </Wrapper>
    </>
  );
};

export default SideBarItem;

const Wrapper = styled.div`
  margin-top: 15px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
`;

const LeftUnit = styled.div`
  display: flex;
  align-items: center;
  & span {
    display: inline-block;
    margin-left: 15px;
  }
`;

const IconWrapper = styled.div`
  display: flex;
  width: 25px;
  justify-content: center;
`;
