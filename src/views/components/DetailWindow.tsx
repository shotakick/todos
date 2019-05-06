import React from 'react';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router';
import { Dimmer, Divider, Header, List, Loader, Segment } from 'semantic-ui-react';
import { Todo } from '../../models/todo';
import { Path } from '../../routes';
import { toFormatedDate } from '../../utils/date';

export interface DetailWindowProps {
  isPrepared: boolean;
  todo?: Todo | null;
}

export const DetailWindow: React.FC<DetailWindowProps> = props => {
  if (!props.isPrepared) {
    return (
      <Dimmer active={true}>
        <Loader>Loading</Loader>
      </Dimmer>
    );
  }

  if (!props.todo) return <Redirect to={Path.root} />;

  const { id, title, isCompleted, createdAt, updatedAt } = props.todo;

  return (
    <>
      <Helmet>
        <title>詳細画面 - todos</title>
      </Helmet>
      <Segment>
        <Header size="huge">{`${id}. ${title}`}</Header>
        <Divider />
        <List>
          <List.Item>{`status: ${isCompleted ? 'Completed' : 'Active'}`}</List.Item>
          <List.Item>{`createdAt: ${toFormatedDate(createdAt)}`}</List.Item>
          <List.Item>{`updatedAt: ${toFormatedDate(updatedAt)}`}</List.Item>
        </List>
      </Segment>
    </>
  );
};
