import { Todo } from '../models/todo';
import * as server from '../services/todos';
import { getToken } from './auth';

export const fetchTodoList = async (owner: string): Promise<Todo[]> => {
  return await server.fetchTodoList(getToken(), owner);
};

export const setTodoList = async (owner: string, todoList: Todo[]) => {
  await server.setTodoList(getToken(), owner, todoList);
};

// NOTE: とりあえずの仮実装
export const subscribe = (owner: string, onUpdate: () => void) => {
  const observer: { onUpdate: () => void; unSubscribe?: () => void } = { onUpdate };
  server
    .subscribe(getToken(), owner, onUpdate)
    .then(unSubscribe => (observer.unSubscribe = unSubscribe));
  return observer;
};
