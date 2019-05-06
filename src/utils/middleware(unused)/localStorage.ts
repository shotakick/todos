import { Action, Dispatch, Middleware } from 'redux';

const defaultKey = 'redux';

type SaveKey = string;
type ActionType = string;
type ActionTypePrefix = string;

export interface Options<State> {
  key?: SaveKey | ((state: State) => SaveKey);
  filter?: (keyof State) | ((state: State) => any);
  triggers?: ActionTypePrefix[] | ((action: ActionType) => boolean);
  stopper?: () => boolean;
}

// NOTE: Not enough testing
export const saveToLocalStorage = <State = any>(
  options?: Options<State>,
): Middleware<{}, State, Dispatch> => {
  return ({ getState }) => {
    return next => {
      return action => {
        const ret = next(action);

        // runnable checking
        if (!isTarget(action, options)) return ret;
        if (options && options.stopper && options.stopper()) return ret;

        const state = getTargetState(getState(), options);
        const key = getKey(getState(), options);

        // save or delete
        if (Object.keys(state).length) {
          localStorage[key] = JSON.stringify(state);
        } else {
          delete localStorage[key];
        }

        return ret;
      };
    };
  };
};

const isTarget = <S>(action: Action, options?: Options<S>) => {
  if (options && options.triggers) {
    if (typeof action.type !== 'string') return false;

    if (Array.isArray(options.triggers)) {
      return !!options.triggers.find(t => action.type.startsWith(t));
    }
    if (typeof options.triggers === 'function') {
      return options.triggers(action.type);
    }
  }

  return true;
};

const getTargetState = <S>(state: S, options?: Options<S>) => {
  if (options && options.filter) {
    if (typeof options.filter === 'string') {
      return state[options.filter];
    }
    if (typeof options.filter === 'function') {
      return options.filter(state);
    }
  }

  return state;
};

const getKey = <S>(state: S, options?: Options<S>) => {
  if (options && options.key) {
    if (typeof options.key === 'string') {
      return options.key || defaultKey;
    }
    if (typeof options.filter === 'function') {
      return options.key(state) || defaultKey;
    }
  }

  return defaultKey;
};
