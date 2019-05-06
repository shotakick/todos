import React from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { Path } from '../../routes';

export interface PrivateRouteProps extends RouteProps {
  // component: React.ComponentType<RouteProps>;
  component: any;
  isAuthenticated: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = props => {
  const { isAuthenticated, component: Component, ...rest } = props;

  const render = React.useCallback(
    routeProps => {
      if (!isAuthenticated) {
        return <Redirect to={{ pathname: Path.login, state: { from: routeProps.location } }} />;
      }
      return <Component {...routeProps} />;
    },
    [isAuthenticated],
  );

  return <Route {...rest} render={render} />;
};
export default PrivateRoute;
