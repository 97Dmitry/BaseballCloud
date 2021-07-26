import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

import MainLayout from "../layouts/MainLayouts";

interface IGuardedRoute {
  component: FC<any>;
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
            <Component {...props} />
          </MainLayout>
        ) : (
          <Redirect to="/login" push={true} />
        )
      }
    />
  );
};

export default RouterGuard;
