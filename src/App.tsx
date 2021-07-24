import { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  concat,
} from "@apollo/client";

import httpClient from "api/server";

import { useAppSelector } from "store/hooks";
import { selectorUserToken } from "store/user/userSelector";

import MainLayout from "./layouts/MainLayouts";
import { Login } from "pages/Login";
import { Registration } from "pages/Registration";
import { Profile } from "pages/Profile";
import { Network } from "pages/Network";

import RouterGuard from "routes/RouterGuard";

const App: FC = () => {
  const { token, clientToken, email } = useAppSelector(selectorUserToken);
  httpClient.interceptors.request.use(function (config) {
    !token && (config.headers["access-token"] = token);
    return config;
  });

  const httpLink = createHttpLink({
    uri: "https://baseballcloud-back.herokuapp.com/api/v1/graphql",
  });

  // const authLink = setContext((_, { headers }) => {
  //   return {
  //     headers: {
  //       ...headers,
  //       Authorization: token ? `Bearer ${token}` : "",
  //       "Access-Token": token ? token : "",
  //       Client: clientToken,
  //     },
  //   };
  // });

  const authMiddleware = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        "Access-Token": token ? token : "",
        Client: clientToken,
        Uid: email,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    link: concat(authMiddleware, httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <MainLayout>
            <Route path={"/"}>
              <Redirect to={"/profile"} />
            </Route>
            <RouterGuard
              children={
                <Route path={"/profile"}>
                  <Profile />
                </Route>
              }
              auth={token ? true : false}
            />
            <RouterGuard
              children={
                <Route path={"/network"}>
                  <Network />
                </Route>
              }
              auth={token ? true : false}
            />
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/registration"}>
              <Registration />
            </Route>
          </MainLayout>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;

const Wrapper = styled.div`
  //display: flex;
  //min-height: 100vh;
  //height: 100%;
  //@media (max-width: 700px) {
  //  width: 100%;
  //  min-height: 100%;
  //}
`;
