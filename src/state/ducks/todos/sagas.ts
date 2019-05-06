import { call, delay, put, select, takeLatest } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { fetchTodoList, setTodoList } from '../../../client/todos';
import { FetchDataPayload, todosActions, TodosUpdateActionTypePrefix } from './actions';
import { getTodoList, getTodoListOwner } from './selectors';

export function* todosSaga() {
  yield takeLatest(todosActions.fetchData.type, syncMasterToStore);
  yield takeLatest(
    (action: { type: string }) => action.type.startsWith(TodosUpdateActionTypePrefix),
    syncStoreToMaster,
  );
}

function* syncMasterToStore(action: Action<FetchDataPayload>) {
  yield put(todosActions.asyncFetchData.started(action.payload));

  try {
    const todoList = yield call(fetchTodoList, action.payload.owner);

    yield put(
      todosActions.asyncFetchData.done({
        params: action.payload,
        result: { todoList },
      }),
    );
  } catch (error) {
    yield put(
      todosActions.asyncFetchData.failed({
        params: action.payload,
        error,
      }),
    );
  }
}

function* syncStoreToMaster() {
  // Storeに情報が格納されるのを待ってから処理する
  yield delay(1000);

  const todoList = yield select(getTodoList);
  const owner = yield select(getTodoListOwner);

  yield call(setTodoList, owner, todoList);
}
