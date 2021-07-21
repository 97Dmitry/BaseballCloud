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

import { Login } from "views/containers/Login";
import { Registration } from "views/containers/Registration";
import { Profile } from "views/containers/Profile";

import RouterGuard from "utils/RouterGuard";

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
          <Wrapper>
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
            <Route path={"/login"}>
              <Login />
            </Route>
            <Route path={"/registration"}>
              <Registration />
            </Route>
          </Wrapper>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  height: 100%;
`;
