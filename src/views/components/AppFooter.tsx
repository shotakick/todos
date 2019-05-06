import React from 'react';
import { Route } from 'react-router';
import { Paths } from '../../routes';

export const AppFooter: React.FC = () => {
  const mainMessage = React.useCallback(() => <p>Double-click to edit a todo</p>, []);

  return (
    <footer className="info">
      <Route exact={true} path={Paths.main} render={mainMessage} />
      <p>Created by Kikuchi, Shotaro</p>
    </footer>
  );
};
export default AppFooter;
