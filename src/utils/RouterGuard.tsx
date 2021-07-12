import { FC } from "react";
import { Route, Redirect } from "react-router-dom";

interface IGuardedRoute {
  children: React.ReactNode;
  auth: boolean;
}
const GuardedRoute: FC<IGuardedRoute> = ({ children, auth }) => (
  <Route>
    {auth === true ? children : <Redirect to="/login" push={true} />}
  </Route>
);

export default GuardedRoute;
