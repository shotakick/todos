import { call, put, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { authenticate, login } from '../../../client/auth';
import authActions, { LoginPayload } from './actions';

export function* authSaga() {
  yield takeLatest(authActions.login.type, handleLogin);
  yield takeLatest(authActions.authenticate.type, handleAuth);
}

function* handleLogin(action: Action<LoginPayload>) {
  yield call(asyncAuth, login, action.payload.id, action.payload.pass);
}

function* handleAuth() {
  yield call(asyncAuth, authenticate);
}

function* asyncAuth<Fn extends (...args: any[]) => { id: string }>(
  authApi: Fn,
  ...authParam: Parameters<Fn>
) {
  yield put(authActions.asyncAuth.started({}));

  try {
    const { id } = yield call(authApi, ...authParam);

    yield put(
      authActions.asyncAuth.done({
        params: {},
        result: { id },
      }),
    );
  } catch (error) {
    yield put(
      authActions.asyncAuth.failed({
        params: {},
        error,
      }),
    );
  }
}
