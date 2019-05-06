import React from 'react';
import Helmet from 'react-helmet';
import { Dimmer, Loader } from 'semantic-ui-react';
import MainContents from '../containers/MainContens';
import MainFooter from '../containers/MainFooter';
import MainHeader from '../containers/MainHeader';

export interface MainWindowProps {
  isPrepared: boolean;
}

export const MainWindow: React.FC<MainWindowProps> = props => {
  return (
    <>
      <Helmet>
        <title>todos</title>
      </Helmet>
      {props.isPrepared ? (
        <div>
          <MainHeader />
          <MainContents />
          <MainFooter />
        </div>
      ) : (
        <Dimmer active={true}>
          <Loader>Loading</Loader>
        </Dimmer>
      )}
    </>
  );
};
export default MainWindow;
