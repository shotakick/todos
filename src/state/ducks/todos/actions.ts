import { actionCreatorFactory } from 'typescript-fsa';
import { Todo } from '../../../models/todo';

// Action payloads
export type AddTodoPayload = Pick<Todo, 'title' | 'createdAt'>;
export type SetTodoPayload = Pick<Todo, 'id' | 'title' | 'updatedAt'>;
export type DeleteTodoPayload = Pick<Todo, 'id'>;
export type ToggleCompleteTodoPayload = Pick<Todo, 'id' | 'updatedAt'>;
export type ToggleCompleteAllPayload = Pick<Todo, 'updatedAt'>;
export type FetchDataPayload = { owner: string };
export type FetchedResult = { todoList: Todo[] };

// Action creators
export const TodosUpdateActionTypePrefix = 'TODOS_UPDATE_ACTION';
const updateActionFactory = actionCreatorFactory(TodosUpdateActionTypePrefix);
const fetchActionFactory = actionCreatorFactory('TODOS_FETCH_ACTION');
export const todosActions = {
  addTodo: updateActionFactory<AddTodoPayload>('ADD_TODO'),
  setTodo: updateActionFactory<SetTodoPayload>('SET_TODO'),
  deleteTodo: updateActionFactory<DeleteTodoPayload>('DELETE_TODO'),
  toggleCompleteTodo: updateActionFactory<ToggleCompleteTodoPayload>('TOGGLE_COMPLETE_TODO'),
  toggleCompleteAll: updateActionFactory<ToggleCompleteAllPayload>('TOGGLE_COMPLETE_ALL'),
  clearCompleted: updateActionFactory<void>('CLEAR_COMPLETED'),
  fetchData: fetchActionFactory<FetchDataPayload>('FETCH_DATA'),
  asyncFetchData: fetchActionFactory.async<FetchDataPayload, FetchedResult>('ASYNC_FETCH_DATA'),
};
export default todosActions;
