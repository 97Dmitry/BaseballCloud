import { FC } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import { Login } from "./views/containers/Login";
import { Registration } from "./views/containers/Registration";

const App: FC = () => {
  return (
    <Router>
      <Switch>
        <Wrapper>
          <Route path={"/login"}>
            <Login />
          </Route>
          <Route path={"/registration"}>
            <Registration />
          </Route>
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
