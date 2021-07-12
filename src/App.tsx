import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import httpClient from "api/server";

import { useAppSelector } from "store/hooks";
import { selectorUserToken } from "store/user/userSelector";

import { Login } from "views/containers/Login";
import { Registration } from "views/containers/Registration";
import { Profile } from "views/containers/Profile";

import RouterGuard from "utils/RouterGuard";

const App: FC = () => {
  const token = useAppSelector(selectorUserToken);

  httpClient.interceptors.request.use(function (config) {
    !token && (config.headers["access-token"] = token);
    return config;
  });

  return (
    <Router>
      <Switch>
        <Wrapper>
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
          <RouterGuard
            children={
              <Route path={"/registration"}>
                <Registration />
              </Route>
            }
            auth={token ? true : false}
          />
          {/* <Route path={"/registration"}>
            <Registration />
          </Route> */}
        </Wrapper>
      </Switch>
    </Router>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`;
