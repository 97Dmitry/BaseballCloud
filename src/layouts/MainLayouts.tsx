import React, { FC } from "react";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import {
  CurrentProfileQuery,
  ICurrentProfileQuery,
} from "../graphqlQuery/CurrentProfileQuery";

import { Header } from "../UIComponents/Header";
import { Footer } from "../UIComponents/Footer";
import { Loading } from "../UIComponents/Loading";

interface IMainLayout {
  children: React.ReactNode;
}

const MainLayout: FC<IMainLayout> = ({ children }) => {
  const { data, loading, error } =
    useQuery<ICurrentProfileQuery>(CurrentProfileQuery);

  return (
    <>
      <React.Fragment>
        <Wrapper>
          {data ? (
            <>
              <Header
                username={
                  data.current_profile.first_name +
                  " " +
                  data.current_profile.last_name
                }
                userAvatar={data.current_profile.avatar}
              />
              <Content>{children}</Content>
              <Footer />
            </>
          ) : (
            <Loading fullScreen={true} />
          )}
        </Wrapper>
      </React.Fragment>
    </>
  );
};

export default MainLayout;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  overflow-y: auto;
`;
