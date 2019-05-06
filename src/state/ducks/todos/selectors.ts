import { createSelector } from 'reselect';
import { ReduxRootState } from '..';

export const getTodoList = ({ todos }: ReduxRootState) => todos.todoList;
export const getTodoListOwner = ({ todos }: ReduxRootState) => todos.owner;

export const getActiveTodoList = createSelector(
  getTodoList,
  todoList => todoList.filter(todo => !todo.isCompleted),
);

export const getCompletedTodoList = createSelector(
  getTodoList,
  todoList => todoList.filter(todo => todo.isCompleted),
);
