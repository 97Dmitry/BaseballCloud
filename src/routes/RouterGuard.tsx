import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

import MainLayout from "../layouts/MainLayouts";

interface IGuardedRoute {
  component: FC;
  auth: boolean;
  [x: string]: any;
}
const RouterGuard: FC<IGuardedRoute> = ({
  component: Component,
  auth,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? (
          <MainLayout>
            <Component />
          </MainLayout>
        ) : (
          <Redirect to="/login" push={true} />
        )
      }
    />
  );
};

export default RouterGuard;
