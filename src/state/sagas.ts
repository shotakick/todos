import { eventChannel, Task } from 'redux-saga';
import { call, cancelled, fork, put, take } from 'redux-saga/effects';
import { Success } from 'typescript-fsa';
import { subscribe } from '../client/todos';
import { authActions, AuthResult, authSaga } from './ducks/auth';
import { todosActions, todosSaga } from './ducks/todos';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(todosSaga);
  yield fork(reloadDataSaga);
}

// ログイン時や他ウィンドウでのデータ更新時におけるデータ再読み込みを管理
function* reloadDataSaga() {
  let handleEventTask: Task | undefined;

  while (true) {
    const { payload } = yield take(authActions.asyncAuth.done.type);
    const owner = (payload as Success<{}, AuthResult>).result.id;

    yield put(todosActions.fetchData({ owner }));

    if (handleEventTask && handleEventTask.isRunning()) {
      handleEventTask.cancel();
    }

    handleEventTask = yield fork(handleUpdateStorageEvent, owner);
  }
}

function* handleUpdateStorageEvent(owner: string) {
  const updateListenerChannelCreator = () => {
    return eventChannel(emitter => {
      // NOTE: とりあえずの暫定実装
      const observer = subscribe(owner, () => emitter({}));
      return () => observer.unSubscribe && observer.unSubscribe();
    });
  };
  const updateListenerChannel = yield call(updateListenerChannelCreator);

  try {
    while (true) {
      yield take(updateListenerChannel);
      yield put(todosActions.fetchData({ owner }));
    }
  } finally {
    if (yield cancelled()) {
      updateListenerChannel.close();
    }
  }
}
