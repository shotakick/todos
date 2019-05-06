import { routerMiddleware } from 'connected-react-router';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reduxSaga from 'redux-saga';
import { createRootReducer } from './ducks';
import rootSaga from './sagas';

export const configureStore = (history: any) => {
  const composeEnhancers = composeWithDevTools({
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
  });

  const sagaMiddleware = reduxSaga();

  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        // sagaでの実装に変更したので削除
        // saveToLocalStorage<ReduxRootState>({
        //   key: getSaveTodosKey,
        //   filter: getSaveTodosFilter,
        //   triggers: [TodosActionTypePrefix],
        // }),
      ),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
export default configureStore;
