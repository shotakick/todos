import { connectRouter, RouterState } from 'connected-react-router';
import { combineReducers } from 'redux';
import auth, { AuthState } from './auth';
import todos, { TodosState } from './todos';

// Root state
export interface ReduxRootState {
  auth: AuthState;
  todos: TodosState;
  router: RouterState;
}

// Root reducer
export const createRootReducer = (history: any) => {
  return combineReducers<ReduxRootState>({
    auth,
    todos,
    router: connectRouter(history),
  });
};
export default createRootReducer;
