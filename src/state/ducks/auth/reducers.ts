import { reducerWithInitialState } from 'typescript-fsa-reducers';
import authActions from './actions';

export type AuthState = {
  isPrepared?: boolean;
  isAuthed?: boolean;
  isAuthing?: boolean;
  error?: Error;
  loginUser?: string;
};

export default reducerWithInitialState<AuthState>({})
  .case(authActions.asyncAuth.started, (state, payload) => ({
    isPrepared: state.isPrepared,
    isAuthing: true,
  }))
  .case(authActions.asyncAuth.failed, (state, payload) => ({
    isPrepared: true,
    error: payload.error,
  }))
  .case(authActions.asyncAuth.done, (state, payload) => ({
    isPrepared: true,
    isAuthed: true,
    loginUser: payload.result.id,
  }));
