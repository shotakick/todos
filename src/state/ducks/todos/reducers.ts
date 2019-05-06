import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { Todo } from '../../../models/todo';
import actions, {
  AddTodoPayload,
  DeleteTodoPayload,
  SetTodoPayload,
  ToggleCompleteAllPayload,
  ToggleCompleteTodoPayload,
} from './actions';

export const TodoIdOrigin = 1;

export interface TodosState {
  isPrepared?: boolean;
  isFetching?: boolean;
  owner?: string;
  todoList: Todo[];
}
const initialState: TodosState = {
  todoList: [],
};

export default reducerWithInitialState<TodosState>(initialState)
  .case(actions.addTodo, (state, payload) => addTodo(state, payload))
  .case(actions.setTodo, (state, payload) => setTodo(state, payload))
  .case(actions.deleteTodo, (state, payload) => deleteTodo(state, payload))
  .case(actions.toggleCompleteTodo, (state, payload) => toggleCompleteTodo(state, payload))
  .case(actions.toggleCompleteAll, (state, payload) => toggleCompleteAll(state, payload))
  .case(actions.clearCompleted, (state, payload) => clearCompleted(state))
  .case(actions.asyncFetchData.started, (state, payload) => ({
    isPrepared: state.isPrepared,
    isFetching: true,
    todoList: [],
  }))
  .case(actions.asyncFetchData.failed, (state, payload) => ({
    isPrepared: state.isPrepared,
    isFetching: true,
    todoList: [],
  }))
  .case(actions.asyncFetchData.done, (state, payload) => ({
    isPrepared: true,
    isFetching: false,
    owner: payload.params.owner,
    todoList: payload.result.todoList,
  }));

// Case Reducers
const addTodo = (state: TodosState, payload: AddTodoPayload): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  return {
    ...state,
    todoList: [
      ...state.todoList,
      {
        id: state.todoList.length ? state.todoList[state.todoList.length - 1].id + 1 : TodoIdOrigin,
        title: payload.title,
        isCompleted: false,
        createdAt: payload.createdAt,
        updatedAt: payload.createdAt,
      },
    ],
  };
};

const setTodo = (state: TodosState, payload: SetTodoPayload): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  const targetIndex = state.todoList.findIndex(todo => todo.id === payload.id);
  if (targetIndex === -1) return state;

  const newTodo = {
    ...state.todoList[targetIndex],
    title: payload.title,
    updatedAt: payload.updatedAt,
  };

  return {
    ...state,
    todoList: [
      ...state.todoList.slice(0, targetIndex),
      newTodo,
      ...state.todoList.slice(targetIndex + 1),
    ],
  };
};

const deleteTodo = (state: TodosState, payload: DeleteTodoPayload): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  const targetIndex = state.todoList.findIndex(todo => todo.id === payload.id);
  if (targetIndex === -1) return state;
  return {
    ...state,
    todoList: state.todoList.slice(0, targetIndex).concat(state.todoList.slice(targetIndex + 1)),
  };
};

const toggleCompleteTodo = (state: TodosState, payload: ToggleCompleteTodoPayload): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  const targetIndex = state.todoList.findIndex(todo => todo.id === payload.id);
  if (targetIndex === -1) return state;

  const newTodo = {
    ...state.todoList[targetIndex],
    isCompleted: !state.todoList[targetIndex].isCompleted,
    updatedAt: payload.updatedAt,
  };

  return {
    ...state,
    todoList: [
      ...state.todoList.slice(0, targetIndex),
      newTodo,
      ...state.todoList.slice(targetIndex + 1),
    ],
  };
};

const toggleCompleteAll = (state: TodosState, payload: ToggleCompleteAllPayload): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  const doComplete = !!state.todoList.find(todo => !todo.isCompleted);
  return {
    ...state,
    todoList: state.todoList.map(todo =>
      doComplete === todo.isCompleted
        ? todo
        : { ...todo, isCompleted: !todo.isCompleted, updatedAt: payload.updatedAt },
    ),
  };
};

const clearCompleted = (state: TodosState): TodosState => {
  if (!state.isPrepared || state.isFetching) return state;

  return {
    ...state,
    todoList: state.todoList.filter(todo => !todo.isCompleted),
  };
};
