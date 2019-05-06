import { Todo } from '../models/todo';
import { authenticate } from './auth';

const keyPrefix = 'todos:data:';
export const getKey = (owner: string) => keyPrefix + owner;

export const fetchTodoList = async (token: string, owner: string): Promise<Todo[]> => {
  await authenticate(token, owner);
  const todoList: any[] = JSON.parse(localStorage[getKey(owner)] || '[]');
  return todoList.map(todo => ({
    ...todo,
    createdAt: new Date(todo.createdAt),
    updatedAt: new Date(todo.updatedAt),
  }));
};

export const setTodoList = async (token: string, owner: string, todoList: Todo[]) => {
  await authenticate(token, owner);
  localStorage[getKey(owner)] = JSON.stringify(todoList);
};

export const subscribe = async (
  token: string,
  owner: string,
  onUpdate: () => void,
): Promise<() => void> => {
  await authenticate(token, owner);

  const listener = (event: StorageEvent) => {
    event.key === getKey(owner) && onUpdate();
  };
  window.addEventListener('storage', listener);

  // 購読解除関数を返す
  return () => window.removeEventListener('storage', listener);
};
