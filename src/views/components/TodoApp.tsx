import React from 'react';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Path, Paths } from '../../routes';
import DetailWindow from '../containers/DetailWindow';
import LoginWindow from '../containers/LoginWindow';
import MainWindow from '../containers/MainWindow';
import PrivateRoute from '../containers/PrivateRoute';

export interface TodoAppProps {
  isAuthPrepared: boolean;
  authenticate: () => void;
}

export const TodoApp: React.FC<TodoAppProps> = props => {
  const { authenticate, isAuthPrepared } = props;

  // ブラウザリロード対策: 再認証を試みる
  React.useEffect(() => {
    if (!isAuthPrepared) authenticate();
  }, [isAuthPrepared, authenticate]);

  if (!isAuthPrepared) {
    return (
      <Dimmer active={true}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  // TODO: <Switch>使うように修正。無効ページは<Redirect>で飛ばす。
  return (
    <section className="todoapp">
      <header>
        <Link to={Path.root}>
          <h1>todos</h1>
        </Link>
      </header>
      <Route path={Path.login} component={LoginWindow} />
      <PrivateRoute exact={true} path={Paths.main} component={MainWindow} />
      <PrivateRoute exact={true} path={Path.detail} component={DetailWindow} />
    </section>
  );
};
