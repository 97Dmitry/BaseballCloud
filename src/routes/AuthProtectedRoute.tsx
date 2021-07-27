import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

import MainLayout from "../layouts/MainLayouts";

interface IAuthProtectedRoute {
  component: FC<any>;
  auth: boolean;
  [x: string]: any;
}
const AuthProtectedRoute: FC<IAuthProtectedRoute> = ({
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

export default AuthProtectedRoute;
