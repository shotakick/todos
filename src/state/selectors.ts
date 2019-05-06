import { matchPath } from 'react-router';
import { createSelector } from 'reselect';
import { DetailMatchParams, Path } from '../routes';
import { ReduxRootState } from './ducks';
import { getActiveTodoList, getCompletedTodoList, getTodoList } from './ducks/todos';

export const getCurrentPath = (state: ReduxRootState) => state.router.location.pathname;

export const getMatchAtDetailPath = (state: ReduxRootState) => {
  return matchPath<DetailMatchParams>(state.router.location.pathname, Path.detail);
};

export const getVisibleTodosAtPath = createSelector(
  [(state: ReduxRootState) => state, getCurrentPath],
  (state, path) => {
    switch (path) {
      case Path.showActive:
        return getActiveTodoList(state);
      case Path.showCompleted:
        return getCompletedTodoList(state);
      default:
        return getTodoList(state);
    }
  },
);

export const getTodoAtDetailPath = createSelector(
  [getTodoList, getMatchAtDetailPath],
  (todoList, match) => match && todoList.find(todo => todo.id === Number(match.params.id)),
);
