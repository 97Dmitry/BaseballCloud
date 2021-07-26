import { FC } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";

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

import AuthLayout from "./layouts/AuthLayout";
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
      <ToastContainer />

      <Router>
        <Switch>
          <Redirect exact from={"/"} to={"/profile"} />
          <RouterGuard path={"/profile"} component={Profile} auth={!!token} />
          <RouterGuard path={"/network"} component={Network} auth={!!token} />
          <Route
            path={"/login"}
            render={() => (
              <AuthLayout>
                <Login />
              </AuthLayout>
            )}
          ></Route>
          <Route
            path={"/registration"}
            render={() => (
              <AuthLayout>
                <Registration />
              </AuthLayout>
            )}
          ></Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
};

export default App;
