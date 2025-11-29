import { useReducer, useRef } from "react";

import { reducer } from "./store/reducer";
import { Status, type Action, type ReducerState } from "./store/types";
import type { Run } from "./types";
import { actions } from "./store/actions";

export function useStatefulPromise<S, Args extends unknown[]>(
  asyncFunc: Run<S, Args>,
  initialData: S,
  {
    onSuccess,
    onError,
    onCancel,
    onReset,
  }: {
    onSuccess?: (data: S) => void;
    onError?: (error: Error) => void;
    onCancel?: () => void;
    onReset?: () => void;
  } = {}
) {
  const [state, dispatch] = useReducer<ReducerState<S>, [Action<S>]>(reducer, {
    status: Status.IDLE,
    error: null,
    data: initialData,
  } as ReducerState<S>);

  // track if the promise was canceled
  const canceled = useRef(false);
  const currentPromise = useRef<Promise<S> | null>(null);

  const run = (...args: Args): Promise<S | null> => {
    dispatch(actions.loading());

    const promise = asyncFunc(...args);
    currentPromise.current = promise;
    canceled.current = false;

    return promise
      .then((data) => {
        if (canceled.current || currentPromise.current !== promise) {
          return null;
        }

        dispatch(actions.success(data));
        onSuccess?.(data);

        return data;
      })
      .catch((error: Error) => {
        if (canceled.current || currentPromise.current !== promise) {
          return null;
        }

        dispatch(actions.error(error));
        onError?.(error);

        return null;
      });
  };

  const cancel = () => {
    canceled.current = true;
    currentPromise.current = null;

    dispatch(actions.idle());
    onCancel?.();
  };

  const reset = () => {
    canceled.current = false;
    currentPromise.current = null;

    dispatch(actions.reset(initialData));
    onReset?.();
  };

  return {
    ...state,
    run,
    cancel,
    reset,
  };
}
export { Status };
