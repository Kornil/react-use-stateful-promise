import { Status, ActionTypes, type Action, type ReducerState } from "./types";

export function reducer<T>(
  state: ReducerState<T>,
  action: Action<T>
): ReducerState<T> {
  switch (action.type) {
    case ActionTypes.IDLE:
      return { ...state, status: Status.IDLE, error: null };
    case ActionTypes.RESET:
      return { ...state, status: Status.IDLE, error: null, data: null };
    case ActionTypes.LOADING:
      return { ...state, status: Status.LOADING, error: null };
    case ActionTypes.ERROR:
      return {
        ...state,
        status: Status.ERROR,
        error: action.payload,
        data: null,
      };
    case ActionTypes.SUCCESS:
      return {
        ...state,
        status: Status.SUCCESS,
        error: null,
        data: action.payload,
      };
    default:
      throw new Error(`Unknown action ${JSON.stringify(action)}`);
  }
}
