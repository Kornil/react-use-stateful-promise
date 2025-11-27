import { Status, type Action, type ReducerState } from "./types";

export function reducer<T>(
  state: ReducerState<T>,
  action: Action<T>
): ReducerState<T> {
  switch (action.type) {
    case Status.IDLE:
      return { ...state, status: Status.IDLE, error: null, data: null };
    case Status.LOADING:
      return { ...state, status: Status.LOADING, error: null };
    case Status.ERROR:
      return {
        ...state,
        status: Status.ERROR,
        error: action.payload,
        data: null,
      };
    case Status.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        error: null,
        data: action.payload,
      };
  }
}
