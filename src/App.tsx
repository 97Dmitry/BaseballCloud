import { FC, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import AuthProtectedRoute from "routes/AuthProtectedRoute";

// import Login from "pages/Login";
// import Registration from "pages/Registration";
// import Profile from "pages/Profile";
// import UserProfile from "pages/UserProfile";
// import Network from "pages/Network";
// import LeaderBoard from "pages/LeaderBoard";

const Login = lazy(() => import(`./pages/Login`));
const Registration = lazy(() => import(`./pages/Registration`));
const Profile = lazy(() => import(`./pages/Profile`));
const UserProfile = lazy(() => import(`./pages/UserProfile`));
const Network = lazy(() => import(`./pages/Network`));
const LeaderBoard = lazy(() => import(`./pages/LeaderBoard`));

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
        <Suspense fallback={<div>Загрузка...</div>}>
          <Switch>
            <Redirect exact from={"/"} to={"/profile"} />
            <AuthProtectedRoute
              exact
              path={"/profile"}
              component={Profile}
              auth={!!token}
            />
            <AuthProtectedRoute
              exact
              path={"/profile/:id"}
              component={UserProfile}
              auth={!!token}
            />
            <AuthProtectedRoute
              path={"/network"}
              component={Network}
              auth={!!token}
            />
            <AuthProtectedRoute
              path={"/leaderboard"}
              component={LeaderBoard}
              auth={!!token}
            />
            <Route
              path={"/login"}
              render={() => (
                <AuthLayout>
                  <Login />
                </AuthLayout>
              )}
            />
            <Route
              path={"/registration"}
              render={() => (
                <AuthLayout>
                  <Registration />
                </AuthLayout>
              )}
            />
          </Switch>
        </Suspense>
      </Router>
    </ApolloProvider>
  );
};

export default App;
