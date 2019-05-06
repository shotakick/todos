import { actionCreatorFactory } from 'typescript-fsa';

// Action payloads
export type LoginPayload = { id: string; pass: string };
export type AuthResult = { id: string };

// Action creators
const factory = actionCreatorFactory('AUTH_ACTION');
export const authActions = {
  login: factory<LoginPayload>('LOGIN'),
  authenticate: factory<void>('AUTHENTICATE'),
  asyncAuth: factory.async<{}, AuthResult, Error>('ASYNC_AUTH'),
  // asyncAuth: factory.async<void, AuthResult>('ASYNC_AUTH'), // Paramsへのvoid指定は'typescript-fsa-reducers'が対応していないっぽい?
};
export default authActions;
