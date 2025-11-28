import {
  ActionTypes,
  type ActionIdle,
  type ActionReset,
  type ActionLoading,
  type ActionError,
  type ActionSuccess,
} from "./types";

export const actions = {
  idle: (): ActionIdle => ({ type: ActionTypes.IDLE }),
  reset: (): ActionReset => ({ type: ActionTypes.RESET }),
  loading: (): ActionLoading => ({ type: ActionTypes.LOADING }),
  error: (payload: Error): ActionError => ({ type: ActionTypes.ERROR, payload }),
  success: <T>(payload: T): ActionSuccess<T> => ({
    type: ActionTypes.SUCCESS,
    payload,
  }),
};
